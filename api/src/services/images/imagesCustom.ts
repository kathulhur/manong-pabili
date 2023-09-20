import type {
    QueryResolvers,
    MutationResolvers,
    ImageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'
import { pusher } from 'src/lib/pusher'

const IMAGES_PER_PAGE = 5

export const imagePage: QueryResolvers['imagePage'] = async ({
    limit,
    offset,
    filter,
}) => {
    const filteredFilter = Object.fromEntries(
        Object.entries(filter || {}).filter(
            ([_, value]) => value !== null && value !== undefined
        )
    )

    const images = await db.image.findMany({
        take: limit,
        skip: offset,
        where: {
            ...filteredFilter,
            deleted: false,
        },
    })

    const count = await db.image.count({
        where: {
            ...filteredFilter,
            deleted: false,
        },
    })
    return {
        images,
        count,
    }
}

export const softDeleteImage: MutationResolvers['softDeleteImage'] = async ({
    id,
}) => {
    const deletedImage = await db.image.update({
        where: { id },
        data: {
            deleted: true,
            deletedAt: new Date(),
        },
    })

    pusher.trigger(process.env.PUSHER_CHANNEL, 'image-delete', {
        deletedImage: {
            __typename: 'Image',
            ...deletedImage,
        },
    })

    return deletedImage
}
