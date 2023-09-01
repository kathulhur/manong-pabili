import { useCallback, useEffect, useMemo, useState } from 'react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'

import { MetaTags, useQuery } from '@redwoodjs/web'
import { MapVendorsQuery, User } from 'types/graphql'
import useCoordinates from 'src/hooks/useCoordinates'
import usePusher from 'src/hooks/usePusher'
import icons from 'src/assets/js/icons'
import Select from 'react-select'


const MAP_VENDORS_QUERY = gql`
    query MapVendorsQuery {
        mapVendors {
            id
            name
            username
            email
            latitude
            longitude
            products {
                id
                name
            }
            roles
            markerUrl
        }
        vendorProducts {
            id
            name
        }
    }
`

export function buildPopupHtml({ name, products }) {
    return `
    <div>
      <h1 class='font-bold text-lg'>${name}</h1>
        <ul>
            ${products.map((product) => `<li class='text-sm'>${product.name}</li>`).join('')}
        </ul>
    </div>
  `
}


export const createMarker = (vendor: MapVendorsQuery['mapVendors'][number]) => {
    let image = document.createElement('img')
    image.src = vendor.markerUrl,
    image.className = 'w-6 h-6'
    const marker = new tt.Marker({
        element: image,
    }).setLngLat([vendor.longitude, vendor.latitude])



    marker.setPopup(
        new tt.Popup({ offset: 35 }).setHTML(buildPopupHtml({ name: vendor.name, products: vendor.products }))
    )
    marker.getElement().id = String(vendor.id)
    return marker
}

function removeSpacesAndHyphens(str: string) {
    return str.replace(/[\s-]/g, '');
}

function searchMatches(query: string, target: string) {
    query = query.toLowerCase()
    target = target.toLowerCase()

    const sanitizedQuery = removeSpacesAndHyphens(query);
    const sanitizedTarget = removeSpacesAndHyphens(target);

    return sanitizedTarget.includes(sanitizedQuery);
}

const MapPage = () => {
    const coordinates = useCoordinates();
    const [map, setMap] = useState<tt.Map>(null)
    const [markers, setMarkers] = useState<tt.Marker[]>([])
    const { data }= useQuery<MapVendorsQuery>(MAP_VENDORS_QUERY)
    const [vendors, setVendors] = useState<MapVendorsQuery['mapVendors']>([])
    const [pusher, channel] = usePusher();
    const [products, setProducts] = useState<MapVendorsQuery['vendorProducts']>([])


    // filter vendors by selected product


    // zoom to current location
    useEffect(() => {
        console.log('map', map)
        console.log('coordinates', coordinates)
        if (map && coordinates) {
            console.log('zooming')
            map.setCenter([coordinates.longitude, coordinates.latitude])
            map.zoomTo(15)
        }
    }, [map, coordinates])


    // bind pusher events
    useEffect(() => {
        if (pusher && channel) {
            console.log('binding')
            channel.bind('location-broadcast', ({vendor}: {vendor: User}) => {
                console.log("location-broadcast")
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
                console.log('hide-location')
                const marker = markers.find((m) => m.getElement().id === String(vendor.id))
                if (marker) {
                    marker.remove()
                    setMarkers(markers.filter((m) => m.getElement().id !== String(vendor.id)))
                }

            })
        }

        return () => {
            if(pusher && channel) {
                console.log('unbinding')
                channel.unbind("location-broadcast")
                channel.unbind("hide-location")
            }
        }

    }, [pusher, channel, map, markers])




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
        console.log('data', data)
        if (data) {
            setVendors([...data.mapVendors])
            setProducts([...data.vendorProducts])
        }
    }
    , [data])

    // handle product search; filter vendors by selected product
    const searchProductHandler = (selectedProduct: {value: number, label: string}) => {
        console.log('selected', selectedProduct)
        if (selectedProduct) {
            const filteredVendors = data.mapVendors.filter((vendor) => {
                return vendor.products.find((product) => searchMatches(product.name, selectedProduct.label))
            })
            console.log('filtered', filteredVendors)
            setVendors(filteredVendors)
        } else {
            setVendors(data.mapVendors)
        }
    }

    // initialize markers once the map and vendors are ready
    //     & update markers when vendors change
    useEffect(() => {
        if (map && vendors) {
            console.log('initializing markers')
            markers.forEach((marker) => {
                marker.remove()
            })

            const vendorMarkers = vendors.map(createMarker)
            vendorMarkers.forEach((marker) => {
                marker.addTo(map)
            })

            setMarkers(vendorMarkers)
        }
    }, [map, vendors])


    return (
        <>
            <MetaTags title="Map" description="Map page" />
            <Select
                className='basic-single'
                classNamePrefix='select'
                isSearchable={true}
                name={'products'}
                isClearable={true}
                onChange={searchProductHandler}
                options={products.map((product) => ({ value: product.id, label: product.name }))}
            />
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
