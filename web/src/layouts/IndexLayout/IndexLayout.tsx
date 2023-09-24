import { Link, routes } from '@redwoodjs/router'
import Button from 'src/components/Button'

type IndexLayoutProps = {
    children?: React.ReactNode
}

const IndexLayout = ({ children }: IndexLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto p-8 w-full">
                <header className="flex items-center justify-between">
                    <h1 className="font-extrabold text-emerald-600 sm:text-lg ">
                        <Link to={routes.index()}>Manong Pabili</Link>
                    </h1>
                    <nav className="flex items-center justify-between gap-2">
                        <Link to={routes.login()}>
                            <Button variant="secondary">Login</Button>
                        </Link>
                        <Link to={routes.signup()}>
                            <Button>Sign Up</Button>
                        </Link>
                    </nav>
                </header>
            </div>
            <main className="flex-grow">{children}</main>
            <footer className="relative w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-400/80"></div>
                <div className="relative max-w-7xl mx-auto px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col space-y-2">
                            <span className="text-sm text-slate-900">
                                2023. Manong Pabili.
                            </span>
                            <a
                                href="https://github.com/kathulhur/manong-pabili/"
                                target="_blank"
                                className="text-sm text-slate-900 rw-link"
                            >
                                Github Repository
                            </a>
                            <Link
                                to={routes.team()}
                                className="text-sm text-slate-900 rw-link"
                            >
                                Our Team
                            </Link>
                        </div>
                        <a
                            href="https://www.flaticon.com/free-icons/map"
                            title="map icons"
                            className="text-sm text-black"
                        >
                            Map icons created by Freepik - Flaticon
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default IndexLayout
