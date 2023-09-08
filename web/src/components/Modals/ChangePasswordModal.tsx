import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button/Button";

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (oldPassword: string, newPassword: string) => void;
}) => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
      <BaseModal
        isOpen={isOpen}
        onClose={onClose}
      >
        <BaseModal.Title>Change Password</BaseModal.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(oldPassword, newPassword);
              setNewPassword('');
              setConfirmNewPassword('');
            }}
            >
              <label>
                Old Password
              <input
                name="password"
                type="text"
                className="rw-input mb-4"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label>
              New password
              <input
                name="password"
                type="text"
                className="rw-input mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              <p>Confirm Password</p>
              <input
                name="confirmPassword"
                type="text"
                className="rw-input"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
  )

}


export default ChangePasswordModal