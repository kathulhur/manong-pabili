import {
    Form,
    FormError,
    FieldError,
    Label,
    TextField,
    Submit,
} from '@redwoodjs/forms'
import { PickerInline } from 'filestack-react'
import { useEffect, useRef, useState } from 'react'
import BaseModal from '../Modals/BaseModal'
import { toast } from '@redwoodjs/web/dist/toast'

export interface ImageFormProps {
    onSave: (data: { title: string; url: string }, id?: number) => void
    error: any
    image?: any
    loading?: boolean
    isOpen?: boolean
    onClose?: () => void
}

const ImageForm = (props) => {
    const [url, setUrl] = useState(props?.image?.url)
    const titleFieldRef = useRef(null)
    const submitButtonRef = useRef(null)

    const onSubmit = (data) => {
        const dataWithUrl = Object.assign(data, { url })
        props.onSave(data, props?.image?.id)
        setUrl('')
    }

    useEffect(() => {
        if (url) {
            submitButtonRef.current.click()
        }
    }, [url])

    const onFileUpdload = (response) => {
        setUrl(response.filesUploaded[0].url)
    }

    return (
        <BaseModal isOpen={props?.isOpen} onClose={props?.onClose}>
            <BaseModal.Title>Upload Featured Image</BaseModal.Title>
            <div className="rw-form-wrapper">
                <Form onSubmit={onSubmit} error={props.error}>
                    <FormError
                        error={props.error}
                        wrapperClassName="rw-form-error-wrapper"
                        titleClassName="rw-form-error-title"
                        listClassName="rw-form-error-list"
                    />

                    <Label
                        name="title"
                        className="rw-label"
                        errorClassName="rw-label rw-label-error"
                    >
                        Title
                    </Label>
                    <TextField
                        name="title"
                        ref={titleFieldRef}
                        className="rw-input"
                        errorClassName="rw-input rw-input-error"
                        validation={{ required: true }}
                    />

                    <FieldError name="title" className="rw-field-error" />
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
                                    process.env.REDWOOD_ENV_FILESTACK_API_KEY
                                }
                                onUploadDone={onFileUpdload}
                                pickerOptions={{
                                    accept: 'image/*',
                                    maxFiles: 1,
                                    uploadInBackground: false,
                                    onUploadStarted: (files) => {
                                        if (!titleFieldRef.current?.value) {
                                            toast.error('Please enter a title')
                                            throw new Error(
                                                'Please enter a title'
                                            )
                                        }
                                    },
                                }}
                            />
                        ) : (
                            <img src={url} alt={titleFieldRef.current?.value} />
                        )}
                    </div>

                    <Submit
                        ref={submitButtonRef}
                        hidden
                        className="rw-button rw-button-blue"
                    />
                </Form>
            </div>
        </BaseModal>
    )
}

export default ImageForm
