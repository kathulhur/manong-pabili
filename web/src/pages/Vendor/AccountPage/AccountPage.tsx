import { ChevronLeftIcon } from '@heroicons/react/20/solid'
import { Link, navigate, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Container from 'src/components/Vendor/Container/Container'
import GoBack from 'src/components/GoBack/GoBack'
import VendorAccountCell from 'src/components/Vendor/VendorAccountCell'

const VendorAccountPage = () => {
    const { currentUser } = useAuth()

    return (
        <Container>
            <GoBack label="Vendor Dashboard" />
            <VendorAccountCell userId={currentUser?.id} />
        </Container>
    )
}

export default VendorAccountPage
