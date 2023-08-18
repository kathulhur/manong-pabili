import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const HomePage = () => {
    const { isAuthenticated, currentUser, logOut, loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        navigate(routes.login())
        return null
    }

    return (
        <>
            <MetaTags title="Home" description="Home page" />
            <button type="button" onClick={logOut}>
                Log Out
            </button>
            <h1>Magandang Araw, Mang {currentUser?.username}</h1>
            <div>
                <h2>Mga Produkto</h2>
                <button type="button">Add Product</button>
            </div>
            <ul>
                <li>
                    <div>
                        <span>Fishball</span>
                        <button>Available</button>
                    </div>
                </li>
                <li>
                    <div>
                        <span>Kikiam</span>
                        <button>Available</button>
                    </div>
                </li>
                <li>
                    <div>
                        <span>Kwek Kwek</span>
                        <button>Unavailable</button>
                    </div>
                </li>

                <Link to="/">View All</Link>
            </ul>
            <div>
                <h2>Broadcast mode</h2>
                <button type="button">RealTime</button>
                <button type="button">Manual</button>
            </div>
            <section>
                <h2>Your Location</h2>
                <div id="map"></div>
                <div>
                    <button type="button">Show my location</button>
                    <button type="button">Hide my location</button>
                </div>
            </section>
        </>
    )
}

export default HomePage
