import { useAuth } from 'src/auth'
import Container from 'src/components/Vendor/Container/Container'
import GoBack from 'src/components/GoBack/GoBack'
import VendorAccountCell from 'src/components/Vendor/VendorAccountCell'
import { MetaTags } from '@redwoodjs/web'

const VendorAccountPage = () => {
    const { currentUser } = useAuth()

    return (
        <Container>
            <MetaTags title="Profile" description="Vendor Profile Page" />
            <GoBack label="Vendor Dashboard" />
            <VendorAccountCell userId={currentUser?.id} />
        </Container>
    )
}

export default VendorAccountPage
