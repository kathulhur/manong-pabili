import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useCallback, useEffect, useState } from 'react'

import tt from '@tomtom-international/web-sdk-maps'
import Pusher from 'pusher-js'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import DashboardProductsCell from 'src/components/DashboardProductsCell'

import { createMarker } from '../MapPage/MapPage'

const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
    cluster: process.env.PUSHER_APP_CLUSTER,
})

const HomePage = () => {
    const [isLocationShown, setIsLocationShown] = useState(false)
    const [isRealTime, setIsRealTime] = useState(false)
    const [markers, setMarkers] = useState<tt.Marker[]>([])
    const [position, setPosition] = useState<GeolocationCoordinates>(null)
    const [map, setMap] = useState<tt.Map>(null)

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

    const { isAuthenticated, currentUser, logOut, loading } = useAuth()

    const addProductButtonHandler = () => {
        console.log('Add Product')
    }

    const showLocationButtonHandler = () => {
        setIsLocationShown(true)
        updateLocationButtonHandler()
    }

    const hideLocationButtonHandler = () => {
        setIsLocationShown(false)
    }

    const realTimeModeButtonHandler = () => {
        setIsRealTime(true)
    }

    const manualModeButtonHandler = () => {
        setIsRealTime(false)
    }

    const updateLocationButtonHandler = () => {
        broadcastLocation()
    }

    async function getCurrentPositionAsync(options) {
        return new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position)
                },
                (error) => {
                    reject(error)
                },
                options
            )
        })
    }

    const focusLocationButtonHandler = () => {
        if (!map) return
        map.setCenter([position.longitude, position.latitude])
        map.zoomTo(18)
    }

    const broadcastLocation = async () => {
        try {
            const position = await getCurrentPositionAsync({
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            })
            setPosition(position.coords)
            console.log(position)
            const response = await fetch(
                'http://localhost:8910/.redwood/functions/broadcast',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        channel: process.env.PUSHER_CHANNEL,
                        event: 'location-broadcast',
                        data: {
                            coordinates: [
                                position.coords.longitude,
                                position.coords.latitude,
                            ],
                            vendor: {
                                id: currentUser?.id,
                                name: currentUser?.username,
                                products: [
                                    'Chicken Joy',
                                    'Spaghetti',
                                    'Burger Steak',
                                ],
                            },
                        },
                    }),
                }
            )
            const data = await response.json()
            console.log(data)
        } catch (err) {
            console.log(err)
            if (err.code === 1) {
                alert(
                    'You have denied access to your location. Please enable your browser location settings.'
                )
            }

            if (err.code === 2) {
                alert(
                    'Please turn on your device location settings and try again. '
                )
            }

            if (err.code === 3) {
                alert(
                    'Location request timed out. Please try again or try moving to a location with better signal.'
                )
            }
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        navigate(routes.login())
        return null
    }

    return (
        <>
            <MetaTags title="Home" description="Home page" />
            <button type="button" onClick={logOut}>
                Log Out
            </button>
            <h1>Magandang Araw, Mang {currentUser?.username}</h1>
            <div>
                <h2>Mga Produkto</h2>
                <button type="button" onClick={addProductButtonHandler}>
                    Add Product
                </button>
            </div>
            <DashboardProductsCell userId={currentUser.id} />
            <div>
                <h2>Broadcast mode</h2>
                <button type="button" onClick={realTimeModeButtonHandler}>
                    RealTime
                </button>
                <button type="button" onClick={manualModeButtonHandler}>
                    Manual
                </button>
            </div>
            <section>
                <h2>Your Location</h2>
                <button
                    type="button"
                    disabled={!isLocationShown}
                    onClick={focusLocationButtonHandler}
                >
                    Focus on my location
                </button>
                {!isRealTime && (
                    <button
                        type="button"
                        disabled={!isLocationShown}
                        onClick={updateLocationButtonHandler}
                    >
                        Update Location
                    </button>
                )}
                <div
                    hidden={!isLocationShown}
                    id="map"
                    ref={mapRef}
                    style={{
                        maxWidth: '24rem',
                        height: '16rem',
                        border: '1px solid black',
                    }}
                ></div>
                <div
                    hidden={isLocationShown}
                    style={{
                        maxWidth: '24rem',
                        height: '16rem',
                        border: '1px solid black',
                    }}
                >
                    Your location is hidden
                </div>
                <div>
                    <button type="button" onClick={showLocationButtonHandler}>
                        Show my location
                    </button>
                    <button type="button" onClick={hideLocationButtonHandler}>
                        Hide my location
                    </button>
                </div>
            </section>
        </>
    )
}

export default HomePage
