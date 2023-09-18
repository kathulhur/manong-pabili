// Define your own mock data here:

import { ConsumerMapCellQuery } from 'types/graphql'
import { ConsumerMapVendor } from '../ConsumerMap/ConsumerMap'

export const standard = (/* vars, { ctx, req } */): ConsumerMapCellQuery => ({
    mapVendors: [
        {
            __typename: 'User',
            id: 1,
            name: 'Vendor 1',
            latitude: 40.7128,
            longitude: -74.006,
            markerUrl: 'https://picsum.photos/200',
            lastLocationUpdate: '2023-09-18T10:00:00Z',
            locationBroadcastMode: 'STATIC',
            locationHidden: false,
            productsOffered: [
                {
                    id: 101,
                    name: 'Product A',
                    availability: true,
                    userId: 1,
                },
                {
                    id: 102,
                    name: 'Product B',
                    availability: false,
                    userId: 1,
                },
            ],
            featuredImages: [
                {
                    id: 201,
                    title: 'Image 1',
                    url: 'https://picsum.photos/200',
                    userId: 1,
                },
            ],
        },
        {
            __typename: 'User',
            id: 2,
            name: 'Vendor 2',
            latitude: 41.8781,
            longitude: -87.6298,
            markerUrl: 'https://picsum.photos/200',
            lastLocationUpdate: '2023-09-18T11:30:00Z',
            locationBroadcastMode: 'REALTIME',
            locationHidden: false,
            productsOffered: [
                {
                    id: 103,
                    name: 'Product C',
                    availability: true,
                    userId: 2,
                },
            ],
            featuredImages: [],
        },
    ],
})
