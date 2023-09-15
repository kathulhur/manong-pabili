import { useRef } from 'react'
import { useEffect } from 'react'

import {
    Form,
    Label,
    TextField,
    PasswordField,
    FieldError,
    Submit,
    RadioField,
    EmailField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

const SignupPage = () => {
    const { isAuthenticated, signUp } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.vendorIndex())
        }
    }, [isAuthenticated])

    // focus on username box on page load
    const nameRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        nameRef.current?.focus()
    }, [])

    const onSubmit = async (data: Record<string, string>) => {
        try {
            const response = await signUp({
                name: data.name,
                email: data.email,
                mobileNumber: data.mobileNumber,
                roles: 'VENDOR',
                gender: data.gender,
                username: data.username,
                password: data.password,
            })
            if (response.message) {
                toast(response.message)
            } else if (response.error) {
                toast.error(response.error)
            } else {
                // user is signed in automatically
                toast.success('Welcome!')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <MetaTags title="Signup" />
            <main className="rw-main">
                <Toaster
                    toastOptions={{ className: 'rw-toast', duration: 6000 }}
                />
                <div className="rw-scaffold rw-login-container">
                    <div className="mt-12 p-4">
                        <header>
                            <h1 className="mb-4 font-bold text-xl text-green-700 text-center">
                                Manong Pabili
                            </h1>
                            <h2 className="font-semibold">Sign up</h2>
                        </header>

                        <div>
                            <div className="rw-form-wrapper">
                                <Form
                                    onSubmit={onSubmit}
                                    className="rw-form-wrapper"
                                >
                                    <div>
                                        <Label
                                            name="name"
                                            className="rw-label"
                                            errorClassName="rw-label rw-label-error"
                                        >
                                            Name
                                        </Label>
                                        <TextField
                                            name="name"
                                            className="rw-input"
                                            errorClassName="rw-input rw-input-error"
                                            ref={nameRef}
                                            validation={{
                                                required: {
                                                    value: true,
                                                    message: 'name is required',
                                                },
                                            }}
                                        />
                                        <FieldError
                                            name="name"
                                            className="rw-field-error"
                                        />

                                        {/* Email */}
                                        <Label
                                            name="email"
                                            className="rw-label"
                                            errorClassName="rw-label rw-label-error"
                                        >
                                            Email
                                        </Label>
                                        <EmailField
                                            name="email"
                                            className="rw-input"
                                            errorClassName="rw-input rw-input-error"
                                            ref={nameRef}
                                            validation={{
                                                required: {
                                                    value: true,
                                                    message:
                                                        'email is required',
                                                },
                                            }}
                                        />
                                        <FieldError
                                            name="email"
                                            className="rw-field-error"
                                        />

                                        {/* Gender */}
                                        <fieldset className="mt-4">
                                            <legend className="rw-label">
                                                Gender
                                            </legend>
                                            <div className="flex items-center">
                                                <RadioField
                                                    required
                                                    id="male"
                                                    name="gender"
                                                    className="rw-input"
                                                    errorClassName="rw-input rw-input-error"
                                                    value="Male"
                                                />
                                                <Label
                                                    name="Male"
                                                    htmlFor="male"
                                                    className="rw-label mt-0"
                                                    errorClassName="rw-label rw-label-error"
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <RadioField
                                                    required
                                                    id="female"
                                                    value="Female"
                                                    name="gender"
                                                    className="rw-input"
                                                    errorClassName="rw-input rw-input-error"
                                                />
                                                <Label
                                                    name="Female"
                                                    htmlFor="female"
                                                    className="rw-label mt-0"
                                                    errorClassName="rw-label rw-label-error"
                                                />
                                            </div>
                                        </fieldset>
                                    </div>

                                    {/* Contact Number */}
                                    <Label
                                        name="Contact Number"
                                        className="rw-label"
                                        errorClassName="rw-label rw-label-error"
                                    />
                                    <TextField
                                        name="mobileNumber"
                                        className="rw-input"
                                        errorClassName="rw-input rw-input-error"
                                        ref={nameRef}
                                        validation={{
                                            required: {
                                                value: true,
                                                message:
                                                    'Mobile Number is required',
                                            },
                                        }}
                                    />
                                    <FieldError
                                        name="mobileNumber"
                                        className="rw-field-error"
                                    />

                                    <Label
                                        name="Username"
                                        htmlFor="username"
                                        className="rw-label"
                                        errorClassName="rw-label rw-label-error"
                                    />
                                    <TextField
                                        name="username"
                                        className="rw-input"
                                        errorClassName="rw-input rw-input-error"
                                        validation={{
                                            required: {
                                                value: true,
                                                message: 'Username is required',
                                            },
                                        }}
                                    />
                                    <FieldError
                                        name="username"
                                        className="rw-field-error"
                                    />

                                    <Label
                                        name="password"
                                        className="rw-label"
                                        errorClassName="rw-label rw-label-error"
                                    >
                                        Password
                                    </Label>
                                    <PasswordField
                                        name="password"
                                        className="rw-input"
                                        errorClassName="rw-input rw-input-error"
                                        autoComplete="current-password"
                                        validation={{
                                            required: {
                                                value: true,
                                                message: 'Password is required',
                                            },
                                        }}
                                    />
                                    <FieldError
                                        name="password"
                                        className="rw-field-error"
                                    />

                                    <div className="rw-button-group">
                                        <Button type="submit" fullWidth>
                                            Sign Up
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="rw-login-link">
                            <span>Already have an account?</span>{' '}
                            <Link to={routes.authLogin()} className="rw-link">
                                Log in!
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignupPage
