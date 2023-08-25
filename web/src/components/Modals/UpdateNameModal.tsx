import { Dialog } from "@headlessui/react";
import { useState } from "react";


const UpdateNameModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: String) => void;
}) => {

  const [name, setName] = useState('');

  return <>
  <Dialog
      open={isOpen}
      onClose={onClose}
      >
      <Dialog.Panel>
        <Dialog.Title>Update Username</Dialog.Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(name);
            setName('');
          }}
          >
          <label>
            New Username
            <input
              name="username"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              />
          </label>
          <button
            type="submit"
            >
            Update
          </button>
        </form>
      </Dialog.Panel>

    </Dialog>
  </>
}


export default UpdateNameModal