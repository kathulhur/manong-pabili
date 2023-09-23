import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, routes } from '@redwoodjs/router'

const GoBack = ({
    to = routes.vendorIndex(),
    label = 'Go back',
}: {
    to?: string
    label?: string
}) => {
    return (
        <Link
            to={to}
            className="inline-flex items-center gap-3 text-sm text-emerald-600 font-semibold"
        >
            <ChevronLeftIcon className="w-5 h-5 -mx-2" />
            {label}
        </Link>
    )
}

export default GoBack
