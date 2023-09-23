import { PickerInline } from 'filestack-react'
import type {
    EditImageById,
    Image,
    UpdateImageInput,
    User as UserType,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { useParams } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/dist/toast'

type FormImage = NonNullable<EditImageById['image']>

export interface ImageFormProps {
    image?: EditImageById['image']
    onSave: (input: Pick<Image, 'url' | 'title'>) => void
    error: RWGqlError
    loading: boolean
    userId: UserType['id']
}

const ImageForm = (props: ImageFormProps) => {
    const [url, setUrl] = React.useState(props?.image?.url ?? '')
    const titleFieldRef = React.useRef(null)
    const onFileUpdload = (response) => {
        setUrl(response.filesUploaded[0].url)
    }

    const onSubmit = () => {
        if (
            !titleFieldRef.current?.value ||
            titleFieldRef.current?.value === ''
        ) {
            toast.error('Please enter a title')
        } else if (url === '') {
            toast.error('Please upload an image')
        } else {
            props.onSave({
                url,
                title: titleFieldRef.current?.value ?? '',
            })
        }
    }

    return (
        <div className="m-2 border-b border-gray-900/10 pb-12 px-4 py-6 md:p-8">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    onSubmit()
                }}
                className="px-4 grid grid-cols-3 gap-y-12"
            >
                <div className="col-span-3 md:col-span-1 flex justify-between items-center md:block">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        New Image
                    </h2>
                </div>
                <div className="col-span-3 bg-white md:p-8 md:shadow-sm md:ring-1 md:ring-gray-900/5 md:rounded-xl md:col-span-2 ">
                    <div className="gap-y-8 grid divide-y-2">
                        <div className="grid gap-y-4">
                            <h2 className="mb-4 text-sm font-semibold leading-7 text-gray-700">
                                Image Information
                            </h2>
                            <div className="grid gap-y-4 md:grid md:grid-cols-3 md:gap-x-4">
                                <div className="max-w-sm md:col-span-2">
                                    <label
                                        htmlFor="full-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            ref={titleFieldRef}
                                            type="text"
                                            name="full-name"
                                            id="full-name"
                                            autoComplete="full-name"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <style>
                                    {`
            /* Style for the Filestack picker modal */
            .fsp-picker--inline {
              min-width: 100%;
            }
          `}
                                </style>
                                {!url ? (
                                    <PickerInline
                                        apikey={
                                            process.env
                                                .REDWOOD_ENV_FILESTACK_API_KEY
                                        }
                                        onUploadDone={onFileUpdload}
                                        pickerOptions={{
                                            accept: 'image/*',
                                            maxFiles: 1,
                                            maxSize: 1024 * 1024 * 10,
                                            uploadInBackground: false,
                                            onUploadStarted: (files) => {
                                                if (
                                                    !titleFieldRef.current
                                                        ?.value
                                                ) {
                                                    toast.error(
                                                        'Please enter a title'
                                                    )
                                                    throw new Error(
                                                        'Please enter a title'
                                                    )
                                                }
                                            },
                                        }}
                                    />
                                ) : (
                                    <img
                                        src={url}
                                        alt={titleFieldRef.current?.value}
                                    />
                                )}
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

export default ImageForm
