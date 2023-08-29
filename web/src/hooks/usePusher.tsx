import Pusher, { Channel } from "pusher-js"
import { useEffect, useState } from "react"



export default function usePusher() {
  const [pusher, setPusher] = useState<Pusher>(null)
  const [channel, setChannel] = useState<Channel>(null)
  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
        cluster: process.env.PUSHER_APP_CLUSTER,
    })
    const channel = pusher.subscribe(process.env.PUSHER_CHANNEL)
    setPusher(pusher)
    setChannel(channel)
    console.log('pusher initialized')
    return () => {
        console.log('pusher disconnecting...')
        pusher.disconnect()
    }

  }, [])

  return [pusher, channel]
}