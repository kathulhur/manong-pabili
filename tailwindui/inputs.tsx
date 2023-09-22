// // input with label
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Email
//             </label>
//             <div className="mt-2">
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="you@example.com"
//                 />
//             </div>
//         </div>
//     )
// }

// //input with label and help text
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Email
//             </label>
//             <div className="mt-2">
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="you@example.com"
//                     aria-describedby="email-description"
//                 />
//             </div>
//             <p className="mt-2 text-sm text-gray-500" id="email-description">
//                 We'll only use this for spam.
//             </p>
//         </div>
//     )
// }

// // input with validation error
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Email
//             </label>
//             <div className="relative mt-2 rounded-md shadow-sm">
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
//                     placeholder="you@example.com"
//                     defaultValue="adamwathan"
//                     aria-invalid="true"
//                     aria-describedby="email-error"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                     <ExclamationCircleIcon
//                         className="h-5 w-5 text-red-500"
//                         aria-hidden="true"
//                     />
//                 </div>
//             </div>
//             <p className="mt-2 text-sm text-red-600" id="email-error">
//                 Not a valid email address.
//             </p>
//         </div>
//     )
// }

// // input with disabled state
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Email
//             </label>
//             <div className="mt-2">
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     defaultValue="you@example.com"
//                     disabled
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
//                     placeholder="you@example.com"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with hidden label
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label htmlFor="email" className="sr-only">
//                 Email
//             </label>
//             <input
//                 type="email"
//                 name="email"
//                 id="email"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="you@example.com"
//             />
//         </div>
//     )
// }

// // input with corner hint
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <div className="flex justify-between">
//                 <label
//                     htmlFor="email"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                     Email
//                 </label>
//                 <span
//                     className="text-sm leading-6 text-gray-500"
//                     id="email-optional"
//                 >
//                     Optional
//                 </span>
//             </div>
//             <div className="mt-2">
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="you@example.com"
//                     aria-describedby="email-optional"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with leading icon
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// import { EnvelopeIcon } from '@heroicons/react/20/solid'

// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Email
//             </label>
//             <div className="relative mt-2 rounded-md shadow-sm">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                     <EnvelopeIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                     />
//                 </div>
//                 <input
//                     type="email"
//                     name="email"
//                     id="email"
//                     className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="you@example.com"
//                 />
//             </div>
//         </div>
//     )
// }

// //input with trailing icon
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid'

// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="account-number"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Account number
//             </label>
//             <div className="relative mt-2 rounded-md shadow-sm">
//                 <input
//                     type="text"
//                     name="account-number"
//                     id="account-number"
//                     className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="000-00-0000"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                     <QuestionMarkCircleIcon
//                         className="h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// // input with add-on
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="company-website"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Company Website
//             </label>
//             <div className="mt-2 flex rounded-md shadow-sm">
//                 <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 px-3 text-gray-500 sm:text-sm">
//                     http://
//                 </span>
//                 <input
//                     type="text"
//                     name="company-website"
//                     id="company-website"
//                     className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="www.example.com"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with inline add-on
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="company-website"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Company Website
//             </label>
//             <div className="mt-2">
//                 <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
//                     <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
//                         http://
//                     </span>
//                     <input
//                         type="text"
//                         name="company-website"
//                         id="company-website"
//                         className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                         placeholder="www.example.com"
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }

// // input with inline leading and trailing add-ons
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="price"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Price
//             </label>
//             <div className="relative mt-2 rounded-md shadow-sm">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                     <span className="text-gray-500 sm:text-sm">$</span>
//                 </div>
//                 <input
//                     type="text"
//                     name="price"
//                     id="price"
//                     className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="0.00"
//                     aria-describedby="price-currency"
//                 />
//                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
//                     <span
//                         className="text-gray-500 sm:text-sm"
//                         id="price-currency"
//                     >
//                         USD
//                     </span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// // input with inline leading dropdown
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="phone-number"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Phone Number
//             </label>
//             <div className="relative mt-2 rounded-md shadow-sm">
//                 <div className="absolute inset-y-0 left-0 flex items-center">
//                     <label htmlFor="country" className="sr-only">
//                         Country
//                     </label>
//                     <select
//                         id="country"
//                         name="country"
//                         autoComplete="country"
//                         className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                     >
//                         <option>US</option>
//                         <option>CA</option>
//                         <option>EU</option>
//                     </select>
//                 </div>
//                 <input
//                     type="text"
//                     name="phone-number"
//                     id="phone-number"
//                     className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="+1 (555) 987-6543"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with inline leading add-on and trailing dropdown
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="price"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Price
//             </label>
//             <div className="relative mt-2 rounded-md shadow-sm">
//                 <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                     <span className="text-gray-500 sm:text-sm">$</span>
//                 </div>
//                 <input
//                     type="text"
//                     name="price"
//                     id="price"
//                     className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="0.00"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex items-center">
//                     <label htmlFor="currency" className="sr-only">
//                         Currency
//                     </label>
//                     <select
//                         id="currency"
//                         name="currency"
//                         className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
//                     >
//                         <option>USD</option>
//                         <option>CAD</option>
//                         <option>EUR</option>
//                     </select>
//                 </div>
//             </div>
//         </div>
//     )
// }

// // input with inline leading icon and trailing button
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid'

// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="email"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Search candidates
//             </label>
//             <div className="mt-2 flex rounded-md shadow-sm">
//                 <div className="relative flex flex-grow items-stretch focus-within:z-10">
//                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//                         <UsersIcon
//                             className="h-5 w-5 text-gray-400"
//                             aria-hidden="true"
//                         />
//                     </div>
//                     <input
//                         type="email"
//                         name="email"
//                         id="email"
//                         className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         placeholder="John Smith"
//                     />
//                 </div>
//                 <button
//                     type="button"
//                     className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
//                 >
//                     <BarsArrowUpIcon
//                         className="-ml-0.5 h-5 w-5 text-gray-400"
//                         aria-hidden="true"
//                     />
//                     Sort
//                 </button>
//             </div>
//         </div>
//     )
// }

// // inputs with shared borders
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <fieldset>
//                 <legend className="block text-sm font-medium leading-6 text-gray-900">
//                     Card Details
//                 </legend>
//                 <div className="mt-2 -space-y-px rounded-md bg-white shadow-sm">
//                     <div>
//                         <label htmlFor="card-number" className="sr-only">
//                             Card number
//                         </label>
//                         <input
//                             type="text"
//                             name="card-number"
//                             id="card-number"
//                             className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             placeholder="Card number"
//                         />
//                     </div>
//                     <div className="flex -space-x-px">
//                         <div className="w-1/2 min-w-0 flex-1">
//                             <label
//                                 htmlFor="card-expiration-date"
//                                 className="sr-only"
//                             >
//                                 Expiration date
//                             </label>
//                             <input
//                                 type="text"
//                                 name="card-expiration-date"
//                                 id="card-expiration-date"
//                                 className="relative block w-full rounded-none rounded-bl-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 placeholder="MM / YY"
//                             />
//                         </div>
//                         <div className="min-w-0 flex-1">
//                             <label htmlFor="card-cvc" className="sr-only">
//                                 CVC
//                             </label>
//                             <input
//                                 type="text"
//                                 name="card-cvc"
//                                 id="card-cvc"
//                                 className="relative block w-full rounded-none rounded-br-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                                 placeholder="CVC"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </fieldset>
//             <fieldset className="mt-6 bg-white">
//                 <legend className="block text-sm font-medium leading-6 text-gray-900">
//                     Billing address
//                 </legend>
//                 <div className="mt-2 -space-y-px rounded-md shadow-sm">
//                     <div>
//                         <label htmlFor="country" className="sr-only">
//                             Country
//                         </label>
//                         <select
//                             id="country"
//                             name="country"
//                             autoComplete="country-name"
//                             className="relative block w-full rounded-none rounded-t-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                         >
//                             <option>United States</option>
//                             <option>Canada</option>
//                             <option>Mexico</option>
//                         </select>
//                     </div>
//                     <div>
//                         <label htmlFor="postal-code" className="sr-only">
//                             ZIP / Postal code
//                         </label>
//                         <input
//                             type="text"
//                             name="postal-code"
//                             id="postal-code"
//                             autoComplete="postal-code"
//                             className="relative block w-full rounded-none rounded-b-md border-0 bg-transparent py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                             placeholder="ZIP / Postal code"
//                         />
//                     </div>
//                 </div>
//             </fieldset>
//         </div>
//     )
// }

// // input with inset label
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
//             <label
//                 htmlFor="name"
//                 className="block text-xs font-medium text-gray-900"
//             >
//                 Name
//             </label>
//             <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                 placeholder="Jane Smith"
//             />
//         </div>
//     )
// }

// // inputs with inset labels and shared borders
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div className="isolate -space-y-px rounded-md shadow-sm">
//             <div className="relative rounded-md rounded-b-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
//                 <label
//                     htmlFor="name"
//                     className="block text-xs font-medium text-gray-900"
//                 >
//                     Name
//                 </label>
//                 <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Jane Smith"
//                 />
//             </div>
//             <div className="relative rounded-md rounded-t-none px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600">
//                 <label
//                     htmlFor="job-title"
//                     className="block text-xs font-medium text-gray-900"
//                 >
//                     Job Title
//                 </label>
//                 <input
//                     type="text"
//                     name="job-title"
//                     id="job-title"
//                     className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Head of Tomfoolery"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with overlapping label
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div className="relative">
//             <label
//                 htmlFor="name"
//                 className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
//             >
//                 Name
//             </label>
//             <input
//                 type="text"
//                 name="name"
//                 id="name"
//                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 placeholder="Jane Smith"
//             />
//         </div>
//     )
// }

// // input with pill shape
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="name"
//                 className="ml-px block pl-4 text-sm font-medium leading-6 text-gray-900"
//             >
//                 Name
//             </label>
//             <div className="mt-2">
//                 <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     className="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                     placeholder="Jane Smith"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with gray background and bottom border
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="name"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Name
//             </label>
//             <div className="relative mt-2">
//                 <input
//                     type="text"
//                     name="name"
//                     id="name"
//                     className="peer block w-full border-0 bg-gray-50 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
//                     placeholder="Jane Smith"
//                 />
//                 <div
//                     className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-indigo-600"
//                     aria-hidden="true"
//                 />
//             </div>
//         </div>
//     )
// }

// // input with keyboard shortcut
// /*
//   This example requires some changes to your config:

//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/forms'),
//     ],
//   }
//   ```
// */
// export default function Example() {
//     return (
//         <div>
//             <label
//                 htmlFor="search"
//                 className="block text-sm font-medium leading-6 text-gray-900"
//             >
//                 Quick search
//             </label>
//             <div className="relative mt-2 flex items-center">
//                 <input
//                     type="text"
//                     name="search"
//                     id="search"
//                     className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//                 <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
//                     <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
//                         ⌘K
//                     </kbd>
//                 </div>
//             </div>
//         </div>
//     )
// }
