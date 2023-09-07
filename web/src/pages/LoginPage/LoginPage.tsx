import { useRef } from 'react'
import { useEffect } from 'react'

import {
    Form,
    Label,
    TextField,
    PasswordField,
    Submit,
    FieldError,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

const LoginPage = () => {
    const { isAuthenticated, logIn, loading, currentUser } = useAuth()

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            if (currentUser.roles.includes('ADMIN')) {
                navigate(routes.admin())
            } else if(currentUser.roles.includes('VENDOR')) {
                navigate(routes.home())
            }
        }
    }, [isAuthenticated, currentUser])

    const usernameRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        usernameRef.current?.focus()
    }, [loading, isAuthenticated])

    const onSubmit = async (data: Record<string, string>) => {
        const response = await logIn({
            username: data.username,
            password: data.password,
        })

        if (response.message) {
            toast(response.message)
        } else if (response.error) {
            toast.error(response.error)
        } else {
            toast.success('Welcome back!')
        }
    }

    // don't show the login form until we know if the user is logged in or not
    console.log(loading, isAuthenticated, currentUser)
    return (
        <>
            <MetaTags title="Login" />
            { !loading && !isAuthenticated && (
            <main>
                <Toaster
                    toastOptions={{ duration: 6000 }}
                />
                <div className='mx-auto max-w-lg p-4'>
                    <div className='mt-24 bg-slate-50 p-4 rounded-lg'>
                        <header>
                            <h1 className='mb-4 font-bold text-xl text-green-700 text-center'>Manong Pabili</h1>
                            <h2 className="font-semibold">Login</h2>
                        </header>

                        <div>
                            <div className="rw-form-wrapper">
                                <Form
                                    onSubmit={onSubmit}
                                    className="rw-form-wrapper"
                                >
                                    <Label
                                        name="username"
                                        className="rw-label"
                                        errorClassName="rw-label rw-label-error"
                                    >
                                        Username
                                    </Label>
                                    <TextField
                                        name="username"
                                        className="w-full px-4 py-2 bg-transparent rounded-md border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                                        errorClassName="rw-input rw-input-error"
                                        ref={usernameRef}
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
                                        className="w-full px-4 py-2 bg-transparent rounded-md border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-green-700"
                                        errorClassName="rw-input rw-input-error"
                                        autoComplete="current-password"
                                        validation={{
                                            required: {
                                                value: true,
                                                message: 'Password is required',
                                            },
                                        }}
                                    />

                                    <div className='text-right'>
                                        <Link
                                            to={routes.forgotPassword()}
                                            className="text-slate-500"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>

                                    <FieldError
                                        name="password"
                                        className="rw-field-error"
                                    />

                                    <div className="rw-button-group">
                                        <Button type='submit' fullWidth>
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            <span>Don&apos;t have an account?</span>{' '}
                            <Link to={routes.signup()} className="text-green-700">
                                Sign up!
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            )}
        </>
    )
}

export default LoginPage
