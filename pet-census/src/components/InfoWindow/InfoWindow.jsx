import { OverlayView } from '@react-google-maps/api'

const type_emoji = {
  DOG: '🐶', CAT: '🐱', BIRD: '🐦', RABBIT: '🐰', OTHER: '🐾',
  PERRO: '🐶', GATO: '🐱', PAJARO: '🐦'
}

export default function InfoWindow({ census, onClose }) {
  if (!census) return null

  const { pet, mascota, owner, dueno, fotografiaCenso, photo, color } = census

  // Supports both English mock fields and Spanish API fields
  const pet_data   = pet   || mascota || {}
  const owner_data = owner || dueno   || {}
  const photo_src  = fotografiaCenso || photo

  const emoji = type_emoji[pet_data.tipo] || '🐾'

  const position = {
    lat: parseFloat(census.lat),
    lng: parseFloat(census.lon)
  }

  return (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(w, h) => ({ x: -(w / 2), y: -(h + 16) })}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden
                      border border-gray-100 relative"
           style={{ fontFamily: 'sans-serif' }}>

        {/* Color accent bar from census color field */}
        <div className="h-1.5 w-full" style={{ backgroundColor: color || '#7c3aed' }} />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-6 h-6 bg-gray-100 hover:bg-gray-200
                     rounded-full flex items-center justify-center text-gray-500
                     text-xs font-bold transition-colors z-10"
        >
          ✕
        </button>

        {/* Census photo */}
        {photo_src ? (
          <img
            src={photo_src}
            alt="Census photo"
            className="w-full h-36 object-cover"
          />
        ) : (
          <div className="w-full h-36 bg-gray-50 flex items-center
                          justify-center text-5xl">
            {emoji}
          </div>
        )}

        {/* Content */}
        <div className="p-4 flex flex-col gap-3">

          {/* Pet info */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <div>
              <p className="text-sm font-semibold text-gray-800">
                {pet_data.nombre || 'Unknown pet'}
              </p>
              <p className="text-xs text-gray-400">
                {pet_data.tipo} · {pet_data.genero} · {pet_data.edad}{' '}
                {pet_data.edad === 1 ? 'year' : 'years'}
              </p>
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          {/* Owner info */}
          <div>
            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">
              Owner
            </p>
            <p className="text-sm font-medium text-gray-800">
              {owner_data.nombres || owner_data.nombre || 'Unknown owner'}{' '}
              {owner_data.apellidos || ''}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              📞 {owner_data.telefono || 'No phone'}
            </p>
          </div>

          {/* Coordinates */}
          <div className="bg-gray-50 rounded-lg px-3 py-2">
            <p className="text-xs font-mono text-gray-400">
              📍 {parseFloat(census.lat).toFixed(5)},{' '}
              {parseFloat(census.lon).toFixed(5)}
            </p>
          </div>

        </div>
      </div>
    </OverlayView>
  )
}