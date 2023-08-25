import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useCallback, useEffect, useState } from 'react'

import tt from '@tomtom-international/web-sdk-maps'
import Pusher from 'pusher-js'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import DashboardProductsCell from 'src/components/DashboardProductsCell'

import { createMarker } from '../MapPage/MapPage'
import VendorProfileModal from 'src/components/Modals/VendorProfileModal'

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

const HomePage = () => {
    const { currentUser } = useAuth()
    const [isLocationShown, setIsLocationShown] = useState(false)
    const [isRealTime, setIsRealTime] = useState(false)
    const [markers, setMarkers] = useState<tt.Marker[]>([])
    const [position, setPosition] = useState<GeolocationCoordinates>(null)
    const [map, setMap] = useState<tt.Map>(null)
    const [isPageVisible, setIsPageVisible] = useState(true)
    const [isVendorProfileModalOpen, setIsVendorProfileModalOpen] = useState(
        false
    )

    useEffect(() => {
        console.log('Intializing pusher')
        const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
            cluster: process.env.PUSHER_APP_CLUSTER,
        })
        const channel = pusher.subscribe(process.env.PUSHER_CHANNEL)
        channel.bind('location-broadcast', ({vendor}) => {
            const marker = createMarker(vendor)
            // check if marker already exists, if it does, remove it, then add the new one
            setMarkers([
                ...markers.filter(
                    (m) => m.getElement().id !== marker.getElement().id
                ),
                marker,
            ])
        })

        return () => {
            console.log('disconnecting...')
            pusher.disconnect()
        }
    }, [])


    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPageVisible(!document.hidden)
            console.log('visibility changed to ' + !document.hidden)
        }

        // Add visibilitychange event listener when component mounts
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Remove visibilitychange event listener when component unmounts
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [])

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

    const broadcastLocation = useCallback(async () => {
        try {
            const position = await getCurrentPositionAsync({
                enableHighAccuracy: true,
                timeout: 20000,
                maximumAge: 1000,
            })
            setPosition(position.coords)
            const response = await fetch(
                'http://localhost:8910/.redwood/functions/broadcast',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        channel: process.env.PUSHER_CHANNEL,
                        event: 'location-broadcast',
                        vendor: {
                            id: currentUser?.id,
                            username: currentUser?.username,
                            products: currentUser?.products,
                            longitude: position.coords.longitude,
                            latitude: position.coords.latitude,
                        }
                    }),
                }
            )
            const data = await response.json()
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
    }, [currentUser])

    useEffect(() => {
        if (!isPageVisible || !isLocationShown || !isRealTime) return
        const intervalId = setInterval(() => {
            broadcastLocation()
            console.log('hey')
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [isPageVisible, isRealTime, broadcastLocation, isLocationShown])



    useEffect(() => {
        if (!map) return
        markers.forEach((marker) => {
            marker.addTo(map)
        })

        return () => {
            markers.forEach((marker) => {
                marker.remove()
            })
        }
    }, [map, markers])

    const showLocationButtonHandler = () => {
        setIsLocationShown(true)
        if (!isRealTime) {
            updateLocationButtonHandler()
        }
    }

    const hideLocationButtonHandler = () => {
        setIsLocationShown(false)
    }

    const realTimeModeButtonHandler = () => {
        setIsRealTime(true)
        console.log('mode changed to real time')
    }

    const manualModeButtonHandler = () => {
        setIsRealTime(false)
        console.log('mode changed to manual')
    }

    const updateLocationButtonHandler = () => {
        broadcastLocation()
    }



    const focusLocationButtonHandler = () => {
        if (!map) return
        map.setCenter([position.longitude, position.latitude])
        map.zoomTo(18)
    }


    return (
        <div
            className='max-w-7xl mx-auto p-8'
        >
            <MetaTags title="Home" description="Home page" />
            <div className='flex justify-between'>
                <h1>Manong Pabili</h1>
                <button
                    className='border py-2 px-4 rounded-md'
                    type="button"
                    onClick={() => setIsVendorProfileModalOpen(true)}
                >
                    Vendor Profile
                </button>
                <VendorProfileModal
                    isOpen={isVendorProfileModalOpen}
                    onClose={() => setIsVendorProfileModalOpen(false)}
                />
            </div>
            <h1 className="font-bold text-2xl">
                Magandang Araw, Mang {currentUser?.username}
            </h1>

            <DashboardProductsCell userId={currentUser?.id} />
            <div className='my-8'>
                <h2 className='font-semibold text-lg'>Broadcast mode</h2>
                <button
                    className='border py-2 px-4 rounded-md'
                    type="button"
                    onClick={realTimeModeButtonHandler}
                >
                    RealTime
                </button>
                <button
                    className='border py-2 px-4 rounded-md'
                    type="button"
                    onClick={manualModeButtonHandler}
                >
                    Manual
                </button>
            </div>
            <section>
                <h2 className='font-semibold text-lg'>Your Location</h2>
                <button
                    className='border py-2 px-4 rounded-md'
                    type="button"
                    disabled={!isLocationShown}
                    onClick={focusLocationButtonHandler}
                >
                    Focus on my location
                </button>
                {!isRealTime && (
                    <button
                        className='border py-2 px-4 rounded-md'
                        type="button"
                        disabled={!isLocationShown || isRealTime}
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
                    <button
                        className='border py-2 px-4 rounded-md'
                        type="button"
                        onClick={showLocationButtonHandler}>
                        Show my location
                    </button>
                    <button
                        className='border py-2 px-4 rounded-md'
                        type="button"
                        onClick={hideLocationButtonHandler}>
                        Hide my location
                    </button>
                </div>
            </section>
        </div>
    )
}

export default HomePage
