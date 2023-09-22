import { toast } from '@redwoodjs/web/dist/toast'
import { createContext } from 'react'
import { MarkerCellQuery } from 'types/graphql'
import { DELETE_MARKER_MUTATION } from 'src/components/Admin/Marker/MarkerCell/MarkerCell'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'

export interface MarkerCellContextValue {
    marker: MarkerCellQuery['marker']
    isDeleteMarkerModalOpen: boolean
    setIsDeleteMarkerModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    onDeleteMarker: () => void
}

export const MarkerCellContext = createContext<MarkerCellContextValue>(null)

export interface MarkerCellContextProviderProps {
    marker: MarkerCellQuery['marker']
    children: React.ReactNode
}

export const MarkerCellContextProvider = ({
    marker,
    children,
}: MarkerCellContextProviderProps) => {
    const [isDeleteMarkerModalOpen, setIsDeleteMarkerModalOpen] =
        React.useState(false)

    const [deleteMarker] = useMutation(DELETE_MARKER_MUTATION, {
        onCompleted: () => {
            toast.success('Marker deleted')
            navigate(routes.adminMarkers())
        },
        onError: (error) => {
            error.graphQLErrors.map(({ message }) => toast.error(message))
        },
    })

    const onDeleteMarker = () => {
        deleteMarker({
            variables: {
                id: marker.id,
            },
        })

        setIsDeleteMarkerModalOpen(false)
    }

    return (
        <MarkerCellContext.Provider
            value={{
                marker,
                isDeleteMarkerModalOpen,
                setIsDeleteMarkerModalOpen,
                onDeleteMarker,
            }}
        >
            {children}
        </MarkerCellContext.Provider>
    )
}
