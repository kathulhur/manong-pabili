import { useState } from "react";
import BaseModal from "./BaseModal";
import Button from "../Button/Button";
import { toast } from "@redwoodjs/web/dist/toast";

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
              if(newPassword !== confirmNewPassword) {
                toast.error("New password do not match");
                return;
              }
              onSubmit(oldPassword, newPassword);
              setOldPassword('');
              setNewPassword('');
              setConfirmNewPassword('');
            }}
            >
              <label>
                Old Password
              <input
                name="password"
                type="password"
                className="rw-input mb-4"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
            <label>
              New password
              <input
                name="password"
                type="password"
                className="rw-input mb-4"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <label>
              <p>Confirm Password</p>
              <input
                name="confirmPassword"
                type="password"
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