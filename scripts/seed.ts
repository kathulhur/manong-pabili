import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

export default async () => {
    try {
        //
        // Manually seed via `yarn rw prisma db seed`
        // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
        //
        // Update "const data = []" to match your data model and seeding needs
        //
        const data: Prisma.UserCreateArgs['data'][] = [
            // To try this example data with the UserExample model in schema.prisma,
            // uncomment the lines below and run 'yarn rw prisma migrate dev'
            //
            // { name: 'alice', username: 'alice@example.com' },
            // { name: 'mark', username: 'mark@example.com' },
            // { name: 'jackie', username: 'jackie@example.com' },
            // { name: 'bob', username: 'bob@example.com' },
        ]
        console.log(
            "\nUsing the default './scripts/seed.{js,ts}' template\nEdit the file to add seed data\n"
        )

        // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
        // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
        Promise.all(
            //
            // Change to match your data model and seeding needs
            //
            data.map(async (data: Prisma.UserCreateArgs['data']) => {
                const record = await db.user.create({ data })
                console.log(record)
            })
        )

        // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
        // and associated `salt` to their record. Here's how to create them using
        // the same algorithm that dbAuth uses internally:
        //

        const products = [
            {
                name: 'Product 1',
                availability: false,
            },
            {
                name: 'Product 2',
                availability: true,
            },
            {
                name: 'Product 3',
                availability: true,
            },
        ]

        for (let i = 0; i < 10; i++) {
            const [hashedPassword, salt] = hashPassword(`password${i}`);
            const user = await db.user.create({
                data: {
                    name: `User ${i}`,
                    username: `user${i}`,
                    email: `user${i}@mail.com`,
                    mobileNumber: "09123456789",
                    latitude: 0,
                    longitude: 0,
                    roles: i == 0 ? "ADMIN" : "VENDOR",
                    hashedPassword,
                    gender: "Male",
                    salt,
                    verified: true
                },
            });

            for (const product of products) {
                await db.product.create({
                    data: {
                        name: product.name,
                        availability: product.availability,
                        user: {
                            connect: {
                                id: user.id,
                            },
                        },
                    },
                });
            }
        }
    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
}
