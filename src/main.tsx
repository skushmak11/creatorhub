import React from 'react'
import ReactDOM from 'react-dom/client'
import AppImproved from './AppImproved.tsx'
import './index.css'
import { AuthProvider } from './hooks/useAuth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppImproved />
    </AuthProvider>
  </React.StrictMode>,
)
