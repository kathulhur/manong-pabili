import { PickerInline } from 'filestack-react'

import type {
    EditMarkerById,
    Marker as MarkerType,
    User as UserType,
} from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'

type FormMarker = NonNullable<EditMarkerById['marker']>

export interface MarkerFormProps {
    marker?: EditMarkerById['marker']
    onSave: (input: Pick<MarkerType, 'url'>) => void
    error: RWGqlError
    loading: boolean
    userId: UserType['id']
}

const MarkerForm = (props: MarkerFormProps) => {
    const [url, setUrl] = React.useState(props?.marker?.url ?? '')
    const onFileUpdload = (response) => {
        setUrl(response.filesUploaded[0].url)
    }

    const onSubmit = () => {
        if (url === '') {
            toast.error('Please upload an image')
        } else {
            props.onSave({
                url,
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
                                            transformations: {
                                                crop: {
                                                    force: true,
                                                    aspectRatio: 1,
                                                },
                                            },
                                        }}
                                    />
                                ) : (
                                    <img src={url} alt={'uploaded marker'} />
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

export default MarkerForm
