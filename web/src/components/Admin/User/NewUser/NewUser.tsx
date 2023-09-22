import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import UserForm from 'src/components/Admin/User/UserForm'

import type { CreateUserInput, CustomCreateUserInput } from 'types/graphql'
import Form, { FormProps } from './Form/Form'

const CREATE_USER_MUTATION = gql`
    mutation CreateUserMutation($input: CustomCreateUserInput!) {
        customCreateUser(input: $input) {
            id
        }
    }
`

const NewUser = () => {
    const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION, {
        onCompleted: () => {
            toast.success('User created')
            navigate(routes.adminUsers())
        },
        onError: (error) => {
            toast.error(error.message)
        },
    })

    const onSave = (input: CustomCreateUserInput) => {
        createUser({ variables: { input } })
    }

    return (
        <Form
            onSubmit={onSave}
            onCancel={() => {
                navigate(routes.adminUsers())
            }}
        />
    )
}

export default NewUser
