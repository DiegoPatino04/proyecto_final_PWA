import { Marker } from '@react-google-maps/api'

export default function CensusMarker({ census, onClick }) {
  const position = {
    lat: parseFloat(census.lat),
    lng: parseFloat(census.lon)
  }

  // Build a colored SVG pin using the census color field
  const color     = census.color || '#7c3aed'
  const svg_pin   = `
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="40" viewBox="0 0 32 40">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24s16-14 16-24C32 7.163 24.837 0 16 0z"
            fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="white" opacity="0.9"/>
    </svg>
  `

  const icon = {
    url:    `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg_pin)}`,
    scaledSize: { width: 32, height: 40 },
    anchor:     { x: 16, y: 40 }
  }

  return (
    <Marker
      position={position}
      icon={icon}
      onClick={() => onClick(census)}
      title={census.pet?.nombre || census.mascota?.nombre || 'Census'}
    />
  )
}