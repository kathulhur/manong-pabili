import { useState } from 'react'
import BaseModal from './BaseModal'
import Button from '../Button/Button'

export interface SingleInputModalStringProps {
    defaultValue?: string
    isOpen: boolean
    label: string
    onClose: () => void
    onSubmit: (username: String) => void
}

const SingleInputModalString = ({
    defaultValue = '',
    isOpen,
    label,
    onClose,
    onSubmit,
}: SingleInputModalStringProps) => {
    const [value, setValue] = useState(defaultValue)

    return (
        <>
            <BaseModal isOpen={isOpen} onClose={onClose}>
                <BaseModal.Title>{label}</BaseModal.Title>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        onSubmit(value)
                        setValue('')
                    }}
                >
                    <label>
                        <input
                            name="string-input"
                            type="text"
                            className="rw-input"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </label>
                    <BaseModal.Footer>
                        <Button type="submit" fullWidth>
                            Submit
                        </Button>
                    </BaseModal.Footer>
                </form>
            </BaseModal>
        </>
    )
}

export default SingleInputModalString
