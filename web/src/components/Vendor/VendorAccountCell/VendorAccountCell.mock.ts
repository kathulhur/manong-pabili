// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
    vendorAccount: {
        id: 1,
        username: 'vendor_username',
        name: 'Vendor Name',
        email: 'vendor@example.com',
        mobileNumber: '+1234567890',
        lastLocationUpdate: '2023-09-18T12:00:00Z',
        featuredImages: [
            {
                id: 101,
                title: 'Image 1',
                url: 'https://picsum.photos/200',
            },
            {
                id: 102,
                title: 'Image 2',
                url: 'https://picsum.photos/200',
            },
        ],
        Markers: [
            {
                id: 201,
                url: 'https://picsum.photos/200',
            },
        ],
    },
})
