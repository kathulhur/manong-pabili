import { Dialog } from "@headlessui/react";
import { useState } from "react";




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
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </label>
          <label>
            New password
            <input
              name="password"
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>
          <label>
            <p>Confirm Password</p>
            <input
              name="confirmPassword"
              type="text"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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


export default ChangePasswordModal