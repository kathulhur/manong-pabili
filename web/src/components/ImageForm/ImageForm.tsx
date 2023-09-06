import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import { PickerInline } from 'filestack-react'
import { useState } from 'react'
import BaseModal from '../Modals/BaseModal'


export interface ImageFormProps {
  onSave: (data: {title: string, url: string}, id?: number) => void
  error: any
  image?: any
  loading?: boolean
  isOpen?: boolean
  onClose?: () => void
}

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const ImageForm = (props) => {
  const [url, setUrl] = useState(props?.image?.url)
  const [title, setTitle] = useState(props?.image?.title)
  const onSubmit = (data) => {
    const dataWithUrl = Object.assign(data, {url})
    props.onSave(data, props?.image?.id)
  }



  const onFileUpdload = (response) => {
    console.info(response)
    setUrl(response.filesUploaded[0].url)
  }

  return (
    <BaseModal
      isOpen={props?.isOpen}
      onClose={props?.onClose}
    >
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
          value={title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
          />

        <FieldError name="title" className="rw-field-error" />
        <div className='mt-4'>
          { !url ?
            <PickerInline
            apikey={process.env.REDWOOD_ENV_FILESTACK_API_KEY}
            onSuccess={onFileUpdload}
            /> :
            <img
              src={url}
              alt={title}
            />
          }
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
    </BaseModal>
  )
}

export default ImageForm