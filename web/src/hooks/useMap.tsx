import tt from '@tomtom-international/web-sdk-maps'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useMap() {
    const [mapElementRef, setMapElementRef] = useState(null)
    const [map, setMap] = useState<tt.Map>(null)
    const onRefSet = useCallback((ref) => {
        if (!ref) return
        setMapElementRef(ref)
    }, [])

    useEffect(() => {
        if (!mapElementRef) return
        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: mapElementRef,
            zoom: 15,
        })
        setMap(map)

        return () => {
            if (map) {
                map.remove()
            }
        }
    }, [mapElementRef])

    return {
        onRefSet,
        map,
    }
}
