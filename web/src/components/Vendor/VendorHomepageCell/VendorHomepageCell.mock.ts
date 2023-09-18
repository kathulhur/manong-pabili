// Define your own mock data here:

import { FindVendorHomepageQuery } from 'types/graphql'

export const standard =
    (/* vars, { ctx, req } */): FindVendorHomepageQuery => ({
        vendor: {
            id: 1,
            name: 'Mock Vendor',
            username: 'mock_vendor',
            email: 'mock@vendor.com',
            latitude: 40.7128,
            longitude: -74.006,
            locationBroadcastMode: 'REALTIME',
            productsOffered: [
                { id: 101, name: 'Product A' },
                { id: 102, name: 'Product B' },
            ],
            roles: 'VENDOR',
            markerUrl: 'https://picsum.photos/200',
            locationHidden: false,
            featuredImages: [
                {
                    id: 201,
                    url: 'https://picsum.photos/200',
                    title: 'Image 1',
                },
                {
                    id: 202,
                    url: 'https://picsum.photos/200',
                    title: 'Image 2',
                },
            ],
        },
    })
