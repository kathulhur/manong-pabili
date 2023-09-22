import { ConsumerMapCellQuery } from 'types/graphql'
import useConsumerMap from '../ConsumerMap/useConsumerMap'
import tt from '@tomtom-international/web-sdk-maps'
import { useState, useEffect } from 'react'
import useCoordinates from 'src/hooks/useCoordinates'
import useMap from 'src/hooks/useMap'
import {
    VendorInfoModalProps,
    SearchOption,
    SearchTypeOption,
    ProductSearchProps,
    VendorSearchProps,
} from '../ConsumerMap/ConsumerMap'

export function removeSpacesAndHyphens(str: string) {
    return str.replace(/[\s-]/g, '')
}

export function searchMatches(query: string, target: string) {
    query = query.toLowerCase()
    target = target.toLowerCase()

    const sanitizedQuery = removeSpacesAndHyphens(query)
    const sanitizedTarget = removeSpacesAndHyphens(target)

    return sanitizedTarget.includes(sanitizedQuery)
}

export interface ConsumerMapCellContextValue {
    vendors: ConsumerMapCellQuery['mapVendors']
    products: ConsumerMapCellQuery['mapVendors'][0]['productsOffered']
    onRefSet: (ref) => void
    map: tt.Map
    isVendorInfoModalOpen: boolean
    setIsVendorInfoModalOpen: (isOpen: boolean) => void
    coordinates: GeolocationCoordinates
    userMarker: tt.Marker
    selectedVendor: VendorInfoModalProps['vendor']
    setSelectedVendor: (vendor: VendorInfoModalProps['vendor']) => void
    isLegendModalOpen: boolean
    setIsLegendModalOpen: (isOpen: boolean) => void
    selectedOption: SearchOption
    setSelectedOption: (option: SearchOption) => void
    focusedVendorIndex: number
    selectedSearchType: SearchTypeOption
    setSelectedSearchType: (option: SearchTypeOption) => void
    filteredVendors: ConsumerMapCellQuery['mapVendors']
    productOptions: ProductSearchProps['products']
    vendorOptions: VendorSearchProps['vendors']
    focusLocationButtonHandler: () => void
    onLeftVendorButtonClicked: () => void
    onRightVendorButtonClicked: () => void
    setFilteredVendors: (vendors: ConsumerMapCellQuery['mapVendors']) => void
}

export const ConsumerMapCellContext =
    React.createContext<ConsumerMapCellContextValue>(undefined)

export interface ConsumerMapCellProps {
    children: React.ReactNode
    vendors: ConsumerMapCellQuery['mapVendors']
    products: ConsumerMapCellQuery['mapVendors'][0]['productsOffered']
}

export const ConsumerMapCellContextProvider = ({
    children,
    vendors,
    products,
}: ConsumerMapCellProps) => {
    useConsumerMap()
    const { onRefSet, map } = useMap()
    const [isVendorInfoModalOpen, setIsVendorInfoModalOpen] = useState(false)
    const coordinates = useCoordinates()
    const [userMarker, setUserMarker] = useState<tt.Marker>(null)
    const [selectedVendor, setSelectedVendor] =
        useState<VendorInfoModalProps['vendor']>(null)
    const [isLegendModalOpen, setIsLegendModalOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState<SearchOption>(null)
    const [focusedVendorIndex, setFocusedVendorIndex] = useState(0)
    const [selectedSearchType, setSelectedSearchType] =
        useState<SearchTypeOption>({ value: 'product', label: 'Product' })
    const [filteredVendors, setFilteredVendors] = useState(
        vendors.filter((products) => {
            if (!selectedOption) return true

            return products.productsOffered.some((product) =>
                searchMatches(selectedOption.label, product.name)
            )
        })
    )
    const [productOptions, setProductOptions] =
        useState<ProductSearchProps['products']>(products)
    const [vendorOptions, setVendorOptions] =
        useState<VendorSearchProps['vendors']>(vendors)

    useEffect(() => {
        setProductOptions(products)
    }, [products])

    // set the vendor options when the vendors change
    useEffect(() => {
        setVendorOptions(vendors)
    }, [vendors])

    // set the filtered vendors when the vendors change
    useEffect(() => {
        setFilteredVendors(
            vendors.filter((vendor) => {
                if (!selectedOption) return true

                if (selectedSearchType.value === 'vendor') {
                    return searchMatches(selectedOption.label, vendor.name)
                } else if (selectedSearchType.value === 'product') {
                    return vendor.productsOffered.some((product) =>
                        searchMatches(selectedOption.label, product.name)
                    )
                }
            })
        )
    }, [vendors, selectedOption])

    // update the selected vendor when the filtered vendors change
    useEffect(() => {
        if (selectedVendor) {
            setSelectedVendor(
                filteredVendors.find(
                    (vendor) => vendor.id === selectedVendor.id
                )
            )
        }
    }, [filteredVendors])

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

    function onLeftVendorButtonClicked() {
        let safeIndex = focusedVendorIndex % filteredVendors.length
        map.setCenter([
            filteredVendors[safeIndex].longitude,
            filteredVendors[safeIndex].latitude,
        ])

        // move the focused vendor index to the previous vendor
        setFocusedVendorIndex(
            (filteredVendors.length + safeIndex - 1) % filteredVendors.length
        )
        setSelectedVendor(filteredVendors[safeIndex])
    }

    function onRightVendorButtonClicked() {
        let safeIndex = focusedVendorIndex % filteredVendors.length
        map.setCenter([
            filteredVendors[safeIndex].longitude,
            filteredVendors[safeIndex].latitude,
        ])

        // move the focused vendor index to the next vendor
        setFocusedVendorIndex((safeIndex + 1) % filteredVendors.length)
        setSelectedVendor(filteredVendors[safeIndex])
    }

    return (
        <ConsumerMapCellContext.Provider
            value={{
                vendors,
                products,

                onRefSet,
                map,

                isVendorInfoModalOpen,
                setIsVendorInfoModalOpen,

                coordinates,

                userMarker,

                selectedVendor,
                setSelectedVendor,

                isLegendModalOpen,
                setIsLegendModalOpen,

                selectedOption,
                setSelectedOption,

                selectedSearchType,
                setSelectedSearchType,

                filteredVendors,
                setFilteredVendors,

                productOptions,
                vendorOptions,

                focusLocationButtonHandler,
                onLeftVendorButtonClicked,
                onRightVendorButtonClicked,

                focusedVendorIndex,
            }}
        >
            {children}
        </ConsumerMapCellContext.Provider>
    )
}
