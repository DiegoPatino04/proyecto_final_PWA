# proyecto_final_PWA
src/
├── api/                  # Llamadas Axios a la API REST
│   ├── authApi.js
│   ├── personasApi.js
│   ├── mascotasApi.js
│   └── censosApi.js
├── components/           # Componentes reutilizables
│   ├── MapView/
│   ├── InfoWindow/
│   ├── SyncBanner/       # "Pendiente de sincronización"
│   └── Layout/
├── pages/                # Vistas principales
│   ├── Login.jsx
│   ├── Personas.jsx
│   ├── Mascotas.jsx
│   ├── Censo.jsx
│   └── Mapa.jsx
├── store/                # Zustand — estado global
│   ├── authStore.js      # JWT + sesión
│   └── syncStore.js      # Cola offline
├── db/                   # Dexie.js — IndexedDB
│   └── localDB.js
├── hooks/                # Custom hooks
│   ├── useGeolocation.js
│   ├── useCamera.js
│   └── useSync.js
├── utils/
│   ├── imageUtils.js     # Compresión + validación 50kb Base64
│   └── uuidUtils.js
└── sw/                   # Service Worker (Workbox lo genera)