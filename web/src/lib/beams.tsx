import * as PushNotifications from '@pusher/push-notifications-web'

export const beamsClient = new PushNotifications.Client({
    instanceId: process.env.REDWOOD_ENV_BEAM_INSTANCE_ID,
})
