import { Sidebar } from './Sidebar'
import { clsx } from 'clsx'

export const Layout = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className={clsx(
        "md:ml-72 lg:ml-80 transition-all duration-300 min-h-screen p-6 md:p-8 pb-24 md:pb-8",
        className
      )}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

