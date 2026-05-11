import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

export default function ProtectedRoute({ children }) {
  const is_authenticated = useAuthStore(state => state.is_authenticated)

  if (!is_authenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}