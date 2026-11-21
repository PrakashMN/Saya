import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './assets/css/style.css'
import site from './site/config.js'
import App from './App.jsx'

const documentRoot = document.documentElement
documentRoot.lang = site.lang || 'en'
for (const [property, value] of Object.entries(site.theme)) {
  documentRoot.style.setProperty(property, value)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
