import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import SyncBanner from '../SyncBanner/SyncBanner'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <SyncBanner />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}