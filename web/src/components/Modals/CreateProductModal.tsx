import { Dialog } from "@headlessui/react"
import { useState } from "react"
import { useAuth } from "src/auth"
import { CreateProductInput } from "types/graphql"


const CreateProductModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
    isOpen: boolean,
    onClose: () => void,
    onSubmit: (data: CreateProductInput) => void
  }) => {
    const [name, setName] = useState('')
    const { currentUser } = useAuth()

  return (
    <Dialog
        open={isOpen}
        onClose={onClose}
    >
      <Dialog.Title>Add Product</Dialog.Title>
      <Dialog.Panel>

      <form onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, availability: false, userId: currentUser?.id})
        setName('')
      }}>
          <label>
            <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
          </label>
          <button type="button">Add Product</button>
      </form>
      </Dialog.Panel>
    </Dialog>
  )
}

export default CreateProductModal
