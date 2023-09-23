import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

import MarkerForm, {
    MarkerFormProps,
} from 'src/components/Admin/Marker/MarkerForm'

import {
    CreateMarkerMutation,
    type CreateMarkerInput,
    CreateMarkerMutationVariables,
} from 'types/graphql'

const CREATE_MARKER_MUTATION = gql`
    mutation CreateMarkerMutation($input: CreateMarkerInput!) {
        createMarker(input: $input) {
            id
        }
    }
`

const NewMarker = () => {
    const params = useParams()
    const userId = params?.userId
    useEffect(() => {
        if (!userId) {
            navigate(routes.adminMarkers())
        }
    })
    const [createMarker, { loading, error }] = useMutation<
        CreateMarkerMutation,
        CreateMarkerMutationVariables
    >(CREATE_MARKER_MUTATION, {
        onCompleted: () => {
            toast.success('Marker created')
            navigate(routes.adminMarkers())
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSave: MarkerFormProps['onSave'] = (input) => {
        createMarker({
            variables: {
                input: {
                    ...input,
                    userId: parseInt(userId),
                },
            },
        })
    }

    return (
        userId && (
            <MarkerForm
                userId={parseInt(userId)}
                onSave={onSave}
                loading={loading}
                error={error}
            />
        )
    )
}

export default NewMarker
