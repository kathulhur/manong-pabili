import { Dialog } from "@headlessui/react";
import { Link } from "@redwoodjs/router";
import { useState } from "react";
import { useAuth } from "src/auth";




const VendorProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {

  const { currentUser, logOut } = useAuth();

  return <>
    <Dialog
      open={isOpen}
      onClose={onClose}
    >
      <Dialog.Panel>
        <Dialog.Title>Vendor Profile</Dialog.Title>
        <div>
          <h2>Username</h2>
          <p>{currentUser?.username}</p>
        </div>
        <div>
          <h2>Fullname</h2>
          <p>{currentUser?.name}</p>
        </div>
        <div>
          <h2>Mobile Number</h2>
          <p>{currentUser?.mobileNumber}</p>
        </div>
        <div className="flex flex-col">
          <Link
            to="/vendor/account"
            >
            Update Profile &gt;
          </Link>
          <button
            type="button"
            onClick={logOut}
          >
            Log Out
          </button>
        </div>
      </Dialog.Panel>

    </Dialog>
  </>
}


export default VendorProfileModal