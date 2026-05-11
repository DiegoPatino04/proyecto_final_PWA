import { useState, useEffect } from 'react'
import { createPersonMock, getAllPersonsMock } from '../api/personas_api'
import FormField   from '../components/FormField'
import InputField  from '../components/InputField'

const document_types = ['CC', 'CE', 'Passport', 'TI']

const initial_form = {
  nombres:       '',
  apellidos:     '',
  tipoDocumento: 'CC',
  documento:     '',
  direccion:     '',
  telefono:      '',
  ciudad:        '',
  usuario:       '',
  contrasena:    ''
}

export default function Personas() {
  const [form_data, setFormData]   = useState(initial_form)
  const [persons, setPersons]      = useState([])
  const [is_loading, setIsLoading] = useState(false)
  const [success_msg, setSuccessMsg] = useState('')
  const [error_msg, setErrorMsg]     = useState('')
  const [show_form, setShowForm]     = useState(false)

  useEffect(() => {
    loadPersons()
  }, [])

  const loadPersons = async () => {
    try {
      // Swap getAllPersonsMock → getAllPersons when API is ready
      const data = await getAllPersonsMock()
      setPersons(data)
    } catch (err) {
      console.error('Error loading persons:', err)
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
      // Swap createPersonMock → createPerson when API is ready
      await createPersonMock(form_data)
      setSuccessMsg('Person registered successfully')
      setFormData(initial_form)
      setShowForm(false)
      await loadPersons()
    } catch (err) {
      setErrorMsg('Error registering person. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">People</h1>
          <p className="text-gray-400 text-sm mt-0.5">Register owners and surveyors</p>
        </div>
        <button
          onClick={() => setShowForm(prev => !prev)}
          className="bg-violet-600 hover:bg-violet-700 text-white text-sm
                     font-medium px-4 py-2 rounded-lg transition-colors"
        >
          {show_form ? 'Cancel' : '+ New person'}
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
          <h2 className="text-lg font-medium text-gray-800 mb-5">New person</h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormField label="First name">
              <InputField
                name="nombres"
                value={form_data.nombres}
                onChange={handleChange}
                placeholder="Hugo Armando"
                required
              />
            </FormField>

            <FormField label="Last name">
              <InputField
                name="apellidos"
                value={form_data.apellidos}
                onChange={handleChange}
                placeholder="Cristancho Chinome"
                required
              />
            </FormField>

            <FormField label="Document type">
              <select
                name="tipoDocumento"
                value={form_data.tipoDocumento}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                           focus:outline-none focus:ring-2 focus:ring-violet-400
                           focus:border-transparent transition bg-white"
              >
                {document_types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </FormField>

            <FormField label="Document number">
              <InputField
                name="documento"
                value={form_data.documento}
                onChange={handleChange}
                placeholder="1000200300"
                required
              />
            </FormField>

            <FormField label="Address">
              <InputField
                name="direccion"
                value={form_data.direccion}
                onChange={handleChange}
                placeholder="Calle Falsa 123"
                required
              />
            </FormField>

            <FormField label="Phone">
              <InputField
                name="telefono"
                value={form_data.telefono}
                onChange={handleChange}
                placeholder="3001234567"
                required
              />
            </FormField>

            <FormField label="City">
              <InputField
                name="ciudad"
                value={form_data.ciudad}
                onChange={handleChange}
                placeholder="Tunja"
                required
              />
            </FormField>

            <FormField label="Username">
              <InputField
                name="usuario"
                value={form_data.usuario}
                onChange={handleChange}
                placeholder="hcristancho"
                required
              />
            </FormField>

            <FormField label="Password">
              <InputField
                type="password"
                name="contrasena"
                value={form_data.contrasena}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </FormField>

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
                {is_loading ? 'Saving...' : 'Save person'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* People list */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-800">
            Registered people
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({persons.length})
            </span>
          </h2>
        </div>

        {persons.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-400 text-sm">
            No people registered yet. Click "+ New person" to start.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {persons.map(person => (
              <div key={person.id} className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {person.nombres} {person.apellidos}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {person.documento} · {person.ciudad}
                  </p>
                </div>
                <span className="text-xs text-gray-400 bg-gray-100
                                 px-2 py-1 rounded-md">
                  @{person.usuario}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}