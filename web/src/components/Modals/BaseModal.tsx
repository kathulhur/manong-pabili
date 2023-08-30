import { Dialog, Transition } from "@headlessui/react"
import { Fragment, ReactNode } from "react"

const BaseModal = ({
  isOpen,
  onClose,
  children,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}) => {
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
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow transition-all">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

BaseModal.Title = ({ children }: { children: string; }) => {
  return (
    <Dialog.Title
      as="h3"
      className="mb-4 text-2xl font-bold text-slate-900"
    >{children}</Dialog.Title>
  )
}

BaseModal.Footer = ({ children }: { children: ReactNode; }) => {
  return <div className="flex flex-col space-y-2 mt-8">{children}</div>
}

export default BaseModal;