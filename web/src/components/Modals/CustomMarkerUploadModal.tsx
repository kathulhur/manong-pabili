import BaseModal from './BaseModal'
import { useEffect, useState } from 'react'
import { PickerInline, PickerDropPane, PickerOverlay } from 'filestack-react'
import { Form, Submit } from '@redwoodjs/forms'

const CustomMarkerUploadModal = ({
    isOpen,
    onClose,
    onSubmit,
}: {
    isOpen: boolean
    onClose: () => void
    onSubmit: (url: string) => void
}) => {
    const [markerUrl, setMarkerUrl] = useState('')
    const submitButtonRef = React.useRef<HTMLButtonElement>(null)

    const onFileUpdload = (response) => {
        setMarkerUrl(response.filesUploaded[0].url)
    }

    useEffect(() => {
        if (markerUrl) {
            submitButtonRef.current.click()
        }
    }, [markerUrl])

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    if (markerUrl) {
                        onSubmit(markerUrl)
                    }
                }}
            >
                <BaseModal.Title>Custom Marker Icon</BaseModal.Title>
                <style>
                    {`
            /* Style for the Filestack picker modal */
            .fsp-picker--inline {
              min-width: 100%;
            }
          `}
                </style>
                {!markerUrl ? (
                    <PickerInline
                        apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
                        onUploadDone={onFileUpdload}
                        pickerOptions={{
                            accept: 'image/*',
                            maxFiles: 1,
                            uploadInBackground: false,
                            transformations: {
                                crop: {
                                    force: true,
                                    aspectRatio: 1,
                                },
                            },
                        }}
                    ></PickerInline>
                ) : (
                    <div className="flex items-center justify-center">
                        <img
                            className="object-scale-down"
                            src={markerUrl}
                            alt={'marker icon'}
                        />
                    </div>
                )}
                <Submit ref={submitButtonRef} className="hidden" />
            </form>
        </BaseModal>
    )
}

export default CustomMarkerUploadModal
