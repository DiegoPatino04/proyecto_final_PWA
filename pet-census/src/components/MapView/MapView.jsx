import { useCallback, useRef } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const map_container_style = {
  width:  '100%',
  height: '100%'
}

const default_center = {
  lat: 5.5353,
  lng: -73.3678
}

const map_options = {
  disableDefaultUI:  false,
  zoomControl:       true,
  streetViewControl: false,
  mapTypeControl:    false,
  fullscreenControl: true
}

export default function MapView({ children, onMapLoad }) {
  const map_ref = useRef(null)

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
    id: 'google-map-script'
  })

  const handleMapLoad = useCallback((map) => {
    map_ref.current = map
    if (onMapLoad) onMapLoad(map)
  }, [onMapLoad])

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50
                      rounded-xl border border-red-200">
        <div className="text-center">
          <span className="text-3xl">⚠️</span>
          <p className="text-red-500 text-sm mt-2">Error loading Google Maps</p>
          <p className="text-gray-400 text-xs mt-1">Check your API key</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 rounded-xl">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent
                          rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm mt-3">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={map_container_style}
      center={default_center}
      zoom={13}
      options={map_options}
      onLoad={handleMapLoad}
    >
      {children}
    </GoogleMap>
  )
}