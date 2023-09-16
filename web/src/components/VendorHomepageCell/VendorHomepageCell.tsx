import type {
    FindVendorHomepageQuery,
    FindVendorHomepageQueryVariables,
    HideVendorLocationMutation,
    HideVendorLocationMutationVariables,
    LocationBroadcastMode,
    BroadcastLocationMutation,
    BroadcastLocationMutationVariables,
    UpdateVendorMarkerMutation,
    UpdateVendorMarkerMutationVariables,
} from 'types/graphql'

import {
    type CellSuccessProps,
    type CellFailureProps,
    MetaTags,
    useMutation,
} from '@redwoodjs/web'
import Button from '../Button/Button'
import {
    Bars2Icon,
    EyeSlashIcon,
    MapPinIcon,
    PencilSquareIcon,
} from '@heroicons/react/20/solid'
import VendorProfileModal from '../Modals/VendorProfileModal'
import MarkerSelectModal from '../Modals/MarkerSelectModal'
import { Switch, Tab } from '@headlessui/react'
import clsx from 'clsx'
import DashboardProductsCell from '../DashboardProductsCell'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getCurrentPositionAsync } from 'src/hooks/useCoordinates'
import usePusher from 'src/hooks/usePusher'
import { createMarker } from '../Marker/Marker'
import tt, { LngLatLike } from '@tomtom-international/web-sdk-maps'
import { toast } from '@redwoodjs/web/dist/toast'
import Marker from '../Marker/Marker'
import { get } from '@redwoodjs/forms'

import LoadingComponent from 'src/components/Loading/Loading'
export const beforeQuery = ({ userId }) => {
    return {
        variables: { id: userId },
    }
}
export const QUERY = gql`
    query FindVendorHomepageQuery($id: Int!) {
        vendor(id: $id) {
            id
            name
            username
            email
            latitude
            longitude
            locationBroadcastMode
            productsOffered {
                id
                name
            }
            roles
            markerUrl
            locationHidden
            featuredImages {
                id
                url
                title
            }
        }
    }
`

const HIDE_VENDOR_LOCATION_MUTATION = gql`
    mutation HideVendorLocationMutation(
        $id: Int!
        $input: HideVendorLocationInput!
    ) {
        hideVendorLocation(id: $id, input: $input) {
            id
            locationHidden
        }
    }
`

const BROADCAST_LOCATION_MUTATION = gql`
    mutation BroadcastLocationMutation(
        $id: Int!
        $input: BroadcastLocationInput!
    ) {
        broadcastLocation(id: $id, input: $input) {
            id
            latitude
            longitude
            locationBroadcastMode
            locationHidden
        }
    }
`

export const UPDATE_VENDOR_MARKER = gql`
    mutation UpdateVendorMarkerMutation(
        $id: Int!
        $input: UpdateVendorMarkerInput!
    ) {
        updateVendorMarker(id: $id, input: $input) {
            id
            markerUrl
        }
    }
`

export const Loading = () => <LoadingComponent />

export const Empty = () => <div>Empty</div>

export const Failure = ({
    error,
}: CellFailureProps<FindVendorHomepageQueryVariables>) => (
    <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const getCoordinates = async () => {
    try {
        const { coords } = await getCurrentPositionAsync({
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 10000,
        })
        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        }
    } catch (err) {
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

export const Success = ({
    vendor,
}: CellSuccessProps<
    FindVendorHomepageQuery,
    FindVendorHomepageQueryVariables
>) => {
    const [hideVendorLocation] = useMutation<
        HideVendorLocationMutation,
        HideVendorLocationMutationVariables
    >(HIDE_VENDOR_LOCATION_MUTATION)
    const [broadcastLocation, { loading: broadcastingLocation }] = useMutation<
        BroadcastLocationMutation,
        BroadcastLocationMutationVariables
    >(BROADCAST_LOCATION_MUTATION)
    const [updateVendorMarker] = useMutation<
        UpdateVendorMarkerMutation,
        UpdateVendorMarkerMutationVariables
    >(UPDATE_VENDOR_MARKER)
    const mapRef = useRef<HTMLDivElement>(null)
    const [isLocationShown, setIsLocationShown] = useState(
        !vendor?.locationHidden
    )

    const defaultLocationBroadcastMode =
        vendor?.locationBroadcastMode == 'REALTIME'
            ? 'STATIC'
            : vendor?.locationBroadcastMode

    const [locationBroadcastMode, setLocationBroadcastmode] =
        useState<LocationBroadcastMode>(defaultLocationBroadcastMode)
    const [map, setMap] = useState<tt.Map>(null)
    const [isVendorProfileModalOpen, setIsVendorProfileModalOpen] =
        useState(false)
    const [isMarkerSelectModalOpen, setIsMarkerSelectModalOpen] =
        useState(false)

    // if location is shown on visit, broadcast the location
    useEffect(() => {
        ;(async () => {
            if (isLocationShown && map && vendor) {
                broadcastLocationHandler({
                    latitude: vendor.latitude,
                    longitude: vendor.longitude,
                    locationBroadcastMode,
                })
            }
        })()
    }, [map])

    const handleVisibilityChange = useCallback(() => {
        if (
            document.hidden &&
            isLocationShown &&
            locationBroadcastMode === 'REALTIME'
        ) {
            staticModeButtonHandler()
        }
    }, [locationBroadcastMode, isLocationShown])

    useEffect(() => {
        // Add visibilitychange event listener when component mounts
        document.addEventListener('visibilitychange', handleVisibilityChange)

        // Remove visibilitychange event listener when component unmounts
        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            )
        }
    }, [handleVisibilityChange])

    useEffect(() => {
        if (!mapRef || !mapRef.current) return

        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: 'map',
            center: [121.004995, 14.610395],
            zoom: 15,
        })
        setMap(map)

        return () => {
            if (map) {
                map.remove()
            }
        }
    }, [mapRef])

    const broadcastLocationHandler = useCallback(
        async ({ latitude, longitude, locationBroadcastMode }) => {
            if (!vendor || !map) return
            if (!process.env.PUSHER_CHANNEL)
                throw new Error('PUSHER_CHANNEL ENV is undefined')
            try {
                await broadcastLocation({
                    variables: {
                        id: vendor.id,
                        input: {
                            channel: process.env.PUSHER_CHANNEL,
                            event: 'location-broadcast',
                            longitude,
                            latitude,
                            locationBroadcastMode,
                        },
                    },
                    onError: (err) => {
                        toast.error('failed broadcasting location')
                    },
                    onCompleted: () => {
                        toast.success('Location broadcasted')
                    },
                    update: (cache, { data }) => {
                        try {
                            if (!data || !data.broadcastLocation) return
                            cache.modify({
                                id: cache.identify(vendor),
                                fields: {
                                    latitude() {
                                        return data.broadcastLocation.latitude
                                    },
                                    longitude() {
                                        return data.broadcastLocation.longitude
                                    },
                                    LocationBroadcastMode() {
                                        return data.broadcastLocation
                                            .locationBroadcastMode
                                    },
                                    locationHidden() {
                                        return data.broadcastLocation
                                            .locationHidden
                                    },
                                },
                            })
                        } catch (err) {
                            toast.error('Failed updating cache')
                        }
                    },
                })
            } catch (err) {
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
        },
        [vendor, map, broadcastLocation]
    )

    // broadcast location every 5 seconds when location is shown and in realtime mode
    useEffect(() => {
        if (!isLocationShown || !(locationBroadcastMode === 'REALTIME')) return
        ;(async () =>
            broadcastLocationHandler({
                ...(await getCoordinates()),
                locationBroadcastMode,
            }))()

        const intervalId = setInterval(async () => {
            broadcastLocationHandler({
                ...(await getCoordinates()),
                locationBroadcastMode,
            })
        }, 5000)

        return () => {
            clearInterval(intervalId)
        }
    }, [locationBroadcastMode, broadcastLocationHandler, isLocationShown])

    const showLocationButtonHandler = () => {
        setIsLocationShown(true)
        map.setCenter([vendor.longitude, vendor.latitude])
        if (
            locationBroadcastMode === 'STATIC' ||
            locationBroadcastMode === 'MANUAL'
        ) {
            updateLocationButtonHandler(locationBroadcastMode)
        }
    }

    const hideLocationButtonHandler = useCallback(async () => {
        if (!vendor) return
        if (!process.env.PUSHER_CHANNEL)
            throw new Error('PUSHER_CHANNEL ENV is undefined')

        try {
            await hideVendorLocation({
                variables: {
                    id: vendor.id,
                    input: {
                        channel: process.env.PUSHER_CHANNEL,
                        event: 'hide-location',
                    },
                },
                onError: (err) => {
                    toast.error('failed hiding vendor location')
                },
                onCompleted: () => {
                    setIsLocationShown(false)
                },
                update: (cache, { data }) => {
                    try {
                        if (!data || !data.hideVendorLocation) return
                        cache.modify({
                            id: cache.identify(vendor),
                            fields: {
                                locationHidden() {
                                    return data.hideVendorLocation
                                        .locationHidden
                                },
                            },
                        })
                    } catch (err) {
                        toast.error('Failed updating cache')
                    }
                },
            })
        } catch (err) {}
    }, [vendor])

    const realTimeModeButtonHandler = () => {
        setLocationBroadcastmode('REALTIME')
    }

    const staticModeButtonHandler = async () => {
        setLocationBroadcastmode('STATIC')
        if (isLocationShown) {
            broadcastLocationHandler({
                ...(await getCoordinates()),
                locationBroadcastMode: 'STATIC',
            })
        }
    }

    const manualModeButtonHandler = async () => {
        setLocationBroadcastmode('MANUAL')
        if (isLocationShown) {
            broadcastLocationHandler({
                ...(await getCoordinates()),
                locationBroadcastMode: 'MANUAL',
            })
        }
    }

    const updateLocationButtonHandler = async (locationBroadcastMode) => {
        broadcastLocationHandler({
            ...(await getCoordinates()),
            locationBroadcastMode,
        })
    }

    const updateVendorMarkerHandler = async (url: string) => {
        try {
            await updateVendorMarker({
                variables: {
                    id: vendor?.id,
                    input: {
                        markerUrl: url,
                    },
                },
                onError: (err) => {
                    toast.error('Failed updating marker')
                    setIsMarkerSelectModalOpen(false)
                },
                onCompleted: async () => {
                    toast.success('Marker updated')
                    setIsMarkerSelectModalOpen(false)
                    if (isLocationShown) {
                        broadcastLocationHandler({
                            latitude: vendor.latitude,
                            longitude: vendor.longitude,
                            locationBroadcastMode,
                        })
                    }
                },
            })
        } catch (err) {}
    }

    const focusLocationButtonHandler = useCallback(() => {
        if (!map || !vendor) return
        map.zoomTo(18)
        map.setCenter([vendor.longitude, vendor.latitude])
    }, [map, vendor])

    return (
        <div className="max-w-7xl mx-auto p-8">
            <MetaTags title="Home" description="Home page" />
            <div className="flex justify-between items-center mb-10">
                <h1 className="font-extrabold text-lg text-green-700">
                    Manong Pabili
                </h1>
                <Button
                    className="bg-transparent hover:bg-slate-100"
                    onClick={() => setIsVendorProfileModalOpen(true)}
                >
                    <Bars2Icon className="h-7 w-7 text-slate-900" />
                </Button>
                <VendorProfileModal
                    isOpen={isVendorProfileModalOpen}
                    onClose={() => setIsVendorProfileModalOpen(false)}
                />
            </div>
            <div className="flex items-center justify-between mb-8">
                <p className="font-black text-xl text-slate-900">
                    Good day, {vendor?.username}
                </p>
                <div
                    onClick={() => setIsMarkerSelectModalOpen(true)}
                    className="relative flex items-center justify-center rounded-full p-3 w-12 h-12 bg-green-100 hover:bg-green-200"
                >
                    <PencilSquareIcon className="absolute -top-1 -right-1 w-6 h-6 p-1 rounded-full border-2 border-green-100 bg-white text-slate-700" />
                    <img src={vendor?.markerUrl} alt="marker icon" />
                </div>
                <MarkerSelectModal
                    isOpen={isMarkerSelectModalOpen}
                    onClose={() => setIsMarkerSelectModalOpen(false)}
                    onSubmit={updateVendorMarkerHandler}
                />
            </div>
            <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-semibold text-slate-900">
                    Show location
                </span>
                <Switch
                    checked={isLocationShown}
                    onChange={
                        isLocationShown
                            ? hideLocationButtonHandler
                            : showLocationButtonHandler
                    }
                    className={`${
                        isLocationShown ? 'bg-green-600' : 'bg-green-400'
                    }
              relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Show location</span>
                    <span
                        aria-hidden="true"
                        className={`${
                            isLocationShown ? 'translate-x-7' : 'translate-x-0'
                        }
                  pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
            </div>

            <section className="relative rounded-lg mb-4 h-48 bg-green-100/80 overflow-hidden">
                <div
                    id="map"
                    ref={mapRef}
                    hidden={!isLocationShown}
                    className="h-full  max-w-full"
                ></div>
                {isLocationShown && vendor && map && (
                    <Marker
                        vendor={vendor}
                        map={map}
                        draggable={locationBroadcastMode === 'MANUAL'}
                        onDragEnd={broadcastLocationHandler}
                        pulseColor="green"
                    />
                )}
                {isLocationShown && (
                    <button
                        className="absolute bottom-6 right-4 w-10 h-10 flex justify-center items-center bg-white rounded-full shadow z-10"
                        onClick={focusLocationButtonHandler}
                        aria-label="Focus on my location"
                    >
                        <MapPinIcon className="w-6 h-6 text-green-600"></MapPinIcon>
                    </button>
                )}

                {!isLocationShown && (
                    <div className="grid place-items-center h-full">
                        <div className="flex flex-col items-center">
                            <EyeSlashIcon className="w-16 h-16 mb-1 text-green-900" />
                            <span className="text-green-900 font-bold">
                                Your location is hidden
                            </span>
                        </div>
                    </div>
                )}
            </section>

            <Tab.Group
                as={'div'}
                selectedIndex={
                    locationBroadcastMode === 'MANUAL'
                        ? 0
                        : locationBroadcastMode === 'STATIC'
                        ? 1
                        : 2
                }
                onChange={(index) => {
                    switch (index) {
                        case 0:
                            return manualModeButtonHandler()
                        case 1:
                            return staticModeButtonHandler()
                        case 2:
                            return realTimeModeButtonHandler()
                    }
                }}
            >
                <Tab.List className="flex space-x-1 rounded-lg bg-green-300/20 p-1 mb-4">
                    {['Manual', 'Static', 'Realtime'].map((tab) => {
                        return (
                            <Tab
                                key={tab}
                                className={({ selected }) =>
                                    clsx(
                                        'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-green-700',
                                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
                                        selected
                                            ? 'bg-white'
                                            : 'text-green-500 hover:bg-white/[0.12] hover:text-green-600'
                                    )
                                }
                            >
                                {tab}
                            </Tab>
                        )
                    })}
                </Tab.List>
                <Tab.Panels className="mb-12">
                    <Tab.Panel></Tab.Panel>
                    <Tab.Panel>
                        <Button
                            fullWidth
                            onClick={() =>
                                updateLocationButtonHandler(
                                    locationBroadcastMode
                                )
                            }
                            disabled={!isLocationShown}
                        >
                            Update location
                        </Button>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>

            <DashboardProductsCell userId={vendor?.id} />
        </div>
    )
}
