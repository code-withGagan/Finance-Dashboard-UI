import { useState } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { Transactions } from './pages/Transactions'
import { Insights } from './pages/Insights'
import { useFinance } from './hooks/useFinance'
import { useApp } from './context/AppContext.jsx'
import { Button } from './components/ui/Button'
import { Sun, Moon } from 'lucide-react'
import { clsx } from 'clsx'

function App() {
  const { activePage, setActivePage } = useApp()
  const { role } = useFinance()
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
    localStorage.setItem('darkMode', (!darkMode).toString())
  }

  return (
    <Layout>
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20 p-4 md:p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-blue-400 dark:to-blue-200 bg-clip-text text-transparent">
            {role === 'admin' ? 'Admin Dashboard' : 'Viewer Dashboard'}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden md:block">
              Role: <span className="font-semibold capitalize">{role}</span>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleDarkMode}
              className="theme-toggle p-0 aspect-square"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-0">
        {activePage === 'dashboard' && <Dashboard />}
        {activePage === 'transactions' && <Transactions />}
        {activePage === 'insights' && <Insights />}
      </main>
    </Layout>
  )
}

export default App

