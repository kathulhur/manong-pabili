import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link, navigate, routes } from '@redwoodjs/router'
import clsx from 'clsx'
import { useContext } from 'react'
import { PaginationContext } from 'src/pages/Admin/User/UsersPage/Context'

export interface PaginationProps {
    count: number
    paginate: (page: number) => string
}

const currentStyling =
    'z-10 bg-emerald-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600'
const defaultStyling =
    'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'

const Pagination = ({ count, paginate }: PaginationProps) => {
    const { page, pageSize } = useContext(PaginationContext)
    const items = []
    console.log('page', page)
    const numberOfPages = Math.ceil(count / pageSize)

    if (numberOfPages <= 6) {
        // render all the page numbers
        for (let i = 0; i < Math.ceil(count / pageSize); i++) {
            console.log('i', i)
            items.push(
                <Link
                    key={i}
                    className={clsx(
                        'relative inline-flex items-center px-4 py-2 text-sm font-semibold ',
                        page === i + 1 ? currentStyling : defaultStyling
                    )}
                    to={paginate(i + 1)}
                >
                    {i + 1}
                </Link>
            )
        }
    } else {
        // render the first 3, the last 3, and the current page
        for (let i = 0; i < 3; i++) {
            items.push(
                <Link
                    key={i}
                    className={clsx(
                        'relative inline-flex items-center px-4 py-2 text-sm font-semibold ',
                        {
                            currentStyling: page === i + 1,
                        }
                    )}
                    to={paginate(i + 1)}
                >
                    {i + 1}
                </Link>
            )
        }
        items.push(
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
            </span>
        )

        for (let i = numberOfPages - 3; i < numberOfPages; i++) {
            items.push(
                <Link
                    key={i}
                    className={clsx(
                        'relative inline-flex items-center px-4 py-2 text-sm font-semibold ',
                        {
                            currentStyling: page === i + 1,
                        }
                    )}
                    to={paginate(i + 1)}
                >
                    {i + 1}
                </Link>
            )
        }
    }

    const firstRecordShown = (page - 1) * pageSize + 1
    const lastRecordShown = page * pageSize > count ? count : page * pageSize
    const totalRecords = count

    return (
        <div className="flex flex-col gap-y-4 items-end  sm:flex-row sm:flex-1 sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{firstRecordShown}</span> to{' '}
                    <span className="font-medium">{lastRecordShown}</span> of{' '}
                    <span className="font-medium">{totalRecords}</span> results
                </p>
            </div>
            <div>
                <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <button
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => navigate(paginate(page - 1))}
                        disabled={page === 1}
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                    {items}
                    <button
                        disabled={page === numberOfPages}
                        onClick={() => navigate(paginate(page + 1))}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </button>
                </nav>
            </div>
        </div>
    )
}
export default Pagination
