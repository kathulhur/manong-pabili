import { useState } from 'react'
import BaseModal from './BaseModal'
import Button from '../Button/Button'

const UpdateNameModal = ({
    defaultValue = '',
    isOpen,
    onClose,
    onSubmit,
}: {
    defaultValue?: string
    isOpen: boolean
    onClose: () => void
    onSubmit: (username: String) => void
}) => {
    const [name, setName] = useState(defaultValue)

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <BaseModal.Title>Update Full Name</BaseModal.Title>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(name)
                        setName('')
                    }}
                >
                    <label>
                        New full name
                        <input
                            name="username"
                            type="text"
                            className="rw-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <BaseModal.Footer>
                        <Button type="submit" fullWidth>
                            Update
                        </Button>
                    </BaseModal.Footer>
                </form>
            </BaseModal>
        </>
    )
}

export default UpdateNameModal
