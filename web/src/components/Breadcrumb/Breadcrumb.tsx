import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'

export interface BreadcrumbProps {
    pages: {
        name: string
        to: string
        current?: boolean
    }[]
}

export default function Breadcrumb({ pages }: BreadcrumbProps) {
    return (
        <nav className="flex overflow-auto" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <Link
                            to={routes.admin()}
                            className="text-gray-400 hover:text-gray-500"
                        >
                            <HomeIcon
                                className="h-5 w-5 flex-shrink-0"
                                aria-hidden="true"
                            />
                            <span className="sr-only">Home</span>
                        </Link>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <ChevronRightIcon
                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                            />
                            <Link
                                to={page.to}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                aria-current={page.current ? 'page' : undefined}
                            >
                                {page.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
