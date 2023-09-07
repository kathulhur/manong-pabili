import { Dialog, Transition } from "@headlessui/react";
import { Link, navigate, routes } from "@redwoodjs/router";
import { useAuth } from "src/auth";
import Button from "../Button/Button";
import { Fragment } from "react";
import BaseModal from "./BaseModal";
import useLogout from "src/hooks/useLogout";

const VendorProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { currentUser } = useAuth();
  const logOut = useLogout();



  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <BaseModal.Title>My Profile</BaseModal.Title>

      {
        [
          {
            title: 'Username',
            value: currentUser?.username,
          },
          {
            title: 'Full name',
            value: currentUser?.name,
          },
          {
            title: 'Mobile number',
            value: currentUser?.mobileNumber,
          },
        ].map(({ title, value }) => {
          return (
            <div key={value} className="mb-4">
              <h2 className="text-sm text-slate-700">{title}</h2>
              <p className="font-semibold text-slate-900">{value || '-'}</p>
            </div>
          )
        })
      }

      <BaseModal.Footer>
        <Link to="/vendor/account">
          <Button fullWidth>Update profile</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={logOut}
        >
          Log out
        </Button>
      </BaseModal.Footer>
    </BaseModal>
  )
}


export default VendorProfileModal