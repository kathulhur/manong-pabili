import type { Prisma, Product } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProductCreateArgs>({
    product: {
        one: {
            data: {
                name: 'String',
                availability: true,
                user: {
                    create: {
                        username: 'String743522',
                        hashedPassword: 'String',
                        salt: 'String',
                    },
                },
            },
        },
        two: {
            data: {
                name: 'String',
                availability: true,
                user: {
                    create: {
                        username: 'String7842125',
                        hashedPassword: 'String',
                        salt: 'String',
                    },
                },
            },
        },
    },
})

export type StandardScenario = ScenarioData<Product, 'product'>
