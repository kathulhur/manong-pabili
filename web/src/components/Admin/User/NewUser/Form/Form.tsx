import { EnvelopeIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { CustomCreateUserInput } from 'types/graphql'

export interface FormProps {
    onSubmit: (input: CustomCreateUserInput) => void
    onCancel: () => void
}

const Form = ({ onSubmit, onCancel }: FormProps) => {
    const [roles, setRoles] = useState<string>('ADMIN')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({
            roles,
            name,
            email,
            mobileNumber,
            username,
            password,
        })
        onSubmit({
            roles,
            gender,
            name,
            email,
            mobileNumber,
            username,
            password,
        })
    }
    return (
        <div className="m-2 border-b border-gray-900/10 pb-12 px-4 py-6 md:p-8">
            <form
                onSubmit={submitHandler}
                className="px-4 grid grid-cols-3 gap-y-12"
            >
                <div className="col-span-3 md:col-span-1 flex justify-between items-center md:block">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                        New User
                    </h2>
                    <div className="flex items-center md:block mt-4">
                        {/* Role */}
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium leading-6 text-gray-900 mr-2 md:mr-0"
                        >
                            Role
                        </label>
                        <div className="max-w-fit mt-2">
                            <select
                                id="role"
                                name="role"
                                autoComplete="role-name"
                                value={roles}
                                onChange={(e) => setRoles(e.target.value)}
                                className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value={'ADMIN'}>Admin</option>
                                <option value={'VENDOR'}>Vendor</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 bg-white md:p-8 md:shadow-sm md:ring-1 md:ring-gray-900/5 md:rounded-xl md:col-span-2 ">
                    <div className="gap-y-8 grid divide-y-2">
                        <div className="grid gap-y-4">
                            <h2 className="mb-4 text-sm font-semibold leading-7 text-gray-700">
                                Personal Information
                            </h2>
                            <div className="grid gap-y-4 md:grid md:grid-cols-3 md:gap-x-4">
                                <div className="max-w-sm md:col-span-2">
                                    <label
                                        htmlFor="full-name"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Full name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="full-name"
                                            id="full-name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            autoComplete="full-name"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="max-w-fit md:col-span-1">
                                    {/* Gender */}
                                    <label
                                        htmlFor="gender"
                                        className="block text-sm font-medium leading-6 text-gray-900 mr-2 md:mr-0"
                                    >
                                        Gender
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="gender"
                                            name="gender"
                                            autoComplete="gender"
                                            className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            value={gender}
                                            onChange={(e) =>
                                                setGender(e.target.value)
                                            }
                                        >
                                            <option value={'Female'}>
                                                Male
                                            </option>
                                            <option value={'Male'}>
                                                Female
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* email */}
                            <div className="max-w-sm">
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Email
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EnvelopeIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            {/* mobile number */}
                            <div className="max-w-sm">
                                <label
                                    htmlFor="mobile-number"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Mobile Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="mobile-number"
                                        id="mobile-number"
                                        autoComplete="mobile-number"
                                        className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={mobileNumber}
                                        onChange={(e) =>
                                            setMobileNumber(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid gap-y-4">
                            <h2 className="my-4 col-span-2 text-sm font-semibold leading-7 text-gray-700">
                                Login Credentials
                            </h2>
                            <div className="grid gap-y-4">
                                <div className="max-w-sm">
                                    <label
                                        htmlFor="usernameusername"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="username"
                                            name="username"
                                            id="username"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="max-w-sm">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete="password"
                                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form
