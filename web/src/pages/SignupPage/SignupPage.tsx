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
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
    const { isAuthenticated, signUp } = useAuth()

    useEffect(() => {
        if (isAuthenticated) {
            navigate(routes.home())
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
                mobileNumber: data.mobileNumber,
                role: "VENDOR",
                gender: data.gender,
                username: data.username,
                password: data.password,
            })

            console.log(response)

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
                    <div className="rw-segment">
                        <header className="rw-segment-header">
                            <h2 className="rw-heading rw-heading-secondary">
                                Signup
                            </h2>
                        </header>

                        <div className="rw-segment-main">
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
                                        />
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

                                        {/* Gender */}
                                        <div>

                                        <Label name="Male" htmlFor='male'
                                            className="rw-label"
                                            errorClassName="rw-label rw-label-error"
                                            />
                                        <RadioField
                                            required
                                            id='male'
                                            name='gender'
                                            className="rw-input"
                                            errorClassName="rw-input rw-input-error"
                                            value='Male'
                                            />
                                        <Label name="Female" htmlFor='female'
                                            className="rw-label"
                                            errorClassName="rw-label rw-label-error"
                                            />
                                        <RadioField
                                            required
                                            id='female'
                                            value='Female'
                                            name='gender'
                                            className="rw-input"
                                            errorClassName="rw-input rw-input-error"
                                        />
                                        </div>

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
                                                message: 'Mobile Number is required',
                                            },
                                        }}
                                    />
                                    <FieldError
                                        name="mobileNumber"
                                        className="rw-field-error"
                                    />

                                    <div className='mt-8'>
                                        <h2 className='font-semibold text-lg'>Login Credentials</h2>
                                        {/* Username */}
                                        <Label
                                            name="Username"
                                            htmlFor='username'
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

                                        {/* Password */}
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
                                            <Submit className="rw-button rw-button-blue">
                                                Sign Up
                                            </Submit>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="rw-login-link">
                        <span>Already have an account?</span>{' '}
                        <Link to={routes.login()} className="rw-link">
                            Log in!
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignupPage
