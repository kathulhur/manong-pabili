import { navigate, routes } from '@redwoodjs/router'
import { useCallback } from 'react'
import { useAuth } from 'src/auth'
import { beamsClient } from 'src/lib/beams'

export default function useLogout() {
    const { logOut: redwoodLogout, currentUser } = useAuth()

    const logOut = async () => {
        try {
            const success = await redwoodLogout()
            if (success) {
                if (success && currentUser?.roles.includes('VENDOR')) {
                    beamsClient
                        .stop()
                        .then(() => console.log('Successfully unsubscribed!'))
                        .catch((err) => {
                            console.log('Error unsubscribing', err)
                        })
                }

                navigate(routes.index())
            } else {
                alert('Something went wrong')
            }
        } catch (err) {}
    }

    return logOut
}
