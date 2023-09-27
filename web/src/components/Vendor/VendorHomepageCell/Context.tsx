import { toast } from '@redwoodjs/web/dist/toast'
import { createContext, useCallback, useEffect, useState } from 'react'
import useMap from 'src/hooks/useMap'
import type {
    VendorHomepageCellQuery,
    HideVendorLocationMutation,
    HideVendorLocationMutationVariables,
    LocationBroadcastMode,
    BroadcastLocationMutation,
    BroadcastLocationMutationVariables,
    UpdateVendorMarkerMutation,
    UpdateVendorMarkerMutationVariables,
} from 'types/graphql'
import {
    BROADCAST_LOCATION_MUTATION,
    HIDE_VENDOR_LOCATION_MUTATION,
    UPDATE_VENDOR_MARKER,
} from 'src/components/Vendor/VendorHomepageCell/VendorHomepageCell'
import { useMutation } from '@redwoodjs/web'
import tt from '@tomtom-international/web-sdk-maps'
import { getCurrentPositionAsync } from 'src/hooks/useCoordinates'

export interface VendorHomepageContetProps {
    vendor: VendorHomepageCellQuery['vendor']
    children: React.ReactNode
}

export interface VendorHomepageContextValue {
    vendor: VendorHomepageCellQuery['vendor']
    focusLocationButtonHandler: () => void
    isLocationShown: boolean
    setIsVendorProfileModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    isVendorProfileModalOpen: boolean
    isMarkerSelectModalOpen: boolean
    setIsMarkerSelectModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    updateVendorMarkerHandler: (url: string) => void
    updateLocationButtonHandler: (locationBroadcastMode: string) => void
    manualModeButtonHandler: () => void
    staticModeButtonHandler: () => void
    realTimeModeButtonHandler: () => void
    hideLocationButtonHandler: () => void
    showLocationButtonHandler: () => void
    broadcastLocationHandler: ({
        latitude,
        longitude,
        locationBroadcastMode,
    }: {
        latitude: number

        longitude: number

        locationBroadcastMode: LocationBroadcastMode
    }) => void
    locationBroadcastMode: LocationBroadcastMode
    setLocationBroadcastmode: React.Dispatch<
        React.SetStateAction<LocationBroadcastMode>
    >
    onRefSet: (ref: any) => void
    map: tt.Map
}

export const VendorHomepageContext =
    createContext<VendorHomepageContextValue>(null)

export const VendorHomepageContextProvider = ({
    vendor,
    children,
}: VendorHomepageContetProps) => {
    const [hideVendorLocation] = useMutation<
        HideVendorLocationMutation,
        HideVendorLocationMutationVariables
    >(HIDE_VENDOR_LOCATION_MUTATION)
    const [broadcastLocation] = useMutation<
        BroadcastLocationMutation,
        BroadcastLocationMutationVariables
    >(BROADCAST_LOCATION_MUTATION)
    const [updateVendorMarker] = useMutation<
        UpdateVendorMarkerMutation,
        UpdateVendorMarkerMutationVariables
    >(UPDATE_VENDOR_MARKER)
    const [isLocationShown, setIsLocationShown] = useState(
        !vendor?.locationHidden
    )

    const defaultLocationBroadcastMode =
        vendor?.locationBroadcastMode == 'REALTIME'
            ? 'STATIC'
            : vendor?.locationBroadcastMode

    const [locationBroadcastMode, setLocationBroadcastmode] =
        useState<LocationBroadcastMode>(defaultLocationBroadcastMode)
    const [isVendorProfileModalOpen, setIsVendorProfileModalOpen] =
        useState(false)
    const [isMarkerSelectModalOpen, setIsMarkerSelectModalOpen] =
        useState(false)

    const { map, onRefSet } = useMap()

    // if location is shown on visit, broadcast the location
    useEffect(() => {
        ;(async () => {
            if (isLocationShown && map && vendor) {
                map.setCenter([vendor.longitude, vendor.latitude])
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

    const showLocationButtonHandler = async () => {
        setIsLocationShown(true)
        if (locationBroadcastMode === 'REALTIME') {
            setLocationBroadcastmode('STATIC')
        }
        map.setCenter([vendor.longitude, vendor.latitude])
        await broadcastLocationHandler({
            latitude: vendor.latitude,
            longitude: vendor.longitude,
            locationBroadcastMode,
        })
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
        <VendorHomepageContext.Provider
            value={{
                vendor,

                focusLocationButtonHandler,
                isLocationShown,

                isVendorProfileModalOpen,
                setIsVendorProfileModalOpen,

                isMarkerSelectModalOpen,
                setIsMarkerSelectModalOpen,

                manualModeButtonHandler,
                staticModeButtonHandler,
                realTimeModeButtonHandler,

                hideLocationButtonHandler,
                showLocationButtonHandler,

                updateVendorMarkerHandler,

                updateLocationButtonHandler,

                broadcastLocationHandler,

                locationBroadcastMode,

                setLocationBroadcastmode,

                onRefSet,

                map,
            }}
        >
            {children}
        </VendorHomepageContext.Provider>
    )
}

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
