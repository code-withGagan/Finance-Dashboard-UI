import { useState, useEffect } from 'react'
import { useFinance } from '../../hooks/useFinance'
import { Button } from '../ui/Button'
import { 
  BarChart3, 
  List, 
  TrendingUp, 
  User, 
  DollarSign,
  Menu,
  X
} from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { icon: BarChart3, label: 'Dashboard', href: 'dashboard' },
  { icon: List, label: 'Transactions', href: 'transactions' },
  { icon: TrendingUp, label: 'Insights', href: 'insights' },
]

import { useApp } from '../../context/AppContext.jsx'

export const Sidebar = ({ className }) => {
  const { role, setRole } = useFinance()
  const { activePage, setActivePage } = useApp()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(true)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={clsx(
        'fixed md:static inset-y-0 left-0 z-40 w-64 md:w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        className
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              Finance Pro
            </h1>
          </div>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                onClick={() => setActivePage(item.href)}
                className={clsx(
                  'w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left group',
                  activePage === item.href
                    ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-md font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-sm'
                )}
              >
                <Icon size={20} className={clsx(
                  activePage === item.href ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                )} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Role selector */}
        <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Role:
          </div>
          <div className="flex gap-1">
            {(['viewer', 'admin'].map((r) => (
              <Button
                key={r}
                variant={role === r ? 'primary' : 'secondary'}
                size="sm"
                className="flex-1"
                onClick={() => setRole(r)}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </Button>
            )))}
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar spacer */}
      <div className="w-0 md:w-72 lg:w-80" />
    </>
  )
}
