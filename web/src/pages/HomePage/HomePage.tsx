import { useEffect, useState } from 'react'

import './style.css'
import tt, { Marker } from '@tomtom-international/web-sdk-maps'

import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import DashboardProductsCell from 'src/components/DashboardProductsCell'

const HomePage = () => {
    const [map, setMap] = useState<tt.Map>(null)
    const [isLocationShown, setIsLocationShown] = useState(false)
    const [isRealTime, setIsRealTime] = useState(false)

    const { isAuthenticated, currentUser, logOut, loading } = useAuth()

    const addProductButtonHandler = () => {
        console.log('Add Product')
    }

    const showLocationButtonHandler = () => {
        setIsLocationShown(true)
    }

    const hideLocationButtonHandler = () => {
        setIsLocationShown(false)
    }

    const realTimeModeButtonHandler = () => {
        setIsRealTime(true)
    }

    const manualModeButtonHandler = () => {
        setIsRealTime(false)
    }

    const updateLocationButtonHandler = () => {
        console.log('Update Location')
        new Marker().setLngLat([121.004995, 14.610395]).addTo(map)
        map.setCenter([121.004995, 14.610395])
    }

    useEffect(() => {
        if (isLocationShown) {
            const map = tt.map({
                key: process.env.TOMTOM_API_KEY,
                container: 'map',
                center: [121.004995, 14.610395],
                zoom: 12,
            })
            setMap(map)
        }
    }, [isLocationShown])

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
                <button type="button" onClick={addProductButtonHandler}>
                    Add Product
                </button>
            </div>
            <DashboardProductsCell userId={currentUser.id} />
            <div>
                <h2>Broadcast mode</h2>
                <button type="button" onClick={realTimeModeButtonHandler}>
                    RealTime
                </button>
                <button type="button" onClick={manualModeButtonHandler}>
                    Manual
                </button>
            </div>
            <section>
                <h2>Your Location</h2>
                {!isRealTime && (
                    <button
                        type="button"
                        disabled={!isLocationShown}
                        onClick={updateLocationButtonHandler}
                    >
                        Update Location
                    </button>
                )}
                {isLocationShown && (
                    <div
                        id="map"
                        style={{
                            maxWidth: '24rem',
                            height: '16rem',
                            border: '1px solid black',
                        }}
                    ></div>
                )}
                {!isLocationShown && (
                    <div
                        style={{
                            maxHeight: '16rem',
                            border: '1px solid black',
                        }}
                    >
                        Your location is hidden
                    </div>
                )}
                <div>
                    <button type="button" onClick={showLocationButtonHandler}>
                        Show my location
                    </button>
                    <button type="button" onClick={hideLocationButtonHandler}>
                        Hide my location
                    </button>
                </div>
            </section>
        </>
    )
}

export default HomePage
