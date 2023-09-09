import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button/Button";


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
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <BaseModal.Title>Update Mobile Number</BaseModal.Title>
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
              className="rw-input"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              />
          </label>
          <BaseModal.Footer>
            <Button
              type="submit"
              fullWidth
              >
              Update
            </Button>
          </BaseModal.Footer>
        </form>
    </BaseModal>
  </>
}


export default UpdateMobileNumberModal