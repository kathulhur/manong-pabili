import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";
import { hashPassword } from "@redwoodjs/auth-dbauth-api";
import { validate, validateWith, validateWithSync } from "@redwoodjs/api";
import { pusher } from "src/functions/broadcast/broadcast";

export const users: QueryResolvers["users"] = () => {
  console.log('users');
  return db.user.findMany();
};

export const user: QueryResolvers["user"] = ({ id }) => {
  console.log('user query')
  return db.user.findUnique({
    where: { id },
  });
};

export const vendor: QueryResolvers["vendor"] = ({ id }) => {
  return db.user.findUnique({
    where: {
      id,
      roles: {
        contains: "VENDOR"
      },
      deleted: false
    },
    include: {
      products: true
    }
  });
}

export const updateVendorMarker: MutationResolvers["updateVendorMarker"] = ({ id, input }) => {
  const { markerUrl } = input;
  return db.user.update({
    where: {
      id,
      roles: {
        contains: "VENDOR"
      },
    },
    data: {
      markerUrl
    }
  })
}

export const mapVendors: QueryResolvers["mapVendors"] = () => {
  return db.user.findMany({
    where: {
      locationHidden: false,
      roles: {
        equals: "VENDOR"
      }
    }
  })
}

export const createUser: MutationResolvers["createUser"] = ({ input }) => {
  return db.user.create({
    data: input,
  });
};

export const updateUser: MutationResolvers["updateUser"] = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  });
};

export const updateUsername: MutationResolvers["updateUsername"] = ({ id, input }) => {
  const { updatedUsername } = input;
  validate(updatedUsername, 'Username', {
    length: { min: 3, max: 256 },
    presence: true,
    format: {
      message: "can only contain letters, numbers, and underscores",
      pattern: /^[a-zA-Z0-9_]*$/
    }
  })

  return db.user.update({
    data: {
      username: updatedUsername
    },
    where: { id },
  });
}

export const updateMobileNumber: MutationResolvers["updateMobileNumber"] = ({ id, input }) => {
  const { updatedMobileNumber } = input

  validate(updatedMobileNumber, 'Mobile Number', {
    presence: true,
    format: {
      message: "Mobile number must start with 0 or 63 followed by 10 digits",
      pattern: /^(0|63)[0-9]{10}$/
    }
  })

  return db.user.update({
    data: {
      mobileNumber: updatedMobileNumber
    },
    where: { id },
  });

}

export const updateName: MutationResolvers["updateName"] = ({ id, input }) => {
  const { updatedName } = input;

  validate(updatedName, 'Name', {
    length: { min: 3, max: 256 },
    presence: true,

  })

  return db.user.update({
    data: {
      name: updatedName
    },
    where: { id },
  });
}

export const deleteUser: MutationResolvers["deleteUser"] = ({ id }) => {
    return db.user.delete({
      where: { id },
    })

};


export const User: UserRelationResolvers = {
  products: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).products();
  },
};


export const updateUserPassword: MutationResolvers['updateUserPassword'] =
  async ({ id, input }) => {
    const { oldPassword, newPassword } = input;
    // TODO: perform validation

    const [hashedPassword, salt] = hashPassword(newPassword);

    // checks if the old password is correct
    await validateWith(async () => {
      const user = await db.user.findUnique({ where: { id } });
      if (!user) {
        throw "User not found"
      }

      const [hashedOldPassword] = hashPassword(oldPassword, user.salt);
      if (hashedOldPassword !== user.hashedPassword) {
        throw "Password is incorrect"
      }
    })

    return db.user.update({
      data: {
        hashedPassword,
        salt,
      },
      where: { id },
    });
  }


const VENDORS_PER_PAGE = 5;

export const vendorPage: QueryResolvers['vendorPage'] = async ({ page = 1, searchKey = "" }) => {
  const offset = (page - 1) * VENDORS_PER_PAGE;
  // TODO: extract the filter logic
  return {
    vendors: await db.user.findMany({
      take: VENDORS_PER_PAGE,
      skip: offset,
      where: {
        OR: [
          {
            name: {
              contains: searchKey
            }
          },
          {
            username: {
              contains: searchKey
            }
          }
        ],
        roles: {
          contains: "VENDOR"
        },
        deleted: false
      }}),
      count: await db.user.count({
        where: {
          roles: {
            contains: "VENDOR",
          },
          OR: [
            {
              name: {
                contains: searchKey
              }
            },
            {
              username: {
                contains: searchKey
              }
            }
          ],
          deleted: false,
        }
      }),
  }
}


export const deleteUserAccount: MutationResolvers['deleteUserAccount'] = async ({ id, input }) => {
  const { password } = input;

  await validateWith(async () => {
    const user = await db.user.findUnique({ where: { id } });
    if (!user) {
      throw "User not found"
    }

    const [hashedPassword] = hashPassword(password, user.salt);
    if (hashedPassword !== user.hashedPassword) {
      throw "Password is incorrect"
    }

  })

  return db.user.update({
    where: { id },
    data: {
      deleted: true,
      deletedAt: new Date()
    }
  })
}


export const hideVendorLocation: MutationResolvers['hideVendorLocation'] = async ({ id, input }) => {

  const { channel, event } = input
  const user = await db.user.findUnique({ where: { id }});
  validateWithSync(() => {
    if (!user) {
      throw "User not found"
    }

    if (!user.roles.includes("VENDOR")) {
      throw "User must be a vendor"
    }

    if (user.locationHidden) {
      throw "Location already hidden"
    }
  })

  pusher.trigger(channel, event, {
    vendor: user,
  })


  return db.user.update({
    where: { id },
    data: {
      locationHidden: true
    }
  })


}


export const broadcastLocation: MutationResolvers['broadcastLocation']
  = async ({id, input: {channel, event, latitude, longitude}}) => {

    const user = await db.user.update({
        where: { id: id },
        data: {
            longitude: longitude,
            latitude: latitude,
            lastLocationUpdate: new Date(),
            locationHidden: false
        },
        include: {
          products: true
        }

    })

    pusher.trigger(channel, event, {
      vendor: user,
    })

    return user

}