import {
    Form,
    FormError,
    FieldError,
    Label,
    TextField,
    CheckboxField,
    NumberField,
    Submit,
} from '@redwoodjs/forms'

import type { EditProductById, UpdateProductInput, User } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'

type FormProduct = NonNullable<EditProductById['product']>

interface ProductFormProps {
    product?: EditProductById['product']
    userId: Pick<User, 'id'>
    onSave: ({ name }: { name: string }) => void
    error: RWGqlError
    loading: boolean
}

const ProductForm = (props: ProductFormProps) => {
    const [name, setName] = React.useState(props?.product?.name ?? '')

    const onSubmit = () => {
        props.onSave({
            name,
        })
    }

    return (
        <div className="m-2 border-b border-gray-900/10 pb-12 px-4 py-6 md:p-8">
            <form
                onSubmit={onSubmit}
                className="px-4 grid grid-cols-3 gap-y-12"
            >
                <div className="col-span-3 md:col-span-1 flex justify-between items-center md:block">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        New User
                    </h2>
                </div>
                <div className="col-span-3 bg-white md:p-8 md:shadow-sm md:ring-1 md:ring-gray-900/5 md:rounded-xl md:col-span-2 ">
                    <div className="gap-y-8 grid divide-y-2">
                        <div className="grid gap-y-4">
                            <h2 className="mb-4 text-sm font-semibold leading-7 text-gray-700">
                                Personal Information
                            </h2>
                            <div className="grid gap-y-4 md:grid md:grid-cols-3 md:gap-x-4">
                                <div className="max-w-sm md:col-span-2">
                                    <label
                                        htmlFor="full-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Product Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="full-name"
                                            id="full-name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            autoComplete="full-name"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => {}}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProductForm
