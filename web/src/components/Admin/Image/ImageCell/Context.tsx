import { createContext } from 'react'
import {
    ImageCellQuery,
    DeleteAdminImageMutation,
    DeleteAdminImageMutationVariables,
} from 'types/graphql'
import { DELETE_IMAGE_MUTATION } from 'src/components/Admin/Image/ImageCell/ImageCell'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { navigate, routes } from '@redwoodjs/router'

export interface ImageCellContextValue {
    image: ImageCellQuery['image']
    isDeleteImageModalOpen: boolean
    setIsDeleteImageModalOpen: (value: boolean) => void
    onDeleteImage: () => void
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
    const [isDeleteImageModalOpen, setIsDeleteImageModalOpen] =
        React.useState(false)

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
        if (
            confirm('Are you sure you want to delete image ' + image.id + '?')
        ) {
            deleteImage({ variables: { id: image.id } })
        }
    }

    const value = {
        image,
        isDeleteImageModalOpen,
        setIsDeleteImageModalOpen,
        onDeleteImage,
    }

    return (
        <ImageCellContext.Provider value={value}>
            {children}
        </ImageCellContext.Provider>
    )
}
