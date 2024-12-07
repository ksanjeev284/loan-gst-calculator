import { Link } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { Calculator } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b dark:border-[#2a3142] sticky top-0 bg-white dark:bg-[#1a1f2e] z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            PaisaFinance
          </span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
