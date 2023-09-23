import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import GoBack from 'src/components/GoBack/GoBack'
import VendorAccountCell from 'src/components/Vendor/VendorAccountCell'

const VendorAccountPage = () => {
    const { currentUser } = useAuth()

    return (
        <div className="max-w-2xl mx-auto p-8 space-y-8">
            <GoBack label="Vendor Dashboard" />
            <VendorAccountCell userId={currentUser?.id} />
        </div>
    )
}

export default VendorAccountPage
