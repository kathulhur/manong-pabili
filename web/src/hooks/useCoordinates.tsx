import { useEffect, useState } from "react"

export async function getCurrentPositionAsync(options) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
          (position) => {
              resolve(position)
          },
          (error) => {
              reject(error)
          },
          options
      )
  })
}


export default function useCoordinates() {
  const [coordinates, setCoordinates] = useState<GeolocationCoordinates>(null)
  useEffect(() => {
    async function getCoordinates() {
      try {
        const position = await getCurrentPositionAsync({
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        })
        setCoordinates(position.coords)

      } catch (err) {
        console.log(err)
        if (err.code === 1) {
            alert(
                'You have denied access to your location. Please enable your browser location settings.'
            )
        }

        if (err.code === 2) {
            alert(
                'Please turn on your device location settings and try again. '
            )
        }

        if (err.code === 3) {
            alert(
                'Location request timed out. Please try again or try moving to a location with better signal.'
            )
        }
      }
    }
    getCoordinates()
  }, [])

  return coordinates;
}