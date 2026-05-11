import { NavLink } from 'react-router-dom'

const nav_links = [
  { to: '/map',    label: 'Map'    },
  { to: '/census', label: 'Census' },
  { to: '/pets',   label: 'Pets'   },
  { to: '/people', label: 'People' },
]

export default function Navbar() {
  return (
    <nav className="bg-violet-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight">
          🐾 Pet Census
        </span>
        <div className="flex gap-1">
          {nav_links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                 ${isActive
                   ? 'bg-white text-violet-700'
                   : 'hover:bg-violet-600'
                 }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}