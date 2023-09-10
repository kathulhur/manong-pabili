import { useEffect, useRef, useState } from 'react'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps'
import { useApolloClient } from '@apollo/client'
import { MetaTags, useQuery } from '@redwoodjs/web'
import { MapVendorsQuery, VendorProductsQuery, User, Product } from 'types/graphql'
import useCoordinates from 'src/hooks/useCoordinates'
import usePusher from 'src/hooks/usePusher'
import Select from 'react-select'
import Marker from 'src/components/Marker/Marker'
import BaseModal from 'src/components/Modals/BaseModal'
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'


const MAP_VENDORS_QUERY = gql`
    query MapVendorsQuery {
        mapVendors {
            __typename
            id
            name
            username
            email
            latitude
            longitude
            lastLocationUpdate
            locationBroadcastMode
            locationHidden
            productsOffered {
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

export const formatDatetime = (dateTime?: string) => {
    let output: string | JSX.Element = "";

    if (dateTime) {
      output = (
        <time dateTime={dateTime} title={dateTime}>
          {new Date(dateTime).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </time>
      );
    }

    return output;
};

const MapPage = () => {
    const apolloClient = useApolloClient()
    const coordinates = useCoordinates();

    const [pusher, channel] = usePusher();
    const mapRef = useRef(null)
    const [map, setMap] = useState<tt.Map>(null)

    const { data }= useQuery<MapVendorsQuery>(MAP_VENDORS_QUERY)
    const [vendors, setVendors] = useState<MapVendorsQuery['mapVendors']>([])

    const { data: vendorProductsQueryData  }= useQuery<VendorProductsQuery>(VENDOR_PRODUCTS_QUERY)
    const [products, setProducts] = useState<VendorProductsQuery['vendorProducts']>([])

    const [selectedVendor, setSelectedVendor] = useState<MapVendorsQuery['mapVendors'][number]>(null)
    const [isLegendModalOpen, setIsLegendModalOpen] = useState(false)

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
                apolloClient.cache.updateQuery(
                    { query: MAP_VENDORS_QUERY },
                    (data) => {
                        const vendorIndex = data.mapVendors.findIndex((v) => v.id === vendor.id)
                        if (vendorIndex !== -1) {
                            return {
                                mapVendors: data.mapVendors.map((v) => {
                                    if (v.id === vendor.id) {
                                        return vendor
                                    }
                                    return v
                                })
                            }
                        } else {
                            return {
                                mapVendors: data.mapVendors.concat({...vendor})
                            }
                        }
                    }
                )

            })

            channel.bind('hide-location', ({vendor}: {vendor: User}) => {
                // remove marker
                apolloClient.cache.updateQuery(
                    { query: MAP_VENDORS_QUERY },
                    (data) => ({
                        mapVendors: data.mapVendors.filter((v) => v.id !== vendor.id)
                    }),

                )

            })

            channel.bind('product-update', ({ updatedProduct }: {updatedProduct: Product}) => {
                if (updatedProduct.availability === true) {
                    apolloClient.cache.updateQuery(
                        { query: MAP_VENDORS_QUERY },
                        (data) => ({
                            mapVendors: data.mapVendors.map((vendor) => {
                                if(vendor.id !== updatedProduct.userId) return vendor
                                return {
                                    ...vendor,
                                    productsOffered: vendor.productsOffered.filter((p) => p.id !== updatedProduct.id).concat({...updatedProduct})
                                }
                            })
                        })
                    )
                } else {
                    apolloClient.cache.updateQuery(
                        { query: MAP_VENDORS_QUERY },
                        (data) => ({
                            mapVendors: data.mapVendors.map((vendor) => {
                                if(vendor.id !== updatedProduct.userId) return vendor
                                return {
                                    ...vendor,
                                    productsOffered: vendor.productsOffered.filter((p) => p.id !== updatedProduct.id)
                                }
                            })
                        })
                    )
                }


            })

            channel.bind('product-delete', ({ deletedProduct }: {deletedProduct: Product}) => {
                apolloClient.cache.updateQuery(
                    { query: MAP_VENDORS_QUERY },
                    (data) => ({
                        mapVendors: data.mapVendors.map((vendor) => {
                            if(vendor.id !== deletedProduct.userId) return vendor
                            return {
                                ...vendor,
                                productsOffered: vendor.productsOffered.filter((p) => p.id !== deletedProduct.id)
                            }
                        })
                    })
                )
            })

        }

        return () => {
            if(pusher && channel) {
                channel.unbind("location-broadcast")
                channel.unbind("hide-location")
                channel.unbind("product-update")
                channel.unbind("product-delete")
            }
        }

    }, [pusher, channel, map, vendors])




    // initialize map
    useEffect(() => {
        if(!mapRef.current) return
        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: 'map',
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
            setVendors([...(structuredClone(data.mapVendors))])
            if (selectedVendor) {
                setSelectedVendor(data.mapVendors.find((vendor) => vendor.id === selectedVendor.id))
            }
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
            const filteredVendors = data.mapVendors.filter((vendor) => searchMatches(selectedProduct.label, vendor.productsOffered.map((product) => product.name).join(' ')))
            setVendors(structuredClone(filteredVendors))
        } else {
            setVendors(structuredClone(data.mapVendors))
        }
    }
    return (
        <>
        <MetaTags title="Map" description="Map page" />
        <div className='flex flex-col h-screen'>
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
                className='w-full h-full'
                >
                <BaseModal
                    isOpen={isLegendModalOpen}
                    onClose={() => setIsLegendModalOpen(false)}
                >
                    <div className='text-right'>
                        <button onClick={() => setIsLegendModalOpen(false)}>
                            <XMarkIcon className='w-6 h-6' />
                        </button>

                    </div>
                    <BaseModal.Title>
                        Legends
                    </BaseModal.Title>
                    <div>
                        <div>
                            <div className='flex items-center space-x-4'>
                                <span className="relative flex">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
                                </span>
                                <div>
                                    <p className='text-sm'>Gray ping indicates that the vendor has <span className='font-bold'>Static</span> location broadcast mode. This means that it is only updated personally by the vendor and the vendor might not be exactly on the location indicated.</p>
                                    <p className='text-sm mt-2'>{'('}Kindly check the <span className='font-bold'>last location update</span> below the modal that shows up after clicking on the vendor marker{')'}</p>
                                </div>
                            </div>
                        </div>

                        <div className='mt-8'>
                            <div className='flex items-center space-x-4'>
                                <span className="relative flex">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
                                </span>
                                <p className='text-sm'>Red ping indicates that the vendor is on <span className='font-bold'>Realtime</span> location broadcast mode. In realtime mode, vendor location is broadcasted every 5 seconds.</p>
                            </div>
                        </div>

                    </div>
                </BaseModal>
                <div className='absolute z-10 bottom-5 right-5'>
                    <button
                        className='bg-green-400 text-white rounded-full p-2 shadow-md'
                        onClick={() => setIsLegendModalOpen(true)}
                        >
                        <QuestionMarkCircleIcon className='w-6 h-6' />
                    </button>
                </div>
            </div>
            <div>
            { vendors.map((vendor) => (
                <Marker onClick={() => setSelectedVendor(vendor)} key={vendor.id} map={map} vendor={vendor} />
            ))}
            </div>
            <div>
                {selectedVendor && (
                    <BaseModal
                    onClose={() => setSelectedVendor(null)}
                    isOpen={selectedVendor != null}

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
                                {selectedVendor && selectedVendor.productsOffered.length === 0 && (
                                    <p>No available products</p>
                                )}
                                <ul className='list-disc pl-4'>
                                    {selectedVendor.productsOffered.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </section>
                            <section className='mb-8'>
                                <h3 className='font-bold text-medium'>Featured Images</h3>
                                {selectedVendor && selectedVendor.featuredImages.length === 0 && (
                                    <p>No featured images</p>
                                )}
                                <div className='flex flex-col space-y-4'>
                                    {selectedVendor.featuredImages.map((image) => (
                                        <div key={image.id}>
                                            <p>{image.title}</p>
                                            <img src={image.url} />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <footer className='mt-2'>
                                    <h3 className='text-sm font-semibold'>Last location update</h3>
                                    {formatDatetime(selectedVendor.lastLocationUpdate)}
                            </footer>
                        </div>
                    </BaseModal>
                )}
            </div>
        </div>
        </>
    )
}

export default MapPage
