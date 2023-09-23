import { createContext, useState } from 'react'
import {
    ImageCellQuery,
    DeleteAdminImageMutation,
    DeleteAdminImageMutationVariables,
    AdminUpdateImageTitleMutation,
    AdminUpdateImageTitleMutationVariables,
} from 'types/graphql'
import {
    ADMIN_UPDATE_IMAGE_TITLE_MUTATION,
    DELETE_IMAGE_MUTATION,
} from 'src/components/Admin/Image/ImageCell/ImageCell'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'

export interface ImageCellContextValue {
    image: ImageCellQuery['image']
    isDeleteImageModalOpen: boolean
    setIsDeleteImageModalOpen: (value: boolean) => void
    onDeleteImage: () => void

    isUpdateTitleModalOpen: boolean
    toggleUpdateTitleModal: () => void
    onUpdateTitle: (value: string) => void
}

export const ImageCellContext = createContext<ImageCellContextValue>(null)

export interface ImageCellContextProviderProps {
    image: ImageCellQuery['image']
    children: React.ReactNode
}

export const ImageCellContextProvider = ({
    image,
    children,
}: ImageCellContextProviderProps) => {
    const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] = useState(false)

    const [isUpdateTitleModalOpen, setIsUpdateTitleModalOpen] = useState(false)

    const [deleteImage] = useMutation<
        DeleteAdminImageMutation,
        DeleteAdminImageMutationVariables
    >(DELETE_IMAGE_MUTATION, {
        onCompleted: () => {
            toast.success('Image deleted')
            navigate(routes.adminImages())
        },
        onError: (error) => {
            error.graphQLErrors.forEach((e) => {
                toast.error(e.message)
            })
        },
    })

    const onDeleteImage = () => {
        deleteImage({ variables: { id: image.id } })
    }

    const [updateTitle] = useMutation<
        AdminUpdateImageTitleMutation,
        AdminUpdateImageTitleMutationVariables
    >(ADMIN_UPDATE_IMAGE_TITLE_MUTATION, {
        onCompleted: () => {
            toast.success('Image title updated')
            setIsUpdateTitleModalOpen(false)
        },
        onError: (error) => {
            error.graphQLErrors.forEach((e) => {
                toast.error(e.message)
            })
        },
    })

    const onUpdateTitle = (newTitle: string) => {
        updateTitle({ variables: { id: image.id, title: newTitle } })
    }
    const toggleUpdateTitleModal = () => {
        setIsUpdateTitleModalOpen(!isUpdateTitleModalOpen)
    }

    const value = {
        image,
        isDeleteImageModalOpen,
        setIsDeleteImageModalOpen,
        onDeleteImage,

        isUpdateTitleModalOpen,
        toggleUpdateTitleModal,
        onUpdateTitle,
    }

    return (
        <ImageCellContext.Provider value={value}>
            {children}
        </ImageCellContext.Provider>
    )
}
