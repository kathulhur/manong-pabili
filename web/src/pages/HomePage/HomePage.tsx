import '@tomtom-international/web-sdk-maps/dist/maps.css'
import { useAuth } from 'src/auth'
import VendorHomePageCell from 'src/components/VendorHomepageCell'

const HomePage = () => {
    const { currentUser } = useAuth()
    console.log(currentUser)
    return currentUser && <VendorHomePageCell userId={currentUser.id} />

}

export default HomePage
