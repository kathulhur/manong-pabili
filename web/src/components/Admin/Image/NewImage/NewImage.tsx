import { navigate, routes, useParams } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'

import ImageForm, { ImageFormProps } from 'src/components/Admin/Image/ImageForm'

import {
    CreateImageMutation,
    type CreateImageInput,
    CreateImageMutationVariables,
} from 'types/graphql'

const CREATE_IMAGE_MUTATION = gql`
    mutation CreateImageMutation($input: CreateImageInput!) {
        createImage(input: $input) {
            id
        }
    }
`

const NewImage = () => {
    const params = useParams()
    const userId = params?.userId

    useEffect(() => {
        if (!userId) {
            navigate(routes.adminImages())
        }
    }, [userId])

    const [createImage, { loading, error }] = useMutation<
        CreateImageMutation,
        CreateImageMutationVariables
    >(CREATE_IMAGE_MUTATION, {
        onCompleted: () => {
            toast.success('Image created')
            navigate(
                routes.adminImages({
                    userId: userId,
                })
            )
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSave: ImageFormProps['onSave'] = (input) => {
        createImage({
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
            <ImageForm
                userId={typeof userId === 'string' ? parseInt(userId) : 0}
                onSave={onSave}
                loading={loading}
                error={error}
            />
        )
    )
}

export default NewImage
