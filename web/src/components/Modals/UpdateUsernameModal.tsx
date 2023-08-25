import { Dialog } from "@headlessui/react";
import { set } from "@redwoodjs/forms";
import { useState } from "react";


const UpdateUsernameModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: String) => void;
}) => {

  const [username, setUsername] = useState('');

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
            onSubmit(username);
            setUsername('');
          }}
          >
          <label>
            New Username
            <input
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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


export default UpdateUsernameModal