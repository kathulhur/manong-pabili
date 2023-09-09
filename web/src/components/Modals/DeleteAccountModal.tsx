import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button/Button";

const DeleteAccountModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: String) => void;
}) => {
  const [password, setPassword] = useState('');
  return <>
    <BaseModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <BaseModal.Title>Delete Account</BaseModal.Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(password);
            setPassword('');
          }}
          >
          <label>
            <p>Please type your password to confirm deletion</p>
            <input
              name="password"
              type="password"
              className="rw-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <BaseModal.Footer>
            <Button
              type="submit"
              fullWidth
              >
              Confirm Delete
            </Button>
          </BaseModal.Footer>
        </form>
    </BaseModal>
  </>
}


export default DeleteAccountModal