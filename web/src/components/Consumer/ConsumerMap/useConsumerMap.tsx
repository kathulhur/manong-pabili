import { useEffect } from 'react'
import usePusher from 'src/hooks/usePusher'
import { ConsumerMapCellQuery } from 'types/graphql'
import { useApolloClient } from '@apollo/client'
import { QUERY as CONSUMER_MAP_CELL_QUERY } from '../ConsumerMapCell/ConsumerMapCell'

export default function useConsumerMap() {
    const [pusher, channel] = usePusher()
    const apolloClient = useApolloClient()
    // bind pusher events
    useEffect(() => {
        if (pusher && channel) {
            channel.bind(
                'location-broadcast',
                ({
                    vendor,
                }: {
                    vendor: ConsumerMapCellQuery['mapVendors'][number]
                }) => {
                    // check if marker already exists, if it does, update it, else add it as a new one
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_CELL_QUERY },
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

            channel.bind(
                'hide-location',
                ({
                    vendor,
                }: {
                    vendor: ConsumerMapCellQuery['mapVendors'][number]
                }) => {
                    // remove marker
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_CELL_QUERY },
                        (data) => ({
                            mapVendors: data.mapVendors.filter(
                                (v) => v.id !== vendor.id
                            ),
                        })
                    )
                }
            )

            channel.bind(
                'product-update',
                ({
                    updatedProduct,
                }: {
                    updatedProduct: ConsumerMapCellQuery['mapVendors'][number]['productsOffered'][number]
                }) => {
                    if (updatedProduct.availability === true) {
                        apolloClient.cache.updateQuery(
                            { query: CONSUMER_MAP_CELL_QUERY },
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
                            { query: CONSUMER_MAP_CELL_QUERY },
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
                ({
                    deletedProduct,
                }: {
                    deletedProduct: ConsumerMapCellQuery['mapVendors'][0]['productsOffered'][0]
                }) => {
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_CELL_QUERY },
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
                ({
                    newImage,
                }: {
                    newImage: ConsumerMapCellQuery['mapVendors'][number]['featuredImages'][number]
                }) => {
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_CELL_QUERY },
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
                    deletedImage: ConsumerMapCellQuery['mapVendors'][number]['featuredImages'][number]
                }) => {
                    apolloClient.cache.updateQuery(
                        { query: CONSUMER_MAP_CELL_QUERY },
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
    }, [pusher, channel])

    return [pusher, channel]
}
