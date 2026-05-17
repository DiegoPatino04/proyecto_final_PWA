import { useState, useEffect } from 'react'
import { createPetMock, getAllPetsMock, pet_types, pet_genders } from '../api/mascotas_api'
import FormField   from '../components/FormField'
import InputField  from '../components/InputField'
import SelectField from '../components/SelectField'
import PetCard     from '../components/PetCard'

const initial_form = {
  nombre:     '',
  tipo:       'DOG',
  genero:     'MALE',
  edad:       '',
  fotografia: ''
}

const type_options = pet_types.map(t => ({ value: t, label: t }))
const gender_options = pet_genders.map(g => ({ value: g, label: g }))

export default function Mascotas() {
  const [form_data, setFormData]     = useState(initial_form)
  const [pets, setPets]              = useState([])
  const [is_loading, setIsLoading]   = useState(false)
  const [success_msg, setSuccessMsg] = useState('')
  const [error_msg, setErrorMsg]     = useState('')
  const [show_form, setShowForm]     = useState(false)
  const [filter, setFilter]          = useState('ALL')

  useEffect(() => {
    loadPets()
  }, [])

  const loadPets = async () => {
    try {
      // Swap getAllPetsMock → getAllPets when API is ready
      const data = await getAllPetsMock()
      setPets(data)
    } catch (err) {
      console.error('Error loading pets:', err)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      // Swap createPetMock → createPet when API is ready
      await createPetMock(form_data)
      setSuccessMsg(`${form_data.nombre} registered successfully`)
      setFormData(initial_form)
      setShowForm(false)
      await loadPets()
    } catch (err) {
      setErrorMsg('Error registering pet. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const filtered_pets = filter === 'ALL'
    ? pets
    : pets.filter(p => p.tipo === filter)

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Pets</h1>
          <p className="text-gray-400 text-sm mt-0.5">Register animals for the census</p>
        </div>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-violet-600 hover:bg-violet-700 text-white text-sm
                     font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {show_form ? 'Cancel' : '+ New pet'}
        </button>
      </div>

      {/* Success message */}
      {success_msg && (
        <div className="bg-green-50 border border-green-200 text-green-700
                        text-sm rounded-lg px-4 py-3">
          ✅ {success_msg}
        </div>
      )}

      {/* Form */}
      {show_form && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-5">New pet</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormField label="Pet name">
              <InputField
                name="nombre"
                value={form_data.nombre}
                onChange={handleChange}
                placeholder="Firulais"
                required
              />
            </FormField>

            <SelectField
              label="Species"
              name="tipo"
              value={form_data.tipo}
              onChange={handleChange}
              options={type_options}
            />

            <SelectField
              label="Gender"
              name="genero"
              value={form_data.genero}
              onChange={handleChange}
              options={gender_options}
            />

            <FormField label="Age (years)">
              <InputField
                type="number"
                name="edad"
                value={form_data.edad}
                onChange={handleChange}
                placeholder="3"
                min="0"
                max="30"
                step="0.5"
                required
              />
            </FormField>

            <FormField label="Photo URL (optional)" >
              <InputField
                name="fotografia"
                value={form_data.fotografia}
                onChange={handleChange}
                placeholder="https://example.com/pet.jpg"
              />
            </FormField>

            {/* Photo preview */}
            {form_data.fotografia && (
              <div className="flex items-center gap-3">
                <img
                  src={form_data.fotografia}
                  alt="Preview"
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <span className="text-xs text-gray-400">Photo preview</span>
              </div>
            )}

            {error_msg && (
              <p className="text-red-500 text-sm md:col-span-2">{error_msg}</p>
            )}

            <div className="md:col-span-2 flex justify-end mt-2">
              <button
                type="submit"
                disabled={is_loading}
                className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300
                           text-white font-medium px-6 py-2.5 rounded-lg text-sm
                           transition-colors"
              >
                {is_loading ? 'Saving...' : 'Save pet'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Filter tabs */}
      {pets.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {['ALL', ...pet_types].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors
                ${filter === type
                  ? 'bg-violet-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-violet-300'
                }`}
            >
              {type}
              {type !== 'ALL' && (
                <span className="ml-1 opacity-70">
                  ({pets.filter(p => p.tipo === type).length})
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Pets list */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">
            Registered pets
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filtered_pets.length})
            </span>
          </h2>
        </div>

        {filtered_pets.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            {pets.length === 0
              ? 'No pets registered yet. Click "+ New pet" to start.'
              : `No pets of type ${filter} found.`
            }
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered_pets.map(pet => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}