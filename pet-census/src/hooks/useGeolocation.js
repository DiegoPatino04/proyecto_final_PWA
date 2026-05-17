import { useState, useEffect } from 'react'

const useGeolocation = () => {
  const [location, setLocation]     = useState({ lat: null, lon: null })
  const [geo_error, setGeoError]    = useState(null)
  const [geo_loading, setGeoLoading] = useState(false)

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser')
      return
    }

    setGeoLoading(true)
    setGeoError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        })
        setGeoLoading(false)
      },
      (error) => {
        const messages = {
          1: 'Location access denied. Please allow location in your browser.',
          2: 'Location unavailable. Try again.',
          3: 'Location request timed out. Try again.'
        }
        setGeoError(messages[error.code] || 'Unknown location error')
        setGeoLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  return { location, geo_error, geo_loading, getLocation }
}

export default useGeolocation