import type { Prisma, User } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
    user: {
        one: {
            data: {
                username: 'String6727326',
                hashedPassword: 'String',
                salt: 'String',
            },
        },
        two: {
            data: {
                username: 'String1107120',
                hashedPassword: 'String',
                salt: 'String',
            },
        },
    },
})

export type StandardScenario = ScenarioData<User, 'user'>
