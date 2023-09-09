import tt from "@tomtom-international/web-sdk-maps";
import { Popup } from "@tomtom-international/web-sdk-maps";
import { useEffect } from "react";
import { FindVendorHomepageQuery, MapVendorsQuery } from "types/graphql";
import { LocationBroadcastMode } from '@prisma/client'
import clsx from "clsx";

export interface CreateMarkerProps {
    vendor: MapVendorsQuery['mapVendors'][number];
    pulseColor?: string;
    draggable?: boolean;
}



export const createMarker = ({
    vendor,
    pulseColor
}: CreateMarkerProps) => {

    let container = document.createElement('div')
    container.className = 'relative flex justify-center items-center'

    let border = document.createElement('div')
    border.className = clsx(
        'animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75',
        pulseColor === 'gray' && 'bg-gray-400',
        pulseColor === 'red' && 'bg-red-400',
        pulseColor === 'green' && 'bg-green-400',
    )

    let image = document.createElement('img')
    image.src = vendor.markerUrl,
    image.className = 'w-6 h-6'

    container.appendChild(image)
    container.appendChild(border)

    const marker = new tt.Marker({
        element: container,
    }).setLngLat([vendor.longitude, vendor.latitude])

    marker.getElement().id = String(vendor.id)
    return marker
}

interface MarkerProps {
    map: any;
    vendor: FindVendorHomepageQuery['vendor'];
    onClick?: (vendor: any) => void
    draggable?: boolean;
    onDragEnd?: ({ latitude, longitude, locationBroadcastMode }: {
        latitude: number,
        longitude: number,
        locationBroadcastMode: LocationBroadcastMode
    }) => void
    pulseColor?: string;
}

const getMarkerColor = (locationBroadcastMode: FindVendorHomepageQuery['vendor']['locationBroadcastMode']) => {
    if(locationBroadcastMode === LocationBroadcastMode.REALTIME) {
        return 'red'
    }

    return 'gray'
}



const Marker = ({map, vendor, onClick, draggable=false, onDragEnd, pulseColor}: MarkerProps) => {
    useEffect(() => {
        if (!map || !vendor) return
        let marker: tt.Marker;

        if (pulseColor) {
            marker = createMarker({vendor, draggable, pulseColor})
        } else {
            pulseColor = getMarkerColor(vendor.locationBroadcastMode)
            marker = createMarker({vendor, draggable, pulseColor })
        }

        if (draggable) {
            marker.setDraggable(true)
            marker.on('dragend', (event) => {
                const coordinates = marker.getLngLat()
                onDragEnd({ latitude: coordinates.lat, longitude: coordinates.lng, locationBroadcastMode: vendor.locationBroadcastMode })
            })
        }

        if(onClick) {
            marker.getElement().addEventListener('click', () => {
                onClick(vendor)
            })
        }

        marker.addTo(map)

        return () => {
            marker.remove()
        }
    }, [map, vendor, vendor.locationBroadcastMode, draggable])

    return null;
};

export default Marker;
