import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'

import { useApolloClient } from '@apollo/client'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { MapVendorsQuery, VendorProductsQuery, User } from 'types/graphql'
import useCoordinates from 'src/hooks/useCoordinates'
import usePusher from 'src/hooks/usePusher'
import icons from 'src/assets/js/icons'
import Select from 'react-select'
import Marker from 'src/components/Marker/Marker'
import { renderToString } from 'react-dom/server'
import BaseModal from 'src/components/Modals/BaseModal'
import { XMarkIcon } from '@heroicons/react/20/solid'

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
            featuredImages {
                id
                title
                url
            }
        }
    }
`

const VENDOR_PRODUCTS_QUERY = gql`
    query VendorProductsQuery {
        vendorProducts {
            id
            name
        }
    }
`



export function buildPopupHtml({ name, products }) {
    return(
    <div>
        <h1 className='font-bold text-lg'>{name}</h1>
        <ul>
            {products.map((product) =>
                <li key={product.id} className='text-sm'>{product.name}</li>
            )}
        </ul>
        {/* <button onClick={() => console.log('hey')}>View Vendor</button> */}
    </div>
  )
}


export const createMarker = (vendor: MapVendorsQuery['mapVendors'][number]) => {
    let image = document.createElement('img')
    image.src = vendor.markerUrl,
    image.className = 'w-6 h-6'
    const marker = new tt.Marker({
        element: image,
        click: () => alert('hey')
    }).setLngLat([vendor.longitude, vendor.latitude])



    // marker.setPopup(
    //     new tt.Popup({ offset: 35 }).setHTML(renderToString(buildPopupHtml({ name: vendor.name, products: vendor.products })))
    // )
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
    const apolloClient = useApolloClient()
    const coordinates = useCoordinates();
    const [map, setMap] = useState<tt.Map>(null)
    const { data }= useQuery<MapVendorsQuery>(MAP_VENDORS_QUERY)
    const { data: vendorProductsQueryData  }= useQuery<VendorProductsQuery>(VENDOR_PRODUCTS_QUERY)
    const [vendors, setVendors] = useState<MapVendorsQuery['mapVendors']>([])
    const [pusher, channel] = usePusher();
    const [products, setProducts] = useState<VendorProductsQuery['vendorProducts']>([])
    const mapRef = useRef(null)
    const [selectedVendor, setSelectedVendor] = useState<MapVendorsQuery['mapVendors'][number]>(null)

    // filter vendors by selected product


    // zoom to current location
    useEffect(() => {
        if (map && coordinates) {
            map.setCenter([coordinates.longitude, coordinates.latitude])
            map.zoomTo(15)
        }
    }, [map, coordinates])


    // bind pusher events
    useEffect(() => {
        if (pusher && channel) {
            channel.bind('location-broadcast', ({vendor}: {vendor: MapVendorsQuery['mapVendors'][number]}) => {
                // check if marker already exists, if it does, update it, else add it as a new one
                setVendors(vendors.filter((v) => v.id !== vendor.id).concat(vendor))

            })

            channel.bind('hide-location', ({vendor}: {vendor: User}) => {
                // remove marker
                setVendors(vendors.filter((v) => v.id !== vendor.id))

            })
        }

        return () => {
            if(pusher && channel) {
                channel.unbind("location-broadcast")
                channel.unbind("hide-location")
            }
        }

    }, [pusher, channel, map])




    // initialize map
    useEffect(() => {
        if(!mapRef.current) return
        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: 'map',
            // center: [121.004995, 14.610395],
            zoom: 15,
        })
        setMap(map)

        return () => {
            if(map) {
                map.remove()
            }
        }
    }, [mapRef])

    // set vendors once the data is ready
    useEffect(() => {
        if (data) {
            setVendors([...data.mapVendors])
        }
    }
    , [data])

    useEffect(() => {
        if (vendorProductsQueryData) {
            setProducts([...vendorProductsQueryData.vendorProducts])
        }
    }, [vendorProductsQueryData])

    // handle product search; filter vendors by selected product
    const searchProductHandler = (selectedProduct: {value: number, label: string}) => {
        if (selectedProduct) {
            const filteredVendors = data.mapVendors.filter((vendor) => {
                return vendor.products.find((product) => searchMatches(product.name, selectedProduct.label))
            })
            setVendors(filteredVendors)
        } else {
            setVendors(data.mapVendors)
        }
    }
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
                onMenuOpen={() => {
                    apolloClient.refetchQueries({
                        include: [VENDOR_PRODUCTS_QUERY],

                    })
                }}
                options={products.map((product) => ({ value: product.id, label: product.name }))}
            />
            <div
                id="map"
                ref={mapRef}
                style={{ width: '100%', height: '100vh' }}
            ></div>
            <div>
            { vendors.map((vendor) => (
                <Marker onClick={() => setSelectedVendor(vendor)} key={vendor.id} map={map} vendor={vendor} />
            ))}
            </div>
            <div>
                {selectedVendor && (
                    <BaseModal
                        onClose={() => setSelectedVendor(null)}
                        isOpen={selectedVendor!= null}

                    >
                        <div id="abcd">
                            <div className=' text-right'>
                                <button onClick={() => setSelectedVendor(null)}>
                                    <XMarkIcon className='w-6 h-6' />
                                </button>
                            </div>
                            <section className='mb-8'>
                                <div className='flex flex-col items-center'>
                                    <div
                                        className='flex items-center justify-center rounded-full p-4 w-24 h-24 bg-green-100 hover:bg-green-200'
                                    >
                                        <img src={selectedVendor?.markerUrl} alt="marker icon"/>
                                    </div>
                                    <h2 className='font-bold text-lg'>{selectedVendor.name}</h2>

                                </div>
                            </section>

                            <section className='mb-8'>

                            <h3 className='font-bold text-medium'>Available Products</h3>
                                <ul className='list-disc pl-4'>
                                    {selectedVendor.products.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </section>
                            <section className='mb-8'>
                                <h3 className='font-bold text-medium'>Featured Images</h3>
                                <div className='flex flex-col space-y-4'>
                                    {selectedVendor.featuredImages.map((image) => (
                                        <div key={image.id}>
                                            <p>{image.title}</p>
                                            <img src={image.url} />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </BaseModal>
                )}
            </div>

            <h1>Let the games begin</h1>
        </>
    )
}

export default MapPage
