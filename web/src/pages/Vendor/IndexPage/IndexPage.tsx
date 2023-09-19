import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useAuth } from 'src/auth'
import VendorHomePageCell from 'src/components/Vendor/VendorHomepageCell'
import { useNotifications } from 'src/hooks/useNotifications'

const HomePage = () => {
    const { currentUser } = useAuth()
    useNotifications()
    return currentUser && <VendorHomePageCell userId={currentUser.id} />
}

export default HomePage
