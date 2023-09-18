import { useAuth } from 'src/auth'
import VendorUnverified from 'src/components/Vendor/VendorUnverified/VendorUnverified'

type VerifiedVendorLayoutProps = {
    children?: React.ReactNode
}

const VerifiedVendorLayout = ({ children }: VerifiedVendorLayoutProps) => {
    const { currentUser } = useAuth()

    if (!currentUser) {
        return null
    }

    if (!currentUser.verified) {
        return <VendorUnverified />
    }

    return <>{children}</>
}

export default VerifiedVendorLayout
