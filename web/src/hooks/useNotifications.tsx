import * as PushNotifications from '@pusher/push-notifications-web'
import { useEffect } from 'react'

export const useNotifications = () => {
    useEffect(() => {
        const beamsClient = new PushNotifications.Client({
            instanceId: process.env.REDWOOD_ENV_BEAM_INSTANCE_ID,
        })
        beamsClient
            .start()
            .then(() => beamsClient.addDeviceInterest('morning-greeting'))
            .then(() => console.log('Successfully registered and subscribed!'))
            .catch((err) => {
                console.log('Error registering device:', err)
            })

        return () => {
            beamsClient
                .stop()
                .then(() => console.log('Successfully unsubscribed!'))
                .catch((err) => {
                    console.log('Error unsubscribing', err)
                })
        }
    }, [])
}
