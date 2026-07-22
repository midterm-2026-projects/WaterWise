import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.jsx'

if (import.meta.env.MODE !== 'development') {
  registerSW({
    immediate: true,
    onRegisterError(error) {
      console.error('WaterWise service worker registration failed.', error)
    },
  })
} else if ('serviceWorker' in navigator) {
  // Development and Playwright servers are temporary. Remove workers left by
  // prior production previews so they cannot display a stale offline portal.
  navigator.serviceWorker.getRegistrations()
    .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
    .catch(() => {})
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
