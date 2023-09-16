import tt from '@tomtom-international/web-sdk-maps'
import { useEffect } from 'react'
import { User } from 'types/graphql'
import clsx from 'clsx'

export function getMarkerColor({
    locationBroadcastMode,
}: Pick<User, 'locationBroadcastMode'>) {
    if (locationBroadcastMode === 'REALTIME') {
        return 'red'
    }

    return 'gray'
}

export interface CreateMarkerProps {
    vendor: Pick<
        User,
        'id' | 'latitude' | 'longitude' | 'markerUrl' | 'locationBroadcastMode'
    >
    pulseColor?: string
    draggable?: boolean
}

export const createMarker = ({
    vendor,
    pulseColor,
    draggable,
}: CreateMarkerProps) => {
    let container = document.createElement('div')
    container.className = 'relative flex justify-center items-center'

    let border = document.createElement('div')
    border.className = clsx(
        'animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75',
        pulseColor === 'gray' && 'bg-gray-400',
        pulseColor === 'red' && 'bg-red-400',
        pulseColor === 'green' && 'bg-green-400'
    )

    let image = document.createElement('img')
    ;(image.src = vendor.markerUrl), (image.className = 'w-6 h-6')

    container.appendChild(image)
    container.appendChild(border)

    const marker = new tt.Marker({
        element: container,
        draggable,
    }).setLngLat([vendor.longitude, vendor.latitude])

    marker.getElement().id = String(vendor.id)
    return marker
}

export interface MarkerProps {
    map: any
    vendor: CreateMarkerProps['vendor']
    onClick?: (vendor: any) => void
    draggable?: boolean
    onDragEnd?: ({
        latitude,
        longitude,
        locationBroadcastMode,
    }: {
        latitude: number
        longitude: number
        locationBroadcastMode: User['locationBroadcastMode']
    }) => void
    pulseColor?: string
}

const Marker = ({
    map,
    vendor,
    onClick,
    draggable = false,
    onDragEnd,
    pulseColor: pingColor,
}: MarkerProps) => {
    useEffect(() => {
        if (!map || !vendor) return
        let marker: tt.Marker

        if (pingColor) {
            marker = createMarker({ vendor, draggable, pulseColor: pingColor })
        } else {
            pingColor = getMarkerColor({
                locationBroadcastMode: vendor.locationBroadcastMode,
            })
            marker = createMarker({ vendor, draggable, pulseColor: pingColor })
        }

        if (draggable) {
            marker.setDraggable(true)
            marker.on('dragend', (event) => {
                const coordinates = marker.getLngLat()
                onDragEnd({
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                    locationBroadcastMode: vendor.locationBroadcastMode,
                })
            })
        }

        if (onClick) {
            marker.getElement().addEventListener('click', () => {
                onClick(vendor)
            })
        }

        marker.addTo(map)

        return () => {
            marker.remove()
        }
    }, [map, vendor, vendor.locationBroadcastMode, draggable])

    return null
}

export default Marker
