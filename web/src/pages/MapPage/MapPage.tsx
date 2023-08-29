import { useCallback, useEffect, useState } from 'react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import Pusher from 'pusher-js'

import { MetaTags, useQuery } from '@redwoodjs/web'
import { User } from 'types/graphql'
import useCoordinates from 'src/hooks/useCoordinates'
import usePusher from 'src/hooks/usePusher'

const MAP_VENDORS_QUERY = gql`
    query MapVendorsQuery {
        mapVendors {
            id
            name
            email
            latitude
            longitude
            products {
                id
                name
            }
        }
    }
`

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


export const createMarker = (vendor: User) => {
    const marker = new tt.Marker().setLngLat([vendor.longitude, vendor.latitude])
    marker.setPopup(
        new tt.Popup({ offset: 35 }).setHTML(buildPopupHtml({ name: vendor.name, products: vendor.products }))
        )
    marker.getElement().id = String(vendor.id)
    return marker
}

const MapPage = () => {
    const coordinates = useCoordinates();
    const [map, setMap] = useState<tt.Map>(null)
    const [markers, setMarkers] = useState<tt.Marker[]>([])
    const {data}= useQuery(MAP_VENDORS_QUERY)
    const [vendors, setVendors] = useState<User[]>([])
    const pusher = usePusher();

    useEffect(() => {
        console.log('map', map)
        console.log('coordinates', coordinates)
        if (map && coordinates) {
            console.log('zooming')
            map.setCenter([coordinates.longitude, coordinates.latitude])
            map.zoomTo(15)
        }
    }, [map, coordinates])


    useEffect(() => {
        if (pusher) {
            const channel = pusher.subscribe(process.env.PUSHER_CHANNEL)
            channel.bind('location-broadcast', ({vendor}: {vendor: User}) => {
                console.log("location-broadcast")
                console.log('vendr', vendor)
                // check if marker already exists, if it does, update it, else add it as a new one
                const marker = markers.find((m) => m.getElement().id === String(vendor.id))
                if (marker) {
                    console.log('updating marker')
                    marker.setLngLat([vendor.longitude, vendor.latitude])
                } else {
                    console.log('adding marker')
                    const marker = createMarker(vendor)
                    marker.addTo(map)
                    setMarkers([...markers, marker])
                }

            })

            channel.bind('hide-location', ({vendor}: {vendor: User}) => {
                const marker = markers.find((m) => m.getElement().id === String(vendor.id))
                if (marker) {
                    marker.remove()
                    setMarkers(markers.filter((m) => m.getElement().id === String(vendor.id)))
                }

            })
        }

    }, [pusher, map, markers])


    // initialize map
    const mapRef = useCallback(async (node) => {
        if (node !== null) {
            const map = tt.map({
                key: process.env.TOMTOM_API_KEY,
                container: node,
                // center: [121.004995, 14.610395],
                zoom: 12,
            })
            setMap(map)
        }
    }, [])

    // set vendors once the data is ready
    useEffect(() => {
        if (data) {
            setVendors(data.users)
        }
    }
    , [data])


    // initialize markers once the map and vendors are ready
    useEffect(() => {
        if (map && vendors.length > 0) {
            console.log('initializing markers')
            const markers = vendors.map(createMarker)
            markers.forEach((marker) => {
                marker.addTo(map)
            })

            setMarkers(markers)
        }
    }, [map, vendors])


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
