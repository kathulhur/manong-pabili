import { useAuth } from "src/auth"
import { CreateProductInput, Product } from "types/graphql"
import BaseModal from "./BaseModal"
import Button from "../Button/Button"
import { FieldError, Form, Label, TextField } from "@redwoodjs/forms"

const CreateProductModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (data: CreateProductInput) => void
}) => {
  const { currentUser } = useAuth()

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <BaseModal.Title>Add Product</BaseModal.Title>

      <Form onSubmit={(data: Product) => {
        onSubmit({ ...data, availability: false, userId: currentUser?.id })
      }}>
        <div className="flex flex-col">
          <Label name="name" className="text-slate-900">Product name</Label>
          <TextField
            name="name"
            className="w-full border border-solid border-slate-200 rounded-lg px-4 py-2 focus:outline focus:outline-2 focus:outline-green-600"
            validation={{
              required: {
                value: true,
                message: 'Product name is required',
              }
            }}
            />
          <FieldError name="name" className="text-red-500 text-sm" />
        </div>

        <BaseModal.Footer>
          <Button type="submit" fullWidth>Add Product</Button>
        </BaseModal.Footer>
      </Form>
    </BaseModal>
  )
}

export default CreateProductModal
