import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Login from './pages/Login'
import Personas from './pages/Personas'
import Mascotas from './pages/Mascotas'
import Censo from './pages/Censo'
import Mapa from './pages/Mapa'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/map" replace />} />
        <Route path="/map" element={<Mapa />} />
        <Route path="/census" element={<Censo />} />
        <Route path="/pets" element={<Mascotas />} />
        <Route path="/people" element={<Personas />} />
      </Route>
    </Routes>
  )
}

export default App