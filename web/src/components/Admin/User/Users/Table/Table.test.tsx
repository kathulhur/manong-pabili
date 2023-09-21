import { render } from '@redwoodjs/testing/web'

import Table, { TableProps } from './Table'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components
export const dummyData: TableProps = {
    users: [
        {
            id: 1,
            verified: true,
            email: 'user1@example.com',
            username: 'user1',
            name: 'User One',
            gender: 'Male',
            mobileNumber: '+1234567890',
            roles: 'USER',
            lastLocationUpdate: '2023-09-18T09:00:00Z',
            locationHidden: true,
            locationBroadcastMode: 'STATIC',
            markerUrl: 'https://picsum.photos/200',
        },
        {
            id: 2,
            verified: true,
            email: 'user2@example.com',
            username: 'user2',
            name: 'User Two',
            gender: 'Female',
            mobileNumber: '+9876543210',
            roles: 'ADMIN',
            lastLocationUpdate: '2023-09-18T10:30:00Z',
            locationHidden: false,
            locationBroadcastMode: 'REALTIME',
            markerUrl: 'https://picsum.photos/200',
        },
        // Add more dummy user data as needed
    ],
    onVerify: (id) => {
        // Verify user with the specified ID
        console.log(`Verified user with ID: ${id}`)
    },
}

describe('Table', () => {
    it('renders successfully', () => {
        expect(() => {
            render(<Table {...dummyData} />)
        }).not.toThrow()
    })
})
