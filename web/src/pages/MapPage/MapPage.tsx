import { useCallback, useEffect, useState } from 'react'

import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import Pusher from 'pusher-js'

import { MetaTags } from '@redwoodjs/web'

function buildPopupHtml({ name, products }) {
    return `
    <div>
      <h1>${name}</h1>
      <ul>
        ${products.map((product) => `<li>${product}</li>`).join('')}
      </ul>
    </div>
  `
}

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
    cluster: process.env.PUSHER_APP_CLUSTER,
})

export const createMarker = ({
    coordinates,
    vendor: { id, name, products },
}) => {
    const marker = new tt.Marker().setLngLat(coordinates)
    marker.setPopup(
        new tt.Popup({ offset: 35 }).setHTML(buildPopupHtml({ name, products }))
    )
    marker.getElement().id = id
    return marker
}

const MapPage = () => {
    const [map, setMap] = useState<tt.Map>(null)
    const [markers, setMarkers] = useState<tt.Marker[]>([])

    const mapRef = useCallback((node) => {
        if (node !== null) {
            const map = tt.map({
                key: process.env.TOMTOM_API_KEY,
                container: node,
                center: [121.004995, 14.610395],
                zoom: 12,
            })
            setMap(map)
        }
    }, [])

    useEffect(() => {
        const channel = pusher.subscribe(process.env.PUSHER_CHANNEL)

        channel.bind('location-broadcast', (data) => {
            console.log(data)
            const marker = createMarker(data.message)
            // check if marker already exists, if it does, remove it, then add the new one
            setMarkers([
                ...markers.filter(
                    (m) => m.getElement().id !== marker.getElement().id
                ),
                marker,
            ])
        })

        return () => {
            channel.unbind()
            pusher.unsubscribe(process.env.PUSHER_CHANNEL)
        }
    }, [markers])

    useEffect(() => {
        if (!map) return
        console.log(markers)
        markers.forEach((marker) => {
            marker.addTo(map)
        })

        return () => {
            markers.forEach((marker) => {
                marker.remove()
            })
        }
    }, [map, markers])

    return (
        <>
            <MetaTags title="Map" description="Map page" />
            <div
                id="map"
                ref={mapRef}
                style={{ width: '100%', height: '100vh' }}
            ></div>
            <h1>Let the games begin</h1>
        </>
    )
}

export default MapPage
