// // with inline links and actions menu
// import { Fragment } from 'react'
// import { Menu, Transition } from '@headlessui/react'
// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

// const people = [
//     {
//         name: 'Leslie Alexander',
//         email: 'leslie.alexander@example.com',
//         role: 'Co-Founder / CEO',
//         imageUrl:
//             'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         href: '#',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Michael Foster',
//         email: 'michael.foster@example.com',
//         role: 'Co-Founder / CTO',
//         imageUrl:
//             'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         href: '#',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Dries Vincent',
//         email: 'dries.vincent@example.com',
//         role: 'Business Relations',
//         imageUrl:
//             'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         href: '#',
//         lastSeen: null,
//     },
//     {
//         name: 'Lindsay Walton',
//         email: 'lindsay.walton@example.com',
//         role: 'Front-end Developer',
//         imageUrl:
//             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         href: '#',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Courtney Henry',
//         email: 'courtney.henry@example.com',
//         role: 'Designer',
//         imageUrl:
//             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         href: '#',
//         lastSeen: '3h ago',
//         lastSeenDateTime: '2023-01-23T13:23Z',
//     },
//     {
//         name: 'Tom Cook',
//         email: 'tom.cook@example.com',
//         role: 'Director of Product',
//         imageUrl:
//             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
//         href: '#',
//         lastSeen: null,
//     },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//     return (
//         <ul role="list" className="divide-y divide-gray-100">
//             {people.map((person) => (
//                 <li
//                     key={person.email}
//                     className="flex justify-between gap-x-6 py-5"
//                 >
//                     <div className="flex min-w-0 gap-x-4">
//                         <img
//                             className="h-12 w-12 flex-none rounded-full bg-gray-50"
//                             src={person.imageUrl}
//                             alt=""
//                         />
//                         <div className="min-w-0 flex-auto">
//                             <p className="text-sm font-semibold leading-6 text-gray-900">
//                                 <a
//                                     href={person.href}
//                                     className="hover:underline"
//                                 >
//                                     {person.name}
//                                 </a>
//                             </p>
//                             <p className="mt-1 flex text-xs leading-5 text-gray-500">
//                                 <a
//                                     href={`mailto:${person.email}`}
//                                     className="truncate hover:underline"
//                                 >
//                                     {person.email}
//                                 </a>
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex shrink-0 items-center gap-x-6">
//                         <div className="hidden sm:flex sm:flex-col sm:items-end">
//                             <p className="text-sm leading-6 text-gray-900">
//                                 {person.role}
//                             </p>
//                             {person.lastSeen ? (
//                                 <p className="mt-1 text-xs leading-5 text-gray-500">
//                                     Last seen{' '}
//                                     <time dateTime={person.lastSeenDateTime}>
//                                         {person.lastSeen}
//                                     </time>
//                                 </p>
//                             ) : (
//                                 <div className="mt-1 flex items-center gap-x-1.5">
//                                     <div className="flex-none rounded-full bg-emerald-500/20 p-1">
//                                         <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
//                                     </div>
//                                     <p className="text-xs leading-5 text-gray-500">
//                                         Online
//                                     </p>
//                                 </div>
//                             )}
//                         </div>
//                         <Menu as="div" className="relative flex-none">
//                             <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
//                                 <span className="sr-only">Open options</span>
//                                 <EllipsisVerticalIcon
//                                     className="h-5 w-5"
//                                     aria-hidden="true"
//                                 />
//                             </Menu.Button>
//                             <Transition
//                                 as={Fragment}
//                                 enter="transition ease-out duration-100"
//                                 enterFrom="transform opacity-0 scale-95"
//                                 enterTo="transform opacity-100 scale-100"
//                                 leave="transition ease-in duration-75"
//                                 leaveFrom="transform opacity-100 scale-100"
//                                 leaveTo="transform opacity-0 scale-95"
//                             >
//                                 <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <a
//                                                 href="#"
//                                                 className={classNames(
//                                                     active ? 'bg-gray-50' : '',
//                                                     'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                                 )}
//                                             >
//                                                 View profile
//                                                 <span className="sr-only">
//                                                     , {person.name}
//                                                 </span>
//                                             </a>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <a
//                                                 href="#"
//                                                 className={classNames(
//                                                     active ? 'bg-gray-50' : '',
//                                                     'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                                 )}
//                                             >
//                                                 Message
//                                                 <span className="sr-only">
//                                                     , {person.name}
//                                                 </span>
//                                             </a>
//                                         )}
//                                     </Menu.Item>
//                                 </Menu.Items>
//                             </Transition>
//                         </Menu>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     )
// }

// // with badges, button, and actions menu
// import { Fragment } from 'react'
// import { Menu, Transition } from '@headlessui/react'
// import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'

// const statuses = {
//     Complete: 'text-green-700 bg-green-50 ring-green-600/20',
//     'In progress': 'text-gray-600 bg-gray-50 ring-gray-500/10',
//     Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
// }
// const projects = [
//     {
//         id: 1,
//         name: 'GraphQL API',
//         href: '#',
//         status: 'Complete',
//         createdBy: 'Leslie Alexander',
//         dueDate: 'March 17, 2023',
//         dueDateTime: '2023-03-17T00:00Z',
//     },
//     {
//         id: 2,
//         name: 'New benefits plan',
//         href: '#',
//         status: 'In progress',
//         createdBy: 'Leslie Alexander',
//         dueDate: 'May 5, 2023',
//         dueDateTime: '2023-05-05T00:00Z',
//     },
//     {
//         id: 3,
//         name: 'Onboarding emails',
//         href: '#',
//         status: 'In progress',
//         createdBy: 'Courtney Henry',
//         dueDate: 'May 25, 2023',
//         dueDateTime: '2023-05-25T00:00Z',
//     },
//     {
//         id: 4,
//         name: 'iOS app',
//         href: '#',
//         status: 'In progress',
//         createdBy: 'Leonard Krasner',
//         dueDate: 'June 7, 2023',
//         dueDateTime: '2023-06-07T00:00Z',
//     },
//     {
//         id: 5,
//         name: 'Marketing site redesign',
//         href: '#',
//         status: 'Archived',
//         createdBy: 'Courtney Henry',
//         dueDate: 'June 10, 2023',
//         dueDateTime: '2023-06-10T00:00Z',
//     },
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Example() {
//     return (
//         <ul role="list" className="divide-y divide-gray-100">
//             {projects.map((project) => (
//                 <li
//                     key={project.id}
//                     className="flex items-center justify-between gap-x-6 py-5"
//                 >
//                     <div className="min-w-0">
//                         <div className="flex items-start gap-x-3">
//                             <p className="text-sm font-semibold leading-6 text-gray-900">
//                                 {project.name}
//                             </p>
//                             <p
//                                 className={classNames(
//                                     statuses[project.status],
//                                     'rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
//                                 )}
//                             >
//                                 {project.status}
//                             </p>
//                         </div>
//                         <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
//                             <p className="whitespace-nowrap">
//                                 Due on{' '}
//                                 <time dateTime={project.dueDateTime}>
//                                     {project.dueDate}
//                                 </time>
//                             </p>
//                             <svg
//                                 viewBox="0 0 2 2"
//                                 className="h-0.5 w-0.5 fill-current"
//                             >
//                                 <circle cx={1} cy={1} r={1} />
//                             </svg>
//                             <p className="truncate">
//                                 Created by {project.createdBy}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="flex flex-none items-center gap-x-4">
//                         <a
//                             href={project.href}
//                             className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
//                         >
//                             View project
//                             <span className="sr-only">, {project.name}</span>
//                         </a>
//                         <Menu as="div" className="relative flex-none">
//                             <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
//                                 <span className="sr-only">Open options</span>
//                                 <EllipsisVerticalIcon
//                                     className="h-5 w-5"
//                                     aria-hidden="true"
//                                 />
//                             </Menu.Button>
//                             <Transition
//                                 as={Fragment}
//                                 enter="transition ease-out duration-100"
//                                 enterFrom="transform opacity-0 scale-95"
//                                 enterTo="transform opacity-100 scale-100"
//                                 leave="transition ease-in duration-75"
//                                 leaveFrom="transform opacity-100 scale-100"
//                                 leaveTo="transform opacity-0 scale-95"
//                             >
//                                 <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <a
//                                                 href="#"
//                                                 className={classNames(
//                                                     active ? 'bg-gray-50' : '',
//                                                     'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                                 )}
//                                             >
//                                                 Edit
//                                                 <span className="sr-only">
//                                                     , {project.name}
//                                                 </span>
//                                             </a>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <a
//                                                 href="#"
//                                                 className={classNames(
//                                                     active ? 'bg-gray-50' : '',
//                                                     'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                                 )}
//                                             >
//                                                 Move
//                                                 <span className="sr-only">
//                                                     , {project.name}
//                                                 </span>
//                                             </a>
//                                         )}
//                                     </Menu.Item>
//                                     <Menu.Item>
//                                         {({ active }) => (
//                                             <a
//                                                 href="#"
//                                                 className={classNames(
//                                                     active ? 'bg-gray-50' : '',
//                                                     'block px-3 py-1 text-sm leading-6 text-gray-900'
//                                                 )}
//                                             >
//                                                 Delete
//                                                 <span className="sr-only">
//                                                     , {project.name}
//                                                 </span>
//                                             </a>
//                                         )}
//                                     </Menu.Item>
//                                 </Menu.Items>
//                             </Transition>
//                         </Menu>
//                     </div>
//                 </li>
//             ))}
//         </ul>
//     )
// }
