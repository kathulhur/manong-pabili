import { Dialog } from "@headlessui/react";
import { set } from "@redwoodjs/forms";
import { useState } from "react";


const UpdateMobileNumberModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: String) => void;
}) => {

  const [mobileNumber, setMobileNumber] = useState('');

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
            onSubmit(mobileNumber);
            setMobileNumber('');
          }}
          >
          <label>
            New Username
            <input
              name="username"
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
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


export default UpdateMobileNumberModal