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
            })
        )

        // If using dbAuth and seeding users, you'll need to add a `hashedPassword`
        // and associated `salt` to their record. Here's how to create them using
        // the same algorithm that dbAuth uses internally:
        //

        const [hashedPassword, salt] = hashPassword('adminpassword');
        await db.user.create({
            data: {
                name: "Administrator",
                username: "admin",
                email: `admin@mail.com`,
                mobileNumber: `09123456789`,
                roles: "ADMIN",
                hashedPassword,
                gender: "Male",
                salt,
                verified: true
            },
        });



        const [hashedPassword2, salt2] = hashPassword('password');
        const vendor = await db.user.create({
            data: {
                name: "John Doe",
                username: "john",
                email: 'johndoe@gmail.com',
                mobileNumber: `09123456781`,
                roles: "VENDOR",
                hashedPassword: hashedPassword2,
                gender: "Male",
                salt: salt2,
                verified: true
            }
        })

        const products = await db.product.createMany({
            data: [
                {
                    name: "Mango Juice",
                    availability: false,
                    userId: vendor.id
                },
                {
                    name: "Buko Juice",
                    availability: true,
                    userId: vendor.id
                },
                {
                    name: "Pineapple Juice",
                    availability: true,
                    userId: vendor.id
                },
            ]
        })

    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
}
