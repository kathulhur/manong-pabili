import Pusher from "pusher-js"
import { useEffect, useState } from "react"



export default function usePusher() {
  const [pusher, setPusher] = useState<Pusher>(null)
  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
        cluster: process.env.PUSHER_APP_CLUSTER,
    })
    setPusher(pusher)
    console.log('pusher initialized')
    return () => {
        console.log('pusher disconnecting...')
        pusher.disconnect()
    }

  }, [])

  return pusher
}