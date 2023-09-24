import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useEffect } from 'react'
import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import mapGIF from './map.gif'
import mapIcon from './map-icon.png'

const IndexPage = () => {
    const { isAuthenticated, currentUser, loading } = useAuth()
    const [availabilityState1, setAvailabilityState1] = React.useState(true)
    const [availabilityState2, setAvailabilityState2] = React.useState(true)
    const [availabilityState3, setAvailabilityState3] = React.useState(false)

    useEffect(() => {
        if (isAuthenticated && currentUser) {
            if (currentUser.roles.includes('VENDOR')) {
                navigate(routes.vendorIndex())
            }
        }
    }, [isAuthenticated, currentUser])

    // current user gets set to undefined on app start (yarn rw dev)
    //  but isAuthenticated is still true
    if (loading) {
        return null
    }

    return (
        <>
            <MetaTags title="Index" description="Index page" />

            <section
                style={{
                    backgroundImage: `url(${'https://res.cloudinary.com/dsvf9d8p9/image/upload/q_60/v1695521181/taho-vendor_kxnelb.jpg'})`,
                }}
                className={`relative w-full bg-cover bg-center`}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-400/80"></div>
                <div className="relative max-w-7xl mx-auto px-8 pt-20 pb-32">
                    <h2 className="text-3xl font-bold text-slate-900 mb-8">
                        Missed that taho
                        <br />
                        vendor?
                    </h2>
                    <p className="text-slate-700 mb-4">
                        Don't worry, manong could be
                        <br />
                        nearby.
                    </p>
                    <div className="w-auto">
                        <Link to={routes.consumerMap()}>
                            <Button>
                                View Vendors
                                <ChevronRightIcon className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto p-8">
                <h2 className="mt-16 mb-8 font-semibold text-slate-900 text-center text-2xl">
                    App Features
                </h2>

                <section className="flex flex-col gap-8 items-center justify-between mt-8 mb-16 lg:flex-row">
                    <div className="max-w-md">
                        <h3 className="font-bold text-emerald-700 text-xl mb-4">
                            Consumers
                        </h3>
                        <p className="text-slate-700 mb-2">
                            Manong Pabili provides consumers with a vision by
                            allowing them to see where the vendors are and what
                            products are available around. This gives them power
                            to decide beforehand what products they want.
                        </p>
                    </div>
                    <div className="max-w-md w-full h-72 bg-slate-400/25">
                        <img
                            src={mapGIF}
                            alt="Share location"
                            className="w-full h-full object-scale-down"
                        />
                    </div>
                </section>

                <section className="flex flex-col-reverse gap-8 items-center justify-between mt-8 mb-16 lg:flex-row">
                    <div className="max-w-md w-full h-72 ">
                        <img
                            src={
                                'https://res.cloudinary.com/dsvf9d8p9/image/upload/v1695523924/vendor-homepage.gif'
                            }
                            alt="vendor homepage gif"
                            className="w-full h-full object-scale-down"
                        />
                    </div>
                    <div className="max-w-md">
                        <h3 className="font-bold text-emerald-700 text-xl mb-4">
                            Vendors
                        </h3>
                        <h4 className="font-semibold text-slate-900 mb-2">
                            Share your location
                        </h4>
                        <p className="text-slate-700 mb-4">
                            Amplify your reach by showing people where you are.
                        </p>

                        <h4 className="font-semibold text-slate-900 mb-2">
                            Not moving? Switch to manual
                        </h4>
                        <p className="text-slate-700 mb-4">
                            Vendors can switch to static, manual, or realtime
                            made to fit their situation
                        </p>
                    </div>
                </section>
                <section className="flex flex-col-reverse gap-8 items-center justify-between mt-8 mb-16 lg:flex-row-reverse">
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-700">
                                Barbecue
                            </span>
                            <Button
                                variant="subtle"
                                onClick={() =>
                                    setAvailabilityState1(!availabilityState1)
                                }
                            >
                                {availabilityState1
                                    ? 'Available'
                                    : 'Unavailable'}
                            </Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-700">
                                Coffee
                            </span>
                            <Button
                                variant="subtle"
                                onClick={() =>
                                    setAvailabilityState2(!availabilityState2)
                                }
                            >
                                {availabilityState2
                                    ? 'Available'
                                    : 'Unavailable'}
                            </Button>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="font-semibold text-slate-700">
                                Fruit Juice
                            </span>
                            <Button
                                variant="subtle"
                                onClick={() =>
                                    setAvailabilityState3(!availabilityState3)
                                }
                            >
                                {availabilityState3
                                    ? 'Available'
                                    : 'Unavailable'}
                            </Button>
                        </div>
                    </div>
                    <div className="max-w-md">
                        <h3 className="font-bold text-emerald-700 text-xl mb-4">
                            Vendors
                        </h3>

                        <h4 className="font-semibold text-slate-900 mb-2">
                            Let them know your products
                        </h4>
                        <p className="text-slate-700 mb-4">
                            Vendors can list their products and modify their
                            availability, allowing vendors to communicate what
                            they have in stock!
                        </p>
                    </div>
                </section>
                <section className="flex flex-col items-center gap-8 justify-between mb-8 lg:flex-row">
                    <div>
                        <h2 className="font-bold text-slate-900 text-xl">
                            Show us your spot!
                        </h2>
                        <div className="max-w-md w-full p-16">
                            <img
                                src={mapIcon}
                                alt="Map GIF"
                                className="w-full h-full object-scale-down"
                            />
                        </div>
                    </div>
                    <div className="max-w-md flex flex-col space-y-8">
                        <div className="flex flex-col justify-between items-stretch">
                            <p className="text-slate-700 mb-4">
                                Want to be part of our growing family of
                                vendors?
                            </p>
                            <Link to={routes.signup()}>
                                <Button
                                    variant="outline"
                                    className="px-4 text-sm w-full"
                                >
                                    Sign up
                                </Button>
                            </Link>
                        </div>
                        <div className="flex flex-col justify-between items-stretch">
                            <p className="text-slate-700 mb-4">
                                Let people know where you are by sharing your
                                location.
                            </p>
                            <Link to={routes.login()}>
                                <Button
                                    variant="secondary"
                                    className="px-4 text-sm w-full"
                                >
                                    Login
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default IndexPage
