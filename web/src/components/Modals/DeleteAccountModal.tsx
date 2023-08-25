import { Dialog } from "@headlessui/react";
import { useState } from "react";




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
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <Dialog.Panel>
        <Dialog.Title>Delete Account</Dialog.Title>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            >
            Confirm Delete
          </button>
        </form>
      </Dialog.Panel>
    </Dialog>
  </>
}


export default DeleteAccountModal