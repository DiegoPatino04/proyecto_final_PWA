import { useEffect, useState } from 'react'

export default function SyncBanner() {
  const [is_online, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handle_online  = () => setIsOnline(true)
    const handle_offline = () => setIsOnline(false)

    window.addEventListener('online',  handle_online)
    window.addEventListener('offline', handle_offline)

    return () => {
      window.removeEventListener('online',  handle_online)
      window.removeEventListener('offline', handle_offline)
    }
  }, [])

  if (is_online) return null

  return (
    <div className="bg-amber-400 text-amber-900 text-sm font-medium text-center py-2 px-4">
      ⚠️ You are offline — data will sync automatically when connection is restored
    </div>
  )
}