import type {
    QueryResolvers,
    MutationResolvers,
    MarkerRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const vendorMarkers: QueryResolvers['vendorMarkers'] = ({ userId }) => {
    return db.marker.findMany({
        where: {
            userId,
            deleted: false,
        },
    })
}

const MARKERS_PER_PAGE = 5
export const markerPage: QueryResolvers['markerPage'] = async ({
    limit,
    offset,
    filter,
}) => {
    const filteredFilter = Object.fromEntries(
        Object.entries(filter || {}).filter(
            ([_, value]) => value !== null && value !== undefined
        )
    )

    const markers = await db.marker.findMany({
        take: limit,
        skip: offset,
        where: {
            ...filteredFilter,
            deleted: false,
        },
    })

    const count = await db.marker.count({
        where: {
            ...filteredFilter,
            deleted: false,
        },
    })
    return {
        markers: markers,
        count,
    }
}

export const softDeleteMarker: MutationResolvers['softDeleteMarker'] = ({
    id,
}) => {
    return db.marker.update({
        data: {
            deleted: true,
            deletedAt: new Date(),
        },
        where: { id },
    })
}

export const Marker: MarkerRelationResolvers = {
    user: (_obj, { root }) => {
        return db.marker.findUnique({ where: { id: root?.id } }).user()
    },
}
