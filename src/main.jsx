import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { FinanceProvider } from './context/FinanceContext.jsx'
import { AppProvider } from './context/AppContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <FinanceProvider>
        <App />
      </FinanceProvider>
    </AppProvider>
  </StrictMode>,
)
