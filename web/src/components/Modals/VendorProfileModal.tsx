import { Dialog, Transition } from "@headlessui/react";
import { Link } from "@redwoodjs/router";
import { useAuth } from "src/auth";
import Button from "../Button/Button";
import { Fragment } from "react";

const VendorProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { currentUser, logOut } = useAuth();

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        className="relative z-20"
        open={isOpen}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow transition-all">
                <Dialog.Title
                  as="h3"
                  className="mb-4 text-xl font-semibold text-slate-900"
                >My Profile</Dialog.Title>

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
                      <div className="mb-4">
                        <h2 className="text-slate-800">{title}</h2>
                        <p className="font-semibold text-slate-900 text-lg">{value || '-'}</p>
                      </div>
                    )
                  })
                }
                <div className="flex flex-col space-y-2 mt-8">
                  <Link
                    to="/vendor/account"
                  >
                    <Button fullWidth>Update profile</Button>
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={logOut}
                    fullWidth
                  >
                    Log out
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


export default VendorProfileModal