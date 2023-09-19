import * as PushPushNotifications from '@pusher/push-notifications-web'
import { useEffect } from 'react'

export const useNotifications = () => {
    useEffect(() => {
        const beamsClient = new PushPushNotifications.Client({
            instanceId: '13321434-2a74-4383-a961-f3f574d45ed9',
        })
        beamsClient
            .start()
            .then(() => beamsClient.addDeviceInterest('morning-greeting'))
            .then(() => console.log('Successfully registered and subscribed!'))
            .catch(console.error)
    }, [])
}
