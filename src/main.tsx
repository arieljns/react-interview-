import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ParkingProvider } from './contexts/parking/parking.context'
import { ThemeProvider } from './contexts/theme/theme.context'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ParkingProvider>
          <App />
        </ParkingProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

