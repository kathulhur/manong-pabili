import { Dialog } from "@headlessui/react";
import { set } from "@redwoodjs/forms";
import { useState } from "react";


const UpdateMobileNumberModal = ({
  defaultValue,
  isOpen,
  onClose,
  onSubmit
}: {
  defaultValue: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mobileNumber: String) => void;
}) => {

  const [mobileNumber, setMobileNumber] = useState(defaultValue);

  return <>
  <Dialog
      open={isOpen}
      onClose={onClose}
      >
      <Dialog.Panel>
        <Dialog.Title>Update Mobile Number</Dialog.Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(mobileNumber);
            setMobileNumber('');
          }}
          >
          <label>
            New Mobile Number
            <input
              name="mobileNumber"
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