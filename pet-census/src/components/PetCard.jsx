const type_emoji = {
  DOG:    '🐶',
  CAT:    '🐱',
  BIRD:   '🐦',
  RABBIT: '🐰',
  OTHER:  '🐾'
}

export default function PetCard({ pet }) {
  const emoji = type_emoji[pet.tipo] || '🐾'

  return (
    <div className="flex items-center gap-4 px-6 py-4">

      {/* Photo or emoji fallback */}
      <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center
                      justify-center text-2xl flex-shrink-0 overflow-hidden">
        {pet.fotografia ? (
          <img
            src={pet.fotografia}
            alt={pet.nombre}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.display = 'none' }}
          />
        ) : (
          emoji
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800">{pet.nombre}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          {pet.tipo} · {pet.genero} · {pet.edad} {pet.edad === 1 ? 'year' : 'years'}
        </p>
      </div>

      {/* Type badge */}
      <span className="text-xs text-violet-600 bg-violet-50 px-2 py-1
                       rounded-md flex-shrink-0">
        {pet.tipo}
      </span>

    </div>
  )
}