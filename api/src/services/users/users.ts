import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";
import { hashPassword } from "@redwoodjs/auth-dbauth-api";
import { validate, validateWith, validateWithSync } from "@redwoodjs/api";
import { UserInputError } from "@redwoodjs/graphql-server";

export const users: QueryResolvers["users"] = () => {
  return db.user.findMany();
};

export const user: QueryResolvers["user"] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  });
};

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

export const vendorPage: QueryResolvers['vendorPage'] = async ({ page = 1 }) => {
  const offset = (page - 1) * VENDORS_PER_PAGE;

  return {
    vendors: await db.user.findMany({
      take: VENDORS_PER_PAGE,
      skip: offset,
      where: {
        role: 'VENDOR',
      }}),
      count: await db.user.count(),
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

  return db.user.delete({
    where: { id },
  })
}
