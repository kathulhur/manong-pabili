import type { APIGatewayEvent, Context } from 'aws-lambda'
import Pusher from 'pusher'
import { db } from 'src/lib/db'

import { logger } from 'src/lib/logger'
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID || '',
    key: process.env.PUSHER_APP_KEY || '',
    secret: process.env.PUSHER_APP_SECRET || '',
    cluster: process.env.PUSHER_APP_CLUSTER || '',
    useTLS: true,
})

export const handler = async (event: APIGatewayEvent, _context: Context) => {
    logger.info(`${event.httpMethod} ${event.path}: broadcast function`)
    {
        if (event.httpMethod !== 'POST') {
            return {
                statusCode: 405,
                body: 'Method Not Allowed',
            }
        }

        const body = JSON.parse(event.body || '{}')
        const { channel, event: eventName, vendor } = body

        await db.user.update({
            where: { id: vendor.id },
            data: { longitude: vendor.longitude, latitude: vendor.latitude },
        })

        pusher.trigger(channel, eventName, {
            vendor,
        })

        console.log(channel, eventName, vendor)

        return {
            statusCode: 200,
            body: { success: true, message: 'Message sent' },
        }
    }
}
