import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useCallback, useEffect, useState } from 'react'

import tt from '@tomtom-international/web-sdk-maps'
import Pusher from 'pusher-js'

import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import DashboardProductsCell from 'src/components/DashboardProductsCell'

import { createMarker } from '../MapPage/MapPage'
import VendorProfileModal from 'src/components/Modals/VendorProfileModal'

import { Switch, Tab } from '@headlessui/react'
import { Bars2Icon, EyeSlashIcon, MapPinIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import Button from 'src/components/Button/Button'

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
        console.log('Update location')
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
            <div className='flex justify-between items-center mb-10'>
                <h1 className='font-extrabold text-xl text-green-700'>Manong Pabili</h1>
                <button type='button' onClick={() => setIsVendorProfileModalOpen(true)}>
                    <Bars2Icon
                        className="h-7 w-7 text-gray-800 hover:text-gray-400"
                    />
                </button>
                <VendorProfileModal
                    isOpen={isVendorProfileModalOpen}
                    onClose={() => setIsVendorProfileModalOpen(false)}
                />
            </div>

            <p className='mb-4 font-black text-2xl'>Good day, {currentUser?.username}</p>
            <div className='mb-2 flex items-center justify-between'>
                <span className='text-lg font-semibold'>Show location</span>
                <Switch
                    checked={isLocationShown}
                    onChange={isLocationShown ? hideLocationButtonHandler : showLocationButtonHandler}
                    className={`${isLocationShown ? 'bg-green-600' : 'bg-green-400'}
                    relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                    >
                    <span className="sr-only">Show location</span>
                    <span
                        aria-hidden="true"
                        className={`${isLocationShown ? 'translate-x-7' : 'translate-x-0'}
                        pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>

            <section className='relative rounded-lg mb-4 h-64 bg-green-100 overflow-hidden'>
                {
                    isLocationShown &&  <>
                        <div
                            id="map"
                            ref={mapRef}
                            className='h-full'
                        ></div>
                        <button
                            className='absolute bottom-6 right-4 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow z-10'
                            onClick={focusLocationButtonHandler}
                            aria-label='Focus on my location'
                        >
                            <MapPinIcon className='w-6 h-6 text-green-600'></MapPinIcon>
                        </button>
                    </>
                }
                { !isLocationShown && <div
                        className='grid place-items-center h-full'
                    >
                        <div className='flex flex-col items-center'>
                            <EyeSlashIcon className='w-16 h-16 mb-1 text-green-900' />
                            <span className='text-green-900 text-lg font-bold'>Your location is hidden</span>
                        </div>
                    </div>
                }

            </section>

            <Tab.Group onChange={(index) => {
                switch(index) {
                    case 0: return manualModeButtonHandler()
                    case 1: return realTimeModeButtonHandler()
                }
            }}>
                <Tab.List className="flex space-x-1 rounded-xl bg-green-300/20 p-1 mb-4">
                    <Tab
                        className={({ selected }) =>
                            clsx(
                            'w-full rounded-lg py-2.5 text-base font-semibold leading-5 text-green-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white'
                                : 'text-green-500 hover:bg-white/[0.12] hover:text-green-600'
                            )
                        }
                    >Manual</Tab>
                    <Tab
                        className={({ selected }) =>
                            clsx(
                            'w-full rounded-lg py-2.5 text-base font-semibold leading-5 text-green-700',
                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                            selected
                                ? 'bg-white'
                                : 'text-green-500 hover:bg-white/[0.12] hover:text-green-600'
                            )
                        }
                    >Realtime</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <Button fullWidth onClick={updateLocationButtonHandler}>Update location</Button>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <DashboardProductsCell userId={currentUser?.id} />
        </div>
    )
}

export default HomePage
