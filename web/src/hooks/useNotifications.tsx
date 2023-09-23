import { useEffect } from 'react'
import { beamsClient } from 'src/lib/beams'

export const useNotifications = () => {
    useEffect(() => {
        beamsClient
            .start()
            .then(() => beamsClient.addDeviceInterest('morning-greeting'))
            .then(() => console.log('Successfully registered and subscribed!'))
            .catch((err) => {
                console.log('Error registering device:', err)
            })
    }, [])
}
