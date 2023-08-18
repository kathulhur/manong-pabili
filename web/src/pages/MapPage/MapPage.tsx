import { useEffect, useState } from 'react'

import './style.css'
import tt from '@tomtom-international/web-sdk-maps'

import { set } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const fetchLocation = async () => {
    const response = await fetch(
        'http://localhost:8910/.redwood/functions/broadcast'
    )
    const { data } = await response.json()
    const { lat, lng, name, products } = data
    return {
        name,
        products,
        lng: parseFloat(lng),
        lat: parseFloat(lat),
    }
}

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

const MapPage = () => {
    const [map, setMap] = useState(null)
    const [marker, setMarker] = useState<tt.Marker>(null)
    useEffect(() => {
        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: 'map',
            center: [121.004995, 14.610395],
            zoom: 12,
        })
        setMap(map)
    }, [])

    const displayMarker = (name, products) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                if (marker) {
                    marker.remove()
                }
                const newMarker = new tt.Marker()
                    .setLngLat([longitude, latitude])
                    .addTo(map)
                const popup = new tt.Popup({
                    offset: 40,
                }).setHTML(buildPopupHtml({ name, products }))
                newMarker.setPopup(popup)
                setMarker(newMarker)
            })
        }
    }

    const addMarkerOnClick = async () => {
        const { name, products } = await fetchLocation()
        displayMarker(name, products)
        setTimeout(() => {
            console.log('adding marker')
            addMarkerOnClick()
        }, 2000)
    }

    return (
        <>
            <MetaTags title="Map" description="Map page" />
            <button onClick={addMarkerOnClick}>Show my location</button>
            <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            <h1>Let the games begin</h1>
        </>
    )
}

export default MapPage
