import {
    QuestionMarkCircleIcon,
    XMarkIcon,
    MapPinIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid'
import tt from '@tomtom-international/web-sdk-maps'
import { Consumer, useEffect, useRef, useState } from 'react'
import usePusher from 'src/hooks/usePusher'
import { Product, User } from 'types/graphql'
import BaseModal from '../Modals/BaseModal'
import Marker, { MarkerProps } from '../Marker/Marker'
import useCoordinates from 'src/hooks/useCoordinates'
import { useApolloClient } from '@apollo/client'
import { QUERY as CONSUMER_MAP_QUERY } from '../ConsumerMapCell/ConsumerMapCell'
import Select from 'react-select'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { formatDatetime } from 'src/lib/formatters'
function removeSpacesAndHyphens(str: string) {
    return str.replace(/[\s-]/g, '')
}

function searchMatches(query: string, target: string) {
    query = query.toLowerCase()
    target = target.toLowerCase()

    const sanitizedQuery = removeSpacesAndHyphens(query)
    const sanitizedTarget = removeSpacesAndHyphens(target)

    return sanitizedTarget.includes(sanitizedQuery)
}

export type ConsumerMapVendor = VendorInfoModalProps['vendor'] &
    MarkerProps['vendor']

export interface ConsumerMapVendorImage {
    id: number
    title: string
    url: string
    userId: number
}

export interface ConsumerMapVendorProduct {
    id: number
    name: string
    availability: boolean
    userId: number
}

export interface ConsumerMapProps {
    vendors: ConsumerMapVendor[]
    products: ConsumerMapVendorProduct[]
    className?: string
}

const ConsumerMap = ({ vendors, products, className }: ConsumerMapProps) => {
    const [pusher, channel] = usePusher()
    const mapRef = useRef(null)
    const [map, setMap] = useState<tt.Map>(null)
    const apolloClient = useApolloClient()

    const coordinates = useCoordinates()
    const [userMarker, setUserMarker] = useState<tt.Marker>(null)
    const [selectedVendor, setSelectedVendor] =
        useState<(typeof vendors)[0]>(null)
    const [isLegendModalOpen, setIsLegendModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] =
        useState<ProductSearchOption>(null)

    const [focusedVendorIndex, setFocusedVendorIndex] = useState(0)

    const [filteredVendors, setFilteredVendors] = useState(
        vendors.filter((products) => {
            if (!selectedProduct) return true

            return products.productsOffered.some((product) =>
                searchMatches(selectedProduct.label, product.name)
            )
        })
    )

    // set the filtered vendors when the vendors change
    useEffect(() => {
        setFilteredVendors(
            vendors.filter((products) => {
                if (!selectedProduct) return true

                return products.productsOffered.some((product) =>
                    searchMatches(selectedProduct.label, product.name)
                )
            })
        )

        // if there is a selected vendor, update it
        if (selectedVendor) {
            setSelectedVendor(
                vendors.find((vendor) => vendor.id === selectedVendor.id)
            )
        }
    }, [vendors])

    // initialize map
    useEffect(() => {
        if (!mapRef.current) return
        const map = tt.map({
            key: process.env.TOMTOM_API_KEY,
            container: mapRef.current,
            zoom: 15,
        })
        setMap(map)

        return () => {
            if (map) {
                map.remove()
            }
        }
    }, [mapRef])

    // center map on user's location
    useEffect(() => {
        let marker: tt.Marker
        if (map && coordinates) {
            map.setCenter([coordinates.longitude, coordinates.latitude])
            map.zoomTo(15)
            marker = new tt.Marker().setLngLat([
                coordinates.longitude,
                coordinates.latitude,
            ])
            marker.setPopup(
                new tt.Popup({ offset: 35 }).setHTML(`<h3>You are here</h3>`)
            )
            marker.addTo(map)
            marker.togglePopup()
            setUserMarker(marker)
        }

        return () => {
            if (marker) {
                marker.remove()
            }
        }
    }, [map, coordinates])

    function focusLocationButtonHandler() {
        if (userMarker) {
            map.setCenter(userMarker.getLngLat())
            if (!userMarker.getPopup().isOpen()) {
                userMarker.togglePopup()
            }
        }
    }

    // bind pusher events
    useEffect(() => {
        if (pusher && channel) {
            channel.bind(
                'location-broadcast',
                ({ vendor }: { vendor: ConsumerMapVendor }) => {
                    // check if marker already exists, if it does, update it, else add it as a new one
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_QUERY },
                        (data) => {
                            const vendorIndex = data.mapVendors.findIndex(
                                (v) => v.id === vendor.id
                            )
                            if (vendorIndex !== -1) {
                                return {
                                    mapVendors: data.mapVendors.map((v) => {
                                        if (v.id === vendor.id) {
                                            return vendor
                                        }
                                        return v
                                    }),
                                }
                            } else {
                                return {
                                    mapVendors: data.mapVendors.concat({
                                        ...vendor,
                                    }),
                                }
                            }
                        }
                    )
                }
            )

            channel.bind('hide-location', ({ vendor }: { vendor: User }) => {
                // remove marker
                apolloClient.cache.updateQuery(
                    { query: CONSUMER_MAP_QUERY },
                    (data) => ({
                        mapVendors: data.mapVendors.filter(
                            (v) => v.id !== vendor.id
                        ),
                    })
                )
            })

            channel.bind(
                'product-update',
                ({ updatedProduct }: { updatedProduct: Product }) => {
                    if (updatedProduct.availability === true) {
                        apolloClient.cache.updateQuery(
                            { query: CONSUMER_MAP_QUERY },
                            (data) => ({
                                mapVendors: data.mapVendors.map((vendor) => {
                                    if (vendor.id !== updatedProduct.userId)
                                        return vendor
                                    return {
                                        ...vendor,
                                        productsOffered: vendor.productsOffered
                                            .filter(
                                                (p) =>
                                                    p.id !== updatedProduct.id
                                            )
                                            .concat({ ...updatedProduct }),
                                    }
                                }),
                            })
                        )
                    } else {
                        apolloClient.cache.updateQuery(
                            { query: CONSUMER_MAP_QUERY },
                            (data) => ({
                                mapVendors: data.mapVendors.map((vendor) => {
                                    if (vendor.id !== updatedProduct.userId)
                                        return vendor
                                    return {
                                        ...vendor,
                                        productsOffered:
                                            vendor.productsOffered.filter(
                                                (p) =>
                                                    p.id !== updatedProduct.id
                                            ),
                                    }
                                }),
                            })
                        )
                    }
                }
            )

            channel.bind(
                'product-delete',
                ({ deletedProduct }: { deletedProduct: Product }) => {
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_QUERY },
                        (data) => ({
                            mapVendors: data.mapVendors.map((vendor) => {
                                if (vendor.id !== deletedProduct.userId)
                                    return vendor
                                return {
                                    ...vendor,
                                    productsOffered:
                                        vendor.productsOffered.filter(
                                            (p) => p.id !== deletedProduct.id
                                        ),
                                }
                            }),
                        })
                    )
                }
            )

            channel.bind(
                'image-create',
                ({ newImage }: { newImage: ConsumerMapVendorImage }) => {
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_QUERY },
                        (data) => ({
                            mapVendors: data.mapVendors.map((vendor) => {
                                if (vendor.id !== newImage.userId) return vendor
                                return {
                                    ...vendor,
                                    featuredImages: vendor.featuredImages
                                        .filter((i) => i.id !== newImage.id)
                                        .concat({ ...newImage }),
                                }
                            }),
                        })
                    )
                }
            )

            channel.bind(
                'image-delete',
                ({
                    deletedImage,
                }: {
                    deletedImage: ConsumerMapVendorImage
                }) => {
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_QUERY },
                        (data) => ({
                            mapVendors: data.mapVendors.map((vendor) => {
                                if (vendor.id !== deletedImage.userId)
                                    return vendor
                                return {
                                    ...vendor,
                                    featuredImages:
                                        vendor.featuredImages.filter(
                                            (i) => i.id !== deletedImage.id
                                        ),
                                }
                            }),
                        })
                    )
                }
            )
        }

        return () => {
            if (pusher && channel) {
                channel.unbind('location-broadcast')
                channel.unbind('hide-location')
                channel.unbind('product-update')
                channel.unbind('product-delete')
                channel.unbind('image-create')
                channel.unbind('image-delete')
            }
        }
    }, [pusher, channel, map, vendors])

    return (
        <div className={className}>
            <ProductSearch
                products={products}
                onChange={(newValue) => {
                    setSelectedProduct(newValue)
                    setFilteredVendors(
                        vendors.filter((vendor) => {
                            if (!newValue) return true

                            return vendor.productsOffered.some((product) =>
                                searchMatches(newValue.label, product.name)
                            )
                        })
                    )
                }}
                value={selectedProduct}
            />

            <div id="map" ref={mapRef} className="w-full h-full">
                <div className="absolute w-full h-full">
                    <div className="w-full h-full flex items-center p-4 justify-between">
                        <button
                            className="z-10 bg-green-400 text-white rounded-full p-2 shadow-md"
                            onClick={() => {
                                let safeIndex =
                                    focusedVendorIndex % filteredVendors.length
                                map.setCenter([
                                    filteredVendors[safeIndex].longitude,
                                    filteredVendors[safeIndex].latitude,
                                ])

                                // move the focused vendor index to the previous vendor
                                setFocusedVendorIndex(
                                    (filteredVendors.length + safeIndex - 1) %
                                        filteredVendors.length
                                )
                            }}
                        >
                            <ChevronLeftIcon className="w-8 h-8" />
                        </button>
                        <button
                            className="z-10 bg-green-400 text-white rounded-full p-2 shadow-md"
                            onClick={() => {
                                let safeIndex =
                                    focusedVendorIndex % filteredVendors.length
                                map.setCenter([
                                    filteredVendors[safeIndex].longitude,
                                    filteredVendors[safeIndex].latitude,
                                ])

                                // move the focused vendor index to the next vendor
                                setFocusedVendorIndex(
                                    (safeIndex + 1) % filteredVendors.length
                                )
                            }}
                        >
                            <ChevronRightIcon className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute z-10 bottom-20 right-5">
                <button
                    className="bg-white text-white rounded-full p-2 shadow-md"
                    onClick={focusLocationButtonHandler}
                >
                    <MapPinIcon className="w-6 h-6 text-green-600"></MapPinIcon>
                </button>
                <LegendModal
                    isOpen={isLegendModalOpen}
                    onClose={() => setIsLegendModalOpen(false)}
                />
            </div>
            <div className="absolute z-10 bottom-5 right-5">
                <button
                    className="bg-green-400 text-white rounded-full p-2 shadow-md"
                    onClick={() => setIsLegendModalOpen(true)}
                >
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                </button>
                <LegendModal
                    isOpen={isLegendModalOpen}
                    onClose={() => setIsLegendModalOpen(false)}
                />
            </div>
            <div>
                {filteredVendors.map((vendor) => (
                    <Marker
                        onClick={() => setSelectedVendor(vendor)}
                        key={vendor.id}
                        map={map}
                        vendor={vendor}
                    />
                ))}
            </div>
            {selectedVendor && (
                <VendorInfoModal
                    vendor={selectedVendor}
                    isOpen={!!selectedVendor}
                    onClose={() => setSelectedVendor(null)}
                />
            )}
        </div>
    )
}

interface VendorInfoModalProps {
    vendor: Pick<
        User,
        | 'id'
        | 'name'
        | 'latitude'
        | 'longitude'
        | 'markerUrl'
        | 'lastLocationUpdate'
        | 'locationBroadcastMode'
        | 'locationHidden'
    > & {
        productsOffered: ConsumerMapVendorProduct[]
        featuredImages: ConsumerMapVendorImage[]
    }
    isOpen: boolean
    onClose: () => void
}

const VendorInfoModal = ({ vendor, isOpen, onClose }: VendorInfoModalProps) => {
    return (
        <>
            <div>
                {vendor && (
                    <BaseModal onClose={onClose} isOpen={isOpen}>
                        <div className="p-4">
                            <div className=" text-right">
                                <button onClick={onClose}>
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                            <section className="mb-8">
                                <div className="flex flex-col items-center">
                                    <div className="flex items-center justify-center rounded-full p-4 w-24 h-24 bg-green-100 hover:bg-green-200">
                                        <img
                                            src={vendor?.markerUrl}
                                            alt="marker icon"
                                        />
                                    </div>
                                    <h2 className="font-bold text-lg">
                                        {vendor.name}
                                    </h2>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h3 className="font-bold text-medium">
                                    Available Products
                                </h3>
                                {vendor &&
                                    vendor.productsOffered.length === 0 && (
                                        <p>No available products</p>
                                    )}
                                <ul className="list-disc pl-4">
                                    {vendor.productsOffered.map((product) => (
                                        <li key={product.id}>{product.name}</li>
                                    ))}
                                </ul>
                            </section>
                            <section className="mb-8">
                                <h3 className="font-bold text-medium">
                                    Featured Images
                                </h3>
                                {vendor &&
                                    vendor.featuredImages.length === 0 && (
                                        <p>No featured images</p>
                                    )}
                                <div className="">
                                    {vendor.featuredImages.map((image) => (
                                        <div key={image.id} className="mt-4">
                                            <p>{image.title}</p>
                                            <img
                                                src={image.url}
                                                className="rounded-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <footer className="mt-2">
                                <h3 className="text-sm font-semibold">
                                    Last location update
                                </h3>
                                {formatDatetime(vendor.lastLocationUpdate)}
                            </footer>
                        </div>
                    </BaseModal>
                )}
            </div>
        </>
    )
}

interface LegendModalProps {
    isOpen: boolean
    onClose: () => void
}

const LegendModal = ({ isOpen, onClose }: LegendModalProps) => {
    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <div className="text-right">
                    <button onClick={onClose}>
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <BaseModal.Title>Legends</BaseModal.Title>
                <div>
                    <div>
                        <div className="flex items-center space-x-4">
                            <span className="relative flex">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
                            </span>
                            <div>
                                <p className="text-sm">
                                    Gray ping indicates that the vendor has{' '}
                                    <span className="font-bold">Static</span>{' '}
                                    location broadcast mode. This means that it
                                    is only updated personally by the vendor and
                                    the vendor might not be exactly on the
                                    location indicated.
                                </p>
                                <p className="text-sm mt-2">
                                    {'('}Kindly check the{' '}
                                    <span className="font-bold">
                                        last location update
                                    </span>{' '}
                                    below the modal that shows up after clicking
                                    on the vendor marker{')'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center space-x-4">
                            <span className="relative flex">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-400"></span>
                            </span>
                            <p className="text-sm">
                                Red ping indicates that the vendor is on{' '}
                                <span className="font-bold">Realtime</span>{' '}
                                location broadcast mode. In realtime mode,
                                vendor location is broadcasted every 5 seconds.
                            </p>
                        </div>
                    </div>
                </div>
            </BaseModal>
        </>
    )
}

interface ProductSearchOption {
    value: number
    label: string
}

export const ProductSearch = ({
    products,
    onChange,
    value,
}: {
    products: ConsumerMapVendorProduct[]
    onChange: (newValue: ProductSearchOption) => void
    value: ProductSearchOption
}) => {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            name={'products'}
            isClearable={true}
            onChange={onChange}
            value={value}
            options={products.map((product) => ({
                value: product.id,
                label: product.name,
            }))}
        />
    )
}

export default ConsumerMap
