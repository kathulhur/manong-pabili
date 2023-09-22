// // centered with single action
// import { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/24/outline'

// export default function Example() {
//     const [open, setOpen] = useState(true)

//     return (
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog as="div" className="relative z-10" onClose={setOpen}>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
//                                 <div>
//                                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
//                                         <CheckIcon
//                                             className="h-6 w-6 text-green-600"
//                                             aria-hidden="true"
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center sm:mt-5">
//                                         <Dialog.Title
//                                             as="h3"
//                                             className="text-base font-semibold leading-6 text-gray-900"
//                                         >
//                                             Payment successful
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">
//                                                 Lorem ipsum dolor sit amet
//                                                 consectetur adipisicing elit.
//                                                 Consequatur amet labore.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-5 sm:mt-6">
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Go back to dashboard
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// }

// //centered with wide buttons
// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { CheckIcon } from '@heroicons/react/24/outline'

// export default function Example() {
//     const [open, setOpen] = useState(true)

//     const cancelButtonRef = useRef(null)

//     return (
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog
//                 as="div"
//                 className="relative z-10"
//                 initialFocus={cancelButtonRef}
//                 onClose={setOpen}
//             >
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                                 <div>
//                                     <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
//                                         <CheckIcon
//                                             className="h-6 w-6 text-green-600"
//                                             aria-hidden="true"
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center sm:mt-5">
//                                         <Dialog.Title
//                                             as="h3"
//                                             className="text-base font-semibold leading-6 text-gray-900"
//                                         >
//                                             Payment successful
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">
//                                                 Lorem ipsum, dolor sit amet
//                                                 consectetur adipisicing elit.
//                                                 Eius aliquam laudantium
//                                                 explicabo pariatur iste dolorem
//                                                 animi vitae error totam. At
//                                                 sapiente aliquam accusamus
//                                                 facere veritatis.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
//                                         onClick={() => setOpen(false)}
//                                         ref={cancelButtonRef}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// }

// // simple alert
// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// export default function Example() {
//     const [open, setOpen] = useState(true)

//     const cancelButtonRef = useRef(null)

//     return (
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog
//                 as="div"
//                 className="relative z-10"
//                 initialFocus={cancelButtonRef}
//                 onClose={setOpen}
//             >
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                                         <ExclamationTriangleIcon
//                                             className="h-6 w-6 text-red-600"
//                                             aria-hidden="true"
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                         <Dialog.Title
//                                             as="h3"
//                                             className="text-base font-semibold leading-6 text-gray-900"
//                                         >
//                                             Deactivate account
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">
//                                                 Are you sure you want to
//                                                 deactivate your account? All of
//                                                 your data will be permanently
//                                                 removed from our servers
//                                                 forever. This action cannot be
//                                                 undone.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                         ref={cancelButtonRef}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// }

// // simple with dismiss button
// import { Fragment, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

// export default function Example() {
//     const [open, setOpen] = useState(true)

//     return (
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog as="div" className="relative z-10" onClose={setOpen}>
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                                 <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
//                                     <button
//                                         type="button"
//                                         className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         <span className="sr-only">Close</span>
//                                         <XMarkIcon
//                                             className="h-6 w-6"
//                                             aria-hidden="true"
//                                         />
//                                     </button>
//                                 </div>
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                                         <ExclamationTriangleIcon
//                                             className="h-6 w-6 text-red-600"
//                                             aria-hidden="true"
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                         <Dialog.Title
//                                             as="h3"
//                                             className="text-base font-semibold leading-6 text-gray-900"
//                                         >
//                                             Deactivate account
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">
//                                                 Are you sure you want to
//                                                 deactivate your account? All of
//                                                 your data will be permanently
//                                                 removed from our servers
//                                                 forever. This action cannot be
//                                                 undone.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// }

// // simple with gray footer
// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// export default function Example() {
//     const [open, setOpen] = useState(true)

//     const cancelButtonRef = useRef(null)

//     return (
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog
//                 as="div"
//                 className="relative z-10"
//                 initialFocus={cancelButtonRef}
//                 onClose={setOpen}
//             >
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                                 <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                                     <div className="sm:flex sm:items-start">
//                                         <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                                             <ExclamationTriangleIcon
//                                                 className="h-6 w-6 text-red-600"
//                                                 aria-hidden="true"
//                                             />
//                                         </div>
//                                         <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                             <Dialog.Title
//                                                 as="h3"
//                                                 className="text-base font-semibold leading-6 text-gray-900"
//                                             >
//                                                 Deactivate account
//                                             </Dialog.Title>
//                                             <div className="mt-2">
//                                                 <p className="text-sm text-gray-500">
//                                                     Are you sure you want to
//                                                     deactivate your account? All
//                                                     of your data will be
//                                                     permanently removed. This
//                                                     action cannot be undone.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                         ref={cancelButtonRef}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// }

// // simple alert with left-aligned buttons

// import { Fragment, useRef, useState } from 'react'
// import { Dialog, Transition } from '@headlessui/react'
// import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

// export default function Example() {
//     const [open, setOpen] = useState(true)

//     const cancelButtonRef = useRef(null)

//     return (
//         <Transition.Root show={open} as={Fragment}>
//             <Dialog
//                 as="div"
//                 className="relative z-10"
//                 initialFocus={cancelButtonRef}
//                 onClose={setOpen}
//             >
//                 <Transition.Child
//                     as={Fragment}
//                     enter="ease-out duration-300"
//                     enterFrom="opacity-0"
//                     enterTo="opacity-100"
//                     leave="ease-in duration-200"
//                     leaveFrom="opacity-100"
//                     leaveTo="opacity-0"
//                 >
//                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                 </Transition.Child>

//                 <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                     <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                             enterTo="opacity-100 translate-y-0 sm:scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                         >
//                             <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
//                                 <div className="sm:flex sm:items-start">
//                                     <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                                         <ExclamationTriangleIcon
//                                             className="h-6 w-6 text-red-600"
//                                             aria-hidden="true"
//                                         />
//                                     </div>
//                                     <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                                         <Dialog.Title
//                                             as="h3"
//                                             className="text-base font-semibold leading-6 text-gray-900"
//                                         >
//                                             Deactivate account
//                                         </Dialog.Title>
//                                         <div className="mt-2">
//                                             <p className="text-sm text-gray-500">
//                                                 Are you sure you want to
//                                                 deactivate your account? All of
//                                                 your data will be permanently
//                                                 removed from our servers
//                                                 forever. This action cannot be
//                                                 undone.
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
//                                     <button
//                                         type="button"
//                                         className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                     >
//                                         Deactivate
//                                     </button>
//                                     <button
//                                         type="button"
//                                         className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
//                                         onClick={() => setOpen(false)}
//                                         ref={cancelButtonRef}
//                                     >
//                                         Cancel
//                                     </button>
//                                 </div>
//                             </Dialog.Panel>
//                         </Transition.Child>
//                     </div>
//                 </div>
//             </Dialog>
//         </Transition.Root>
//     )
// }
