import { useAuth } from "src/auth"
import { CreateProductInput, Product } from "types/graphql"
import BaseModal from "./BaseModal"
import Button from "../Button/Button"
import { FieldError, Form, Label, TextField } from "@redwoodjs/forms"
import { IconKeys, iconImages } from "src/assets/js/icons"
import { useState } from "react"

const MarkerSelectModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (url: string) => void
}) => {
  const { currentUser } = useAuth()
  const [markerUrl, setMarkerUrl] = useState('')

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <BaseModal.Title>Change Marker</BaseModal.Title>

      <div
        className="grid grid-cols-6 gap-4"
        >
          { Object.values(iconImages).map((url) => (
            <div
              tabIndex={0}
              key={url}
              onClick={() => {
                onSubmit(url)
              }}

            >
              <img src={url} alt="marker icon" className='object-scale-down'/>
            </div>
          ))
          }
      </div>
    </BaseModal>
  )
}

export default MarkerSelectModal
