import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Ensure html and body fill viewport
document.documentElement.style.height = '100%'
document.body.style.height = '100%'
document.body.style.margin = '0'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
