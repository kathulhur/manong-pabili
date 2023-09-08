import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button/Button";


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
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <BaseModal.Title>Update Username</BaseModal.Title>
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
              className="rw-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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


export default UpdateUsernameModal