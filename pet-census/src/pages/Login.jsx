import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUserMock } from '../api/auth_api'
import useAuthStore from '../store/authStore'

export default function Login() {
  const navigate    = useNavigate()
  const setAuth     = useAuthStore(state => state.setAuth)

  const [form_data, setFormData] = useState({ username: '', password: '' })
  const [is_loading, setIsLoading] = useState(false)
  const [error_msg, setErrorMsg]   = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrorMsg('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')

    try {
      // Swap loginUserMock → loginUser when you get the real API
      const data = await loginUserMock(form_data.username, form_data.password)
      setAuth(data.token, { username: form_data.username })
      navigate('/map')
    } catch (err) {
      setErrorMsg('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <span className="text-5xl">🐾</span>
          <h1 className="text-2xl font-semibold text-gray-800 mt-3">Pet Census</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={form_data.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-400
                         focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form_data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-violet-400
                         focus:border-transparent transition"
            />
          </div>

          {error_msg && (
            <p className="text-red-500 text-sm text-center">{error_msg}</p>
          )}

          <button
            type="submit"
            disabled={is_loading}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300
                       text-white font-medium py-2.5 rounded-lg text-sm
                       transition-colors mt-2"
          >
            {is_loading ? 'Signing in...' : 'Sign in'}
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo: admin / 1234
        </p>

      </div>
    </div>
  )
}