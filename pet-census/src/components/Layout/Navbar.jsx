import { NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const nav_links = [
  { to: '/map',    label: 'Map'    },
  { to: '/census', label: 'Census' },
  { to: '/pets',   label: 'Pets'   },
  { to: '/people', label: 'People' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const logout   = useAuthStore(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-violet-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight">🐾 Pet Census</span>
        <div className="flex items-center gap-1">
          {nav_links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                 ${isActive ? 'bg-white text-violet-700' : 'hover:bg-violet-600'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={handleLogout}
            className="ml-3 px-3 py-1.5 rounded-md text-sm font-medium
                       bg-violet-800 hover:bg-violet-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}