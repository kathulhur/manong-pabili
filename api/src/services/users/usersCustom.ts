import type {
    QueryResolvers,
    MutationResolvers,
    UserRelationResolvers,
    Mutation,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import {
    validate,
    validateWith,
    validateWithSync,
    validateUniqueness,
} from '@redwoodjs/api'
import { pusher } from 'src/lib/pusher'
import { sendVerificationEmail } from 'src/lib/email'
import axios from 'axios'
export const vendor: QueryResolvers['vendor'] = ({ id }) => {
    return db.user.findUnique({
        where: {
            id,
            roles: {
                contains: 'VENDOR',
            },
            deleted: false,
        },
        include: {
            productsOffered: {
                where: {
                    deleted: false,
                },
            },
            featuredImages: {
                where: {
                    deleted: false,
                },
            },
            Markers: {
                where: {
                    deleted: false,
                },
            },
        },
    })
}

export const userPage: QueryResolvers['userPage'] = async ({
    limit,
    offset,
}) => {
    const users = await db.user.findMany({
        where: {
            deleted: false,
        },
        take: limit,
        skip: offset,
    })

    const count = await db.user.count({
        where: {
            deleted: false,
        },
    })
    return {
        users,
        count,
    }
}

export const updateVendorMarker: MutationResolvers['updateVendorMarker'] = ({
    id,
    input,
}) => {
    const { markerUrl } = input
    return db.user.update({
        where: {
            id,
            roles: {
                contains: 'VENDOR',
            },
        },
        data: {
            markerUrl,
        },
    })
}

export const mapVendors: QueryResolvers['mapVendors'] = async () => {
    const result = await db.user.findMany({
        where: {
            locationHidden: false,
            roles: {
                equals: 'VENDOR',
            },
            deleted: false,
            verified: true,
        },
        include: {
            productsOffered: {
                where: {
                    deleted: false,
                    availability: true,
                },
            },
            featuredImages: {
                where: {
                    deleted: false,
                },
            },
        },
    })
    return result
}

export const updateUsername: MutationResolvers['updateUsername'] = ({
    id,
    input,
}) => {
    const { updatedUsername } = input
    validate(updatedUsername, 'Username', {
        length: { min: 3, max: 256 },
        presence: true,
        format: {
            message: 'can only contain letters, numbers, and underscores',
            pattern: /^[a-zA-Z0-9_]*$/,
        },
    })

    return db.user.update({
        data: {
            username: updatedUsername,
        },
        where: { id },
    })
}

export const updateEmail: MutationResolvers['updateEmail'] = ({
    id,
    input,
}) => {
    const { updatedEmail } = input
    validate(updatedEmail, 'Email', {
        presence: true,
        email: true,
    })

    return validateUniqueness(
        'user',
        {
            email: updatedEmail,
        },
        {
            message: 'Email already taken',
        },
        (db) =>
            db.user.update({
                data: {
                    email: updatedEmail,
                },
                where: { id },
            })
    )
}

export const updateMobileNumber: MutationResolvers['updateMobileNumber'] = ({
    id,
    input,
}) => {
    const { updatedMobileNumber } = input

    validate(updatedMobileNumber, 'Mobile Number', {
        presence: true,
        format: {
            message:
                'Mobile number must start with 0 or 63 followed by 10 digits',
            pattern: /^(0|63)[0-9]{10}$/,
        },
    })

    return db.user.update({
        data: {
            mobileNumber: updatedMobileNumber,
        },
        where: { id },
    })
}

export const updateName: MutationResolvers['updateName'] = ({ id, input }) => {
    const { updatedName } = input

    validate(updatedName, 'Name', {
        length: { min: 3, max: 256 },
        presence: true,
    })

    return db.user.update({
        data: {
            name: updatedName,
        },
        where: { id },
        include: {
            productsOffered: {
                where: {
                    deleted: false,
                },
            },
        },
    })
}

export const updateUserPassword: MutationResolvers['updateUserPassword'] =
    async ({ id, input }) => {
        const { oldPassword, newPassword } = input
        // TODO: perform validation

        const [hashedPassword, salt] = hashPassword(newPassword)

        // checks if the old password is correct
        await validateWith(async () => {
            const user = await db.user.findUnique({ where: { id } })
            if (!user) {
                throw 'User not found'
            }

            const [hashedOldPassword] = hashPassword(oldPassword, user.salt)
            if (hashedOldPassword !== user.hashedPassword) {
                throw 'Password is incorrect'
            }
        })

        return db.user.update({
            data: {
                hashedPassword,
                salt,
            },
            where: { id },
        })
    }

const VENDORS_PER_PAGE = 5

export const vendorPage: QueryResolvers['vendorPage'] = async ({
    page = 1,
    searchKey = '',
}) => {
    const offset = (page - 1) * VENDORS_PER_PAGE
    // TODO: extract the filter logic
    return {
        vendors: await db.user.findMany({
            take: VENDORS_PER_PAGE,
            skip: offset,
            where: {
                OR: [
                    {
                        name: {
                            contains: searchKey,
                        },
                    },
                    {
                        username: {
                            contains: searchKey,
                        },
                    },
                ],
                roles: {
                    contains: 'VENDOR',
                },
                deleted: false,
            },
        }),
        count: await db.user.count({
            where: {
                roles: {
                    contains: 'VENDOR',
                },
                OR: [
                    {
                        name: {
                            contains: searchKey,
                        },
                    },
                    {
                        username: {
                            contains: searchKey,
                        },
                    },
                ],
                deleted: false,
            },
        }),
    }
}

export const deleteUserAccount: MutationResolvers['deleteUserAccount'] =
    async ({ id, input }) => {
        const { password } = input

        await validateWith(async () => {
            const user = await db.user.findUnique({ where: { id } })
            if (!user) {
                throw 'User not found'
            }

            const [hashedPassword] = hashPassword(password, user.salt)
            if (hashedPassword !== user.hashedPassword) {
                throw 'Password is incorrect'
            }
        })

        return db.user.update({
            where: { id },
            data: {
                deleted: true,
                deletedAt: new Date(),
            },
        })
    }

export const hideVendorLocation: MutationResolvers['hideVendorLocation'] =
    async ({ id, input }) => {
        const { channel, event } = input
        const user = await db.user.findUnique({ where: { id } })
        validateWithSync(() => {
            if (!user) {
                throw 'User not found'
            }

            if (!user.roles.includes('VENDOR')) {
                throw 'User must be a vendor'
            }

            if (user.locationHidden) {
                throw 'Location already hidden'
            }
        })

        pusher.trigger(channel, event, {
            vendor: {
                __typename: 'User',
                ...user,
            },
        })

        return db.user.update({
            where: { id },
            data: {
                locationHidden: true,
            },
        })
    }

export const broadcastLocation: MutationResolvers['broadcastLocation'] =
    async ({
        id,
        input: { channel, event, latitude, longitude, locationBroadcastMode },
    }) => {
        const user = await db.user.update({
            where: { id: id },
            data: {
                longitude: longitude,
                latitude: latitude,
                lastLocationUpdate: new Date(),
                locationHidden: false,
                locationBroadcastMode,
            },
            include: {
                productsOffered: {
                    where: {
                        deleted: false,
                        availability: true,
                    },
                },
                featuredImages: {
                    where: {
                        deleted: false,
                        userId: id,
                    },
                },
            },
        })

        pusher.trigger(channel, event, {
            vendor: {
                __typename: 'User',
                ...user,
            },
        })

        return user
    }

export const softDeleteUser: MutationResolvers['softDeleteUser'] = async ({
    id,
}) => {
    return db.user.update({
        where: { id },
        data: {
            deleted: true,
            deletedAt: new Date(),
        },
    })
}

export const customCreateUser: MutationResolvers['customCreateUser'] = ({
    input,
}) => {
    const [hashedPassword, salt] = hashPassword(input.password)
    delete input.password

    return db.user.create({
        data: {
            ...input,
            hashedPassword,
            salt,
        },
    })
}

export const verifyUser: MutationResolvers['verifyUser'] = async ({ id }) => {
    const user = await db.user.findUnique({ where: { id } })
    if (!user) {
        throw 'User not found'
    }

    if (user.verified) {
        throw 'User already verified'
    }

    const updatedUser = await db.user.update({
        where: { id },
        data: {
            verified: true,
        },
    })

    await sendVerificationEmail(user.email)

    return updatedUser
}

export const consumerMapSearch: QueryResolvers['consumerMapSearch'] = async ({
    searchKey,
}) => {
    const vendorsFound = await db.user.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: searchKey,
                    },
                },
                {
                    username: {
                        contains: searchKey,
                    },
                },
            ],
            roles: {
                equals: 'VENDOR',
            },
            deleted: false,
            verified: true,
        },
    })

    const productsFound = await db.product.findMany({
        where: {
            name: {
                contains: searchKey,
            },
            deleted: false,
            availability: true,
        },
    })

    return {
        vendors: vendorsFound,
        products: productsFound,
    }
}

export const triggerMorningNotification: MutationResolvers['triggerMorningNotification'] =
    async () => {
        try {
            const response = await axios.post(
                `https://${process.env.REDWOOD_ENV_BEAM_INSTANCE_ID}.pushnotifications.pusher.com/publish_api/v1/instances/${process.env.REDWOOD_ENV_BEAM_INSTANCE_ID}/publishes/interests`,
                {
                    interests: ['morning-greeting'],
                    web: {
                        notification: {
                            title: 'Good day, Manong/Manang!',
                            body: 'Your customers are waiting for you; show them where you are!',
                            deep_link: 'https://manongpabili.tech',
                        },
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.REDWOOD_ENV_BEAM_PRIMARY_KEY}`,
                    },
                }
            )

            return true
        } catch (err) {
            console.log(err)
        }

        return false
    }
