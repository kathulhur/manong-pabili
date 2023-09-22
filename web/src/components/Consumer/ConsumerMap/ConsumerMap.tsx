import {
    QuestionMarkCircleIcon,
    XMarkIcon,
    MapPinIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/20/solid'
import { useContext } from 'react'
import { Image, Product as ProductType, User as UserType } from 'types/graphql'
import BaseModal from '../../Modals/BaseModal'
import Marker, { MarkerProps } from '../../Marker/Marker'

import Select from 'react-select'
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { formatDatetime } from 'src/lib/formatters'
import Button from 'src/components/Button/Button'
import {
    ConsumerMapCellContext,
    searchMatches,
} from '../ConsumerMapCell/Context'

export type ConsumerMapVendor = VendorInfoModalProps['vendor'] &
    MarkerProps['vendor']

export interface ConsumerMapVendorImage
    extends Pick<Image, 'id' | 'title' | 'url' | 'userId'> {}

export interface ConsumerMapVendorProduct
    extends Pick<ProductType, 'id' | 'name' | 'availability' | 'userId'> {}

export interface ConsumerMapProps {
    className?: string
}

const ConsumerMap = ({ className }: ConsumerMapProps) => {
    const context = useContext(ConsumerMapCellContext)
    return (
        <div className={className}>
            <div className="flex p-2 space-x-4 bg-green-400">
                <div className="flex-1">
                    {context?.selectedSearchType?.value === 'product' && (
                        <ProductSearch
                            products={context?.productOptions}
                            onChange={(newValue) => {
                                context?.setSelectedOption(newValue)
                                context?.setFilteredVendors(
                                    context?.vendors.filter((vendor) => {
                                        if (!newValue) return true

                                        return vendor.productsOffered.some(
                                            (product) =>
                                                searchMatches(
                                                    newValue.label,
                                                    product.name
                                                )
                                        )
                                    })
                                )
                            }}
                            value={context?.selectedOption}
                        />
                    )}

                    {context?.selectedSearchType?.value === 'vendor' && (
                        <VendorSearch
                            vendors={context?.vendorOptions}
                            onChange={(newValue) => {
                                context?.setSelectedOption(newValue)
                                context?.setFilteredVendors(
                                    context?.vendors.filter((vendor) => {
                                        if (!newValue) return true

                                        return searchMatches(
                                            newValue.label,
                                            vendor.name
                                        )
                                    })
                                )
                            }}
                            value={context?.selectedOption}
                        />
                    )}
                </div>
                <div>
                    <Select
                        defaultValue={context?.selectedSearchType}
                        onChange={(newValue) => {
                            context?.setSelectedSearchType(newValue)
                            context?.setSelectedOption(null)
                        }}
                        options={[
                            { value: 'product', label: 'Product' },
                            { value: 'vendor', label: 'Vendor' },
                        ]}
                    />
                </div>
            </div>
            <div id="map" ref={context?.onRefSet} className="w-full h-full">
                <div className="absolute w-full h-full">
                    <div className="w-full h-full flex items-center p-4 justify-between">
                        <button
                            className="z-10 bg-green-400 text-white rounded-full p-2 shadow-md"
                            onClick={context?.onLeftVendorButtonClicked}
                        >
                            <ChevronLeftIcon className="w-8 h-8" />
                        </button>
                        <button
                            className="z-10 bg-green-400 text-white rounded-full p-2 shadow-md"
                            onClick={context?.onRightVendorButtonClicked}
                        >
                            <ChevronRightIcon className="w-8 h-8" />
                        </button>
                    </div>
                </div>
            </div>
            <div className="absolute z-10 bottom-20 right-5">
                <button
                    className="bg-white text-white rounded-full p-2 shadow-md"
                    onClick={context?.focusLocationButtonHandler}
                >
                    <MapPinIcon className="w-6 h-6 text-green-600"></MapPinIcon>
                </button>
                <LegendModal
                    isOpen={context?.isLegendModalOpen}
                    onClose={() => context?.setIsLegendModalOpen(false)}
                />
            </div>
            <div className="absolute z-10 bottom-5 right-5">
                <button
                    className="bg-green-400 text-white rounded-full p-2 shadow-md"
                    onClick={() => context?.setIsLegendModalOpen(true)}
                >
                    <QuestionMarkCircleIcon className="w-6 h-6" />
                </button>
                <LegendModal
                    isOpen={context?.isLegendModalOpen}
                    onClose={() => context?.setIsLegendModalOpen(false)}
                />
            </div>
            <div>
                {context?.filteredVendors.map((vendor) => (
                    <Marker
                        onClick={() => {
                            context?.setSelectedVendor(vendor)
                            context?.setIsVendorInfoModalOpen(true)
                        }}
                        key={vendor.id}
                        map={context?.map}
                        vendor={vendor}
                    />
                ))}
            </div>
            <VendorInfoModal
                vendor={context?.selectedVendor}
                isOpen={context?.isVendorInfoModalOpen}
                onClose={() => context?.setIsVendorInfoModalOpen(false)}
                onLeftButtonClicked={context?.onLeftVendorButtonClicked}
                onRightButtonClicked={context?.onRightVendorButtonClicked}
            />
        </div>
    )
}

export interface VendorInfoModalProps {
    vendor: Pick<
        UserType,
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
    onLeftButtonClicked: () => void
    onRightButtonClicked: () => void
}

const VendorInfoModal = ({
    vendor,
    isOpen,
    onClose,
    onLeftButtonClicked,
    onRightButtonClicked,
}: VendorInfoModalProps) => {
    return (
        <>
            <div>
                {vendor && (
                    <BaseModal onClose={onClose} isOpen={isOpen}>
                        <div className=" text-right">
                            <button onClick={onClose}>
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="flex">
                            <div className="flex items-center">
                                <Button
                                    variant="subtle"
                                    onClick={onLeftButtonClicked}
                                >
                                    <ChevronLeftIcon className="w-12 h-12" />
                                </Button>
                            </div>
                            <div className="p-4">
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
                                        {vendor.productsOffered.map(
                                            (product) => (
                                                <li key={product.id}>
                                                    {product.name}
                                                </li>
                                            )
                                        )}
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
                                            <div
                                                key={image.id}
                                                className="mt-4"
                                            >
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
                            <div className="flex items-center">
                                <Button
                                    variant="subtle"
                                    onClick={onRightButtonClicked}
                                >
                                    <ChevronRightIcon className="w-12 h-12" />
                                </Button>
                            </div>
                        </div>
                    </BaseModal>
                )}
            </div>
        </>
    )
}

export interface LegendModalProps {
    isOpen: boolean
    onClose: () => void
}

const LegendModal = ({ isOpen, onClose }: LegendModalProps) => {
    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <div className="text-right">
                    <button autoFocus onClick={onClose}>
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

export interface SearchOption {
    value: number
    label: string
}

export interface ProductSearchProps {
    products: Pick<ProductType, 'id' | 'name'>[]
    onChange: (newValue: SearchOption) => void
    value: SearchOption
}

export const ProductSearch = ({
    products,
    onChange,
    value,
}: ProductSearchProps) => {
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

export interface VendorSearchProps {
    vendors: Pick<UserType, 'id' | 'name'>[]
    onChange: (newValue: SearchOption) => void
    value: SearchOption
}

export const VendorSearch = ({
    vendors,
    onChange,
    value,
}: VendorSearchProps) => {
    return (
        <Select
            className="basic-single"
            classNamePrefix="select"
            isSearchable={true}
            name={'vendors'}
            isClearable={true}
            onChange={onChange}
            value={value}
            options={vendors.map((vendor) => ({
                value: vendor.id,
                label: vendor.name,
            }))}
        />
    )
}

export interface SearchTypeOption {
    value: 'product' | 'vendor'
    label: string
}

export default ConsumerMap
