import { useAuth } from 'src/auth'
import {
    CreateProductInput,
    MarkerSelectModalQuery,
    MarkerSelectModalQueryVariables,
    Product,
    UploadMarkerMutation,
    UploadMarkerMutationVariables,
} from 'types/graphql'
import BaseModal from './BaseModal'
import Button from '../Button/Button'
import { FieldError, Form, Label, TextField } from '@redwoodjs/forms'
import { useState } from 'react'
import { PickerInline } from 'filestack-react'
import { PlusIcon } from '@heroicons/react/20/solid'
import CustomMarkerUploadModal from './CustomMarkerUploadModal'
import clsx from 'clsx'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import icons from 'src/assets/js/icons'

const UPLOAD_MARKER_MUTATION = gql`
    mutation UploadMarkerMutation($input: CreateMarkerInput!) {
        createMarker(input: $input) {
            id
            url
            userId
        }
    }
`

const MARKER_SELECT_MODAL_QUERY = gql`
    query MarkerSelectModalQuery($userId: Int!) {
        vendorMarkers(userId: $userId) {
            id
            url
            userId
        }
    }
`

const MarkerSelectModal = ({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (url: string) => void
}) => {
    const { currentUser } = useAuth()
    const { data } = useQuery<
        MarkerSelectModalQuery,
        MarkerSelectModalQueryVariables
    >(MARKER_SELECT_MODAL_QUERY, {
        variables: {
            userId: currentUser?.id,
        },
    })
    const [isUploadCustomMarkerModalOpen, setIsUploadCustomMarkerModalOpen] =
        useState(false)
    const [uploadMarker, { loading: uploadMarkerLoading, error }] = useMutation<
        UploadMarkerMutation,
        UploadMarkerMutationVariables
    >(UPLOAD_MARKER_MUTATION)

    const uploadMarkerHandler = (url: string) => {
        try {
            uploadMarker({
                variables: {
                    input: {
                        url: url,
                        userId: currentUser?.id,
                    },
                },
                onCompleted: () => {
                    toast.success('Marker uploaded')
                },
                update: (cache, { data }) => {
                    const newMarker = data?.createMarker
                    const existingMarkers = cache.readQuery<
                        MarkerSelectModalQuery,
                        MarkerSelectModalQueryVariables
                    >({
                        query: MARKER_SELECT_MODAL_QUERY,
                        variables: { userId: currentUser?.id },
                    })
                    if (existingMarkers && newMarker) {
                        cache.writeQuery<
                            MarkerSelectModalQuery,
                            MarkerSelectModalQueryVariables
                        >({
                            query: MARKER_SELECT_MODAL_QUERY,
                            variables: { userId: currentUser?.id },
                            data: {
                                vendorMarkers: [
                                    ...existingMarkers.vendorMarkers,
                                    newMarker,
                                ],
                            },
                        })
                    }
                },
            })
        } catch (e) {}
    }

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <BaseModal.Title>Change Marker</BaseModal.Title>

            <div
                className={clsx(
                    'grid grid-cols-5 gap-4 items-center sm:grid-cols-6 lg:grid-cols-8'
                )}
            >
                {Object.values(icons).map((url) => (
                    <div
                        tabIndex={0}
                        key={url}
                        onClick={() => {
                            onSubmit(url)
                        }}
                    >
                        <img
                            src={url}
                            alt="marker icon"
                            className="object-scale-down"
                        />
                    </div>
                ))}
                {data?.vendorMarkers.map((marker) => (
                    <div
                        tabIndex={0}
                        key={marker.url}
                        onClick={() => {
                            onSubmit(marker.url)
                        }}
                    >
                        <img
                            src={marker.url}
                            alt="marker icon"
                            className="object-scale-down"
                        />
                    </div>
                ))}
                <Button
                    disabled={
                        uploadMarkerLoading || data?.vendorMarkers.length >= 2
                    }
                    onClick={() => {
                        setIsUploadCustomMarkerModalOpen(true)
                    }}
                    variant="outline"
                >
                    <PlusIcon className="w-8 h-8" />
                </Button>
                <CustomMarkerUploadModal
                    isOpen={isUploadCustomMarkerModalOpen}
                    onClose={() => {
                        setIsUploadCustomMarkerModalOpen(false)
                    }}
                    onSubmit={(url) => {
                        uploadMarkerHandler(url)
                        setIsUploadCustomMarkerModalOpen(false)
                    }}
                />
            </div>
            <p className="mt-8 text-sm">
                Note: You can only have up to 3 custom markers. If you want to
                add a new one, delete existing markers on your profile page.
            </p>
        </BaseModal>
    )
}

export default MarkerSelectModal
