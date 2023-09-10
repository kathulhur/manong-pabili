import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button/Button";


const UpdateEmailModal = ({
  defaultValue,
  isOpen,
  onClose,
  onSubmit
}: {
  defaultValue: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: String) => void;
}) => {

  const [email, setEmail] = useState(defaultValue);

  return <>
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <BaseModal.Title>Update Email</BaseModal.Title>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(email);
            setEmail('');
          }}
          >
          <label>
            New email
            <input
              name="Email"
              type="email"
              className="rw-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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


export default UpdateEmailModal