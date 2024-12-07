import { Link, useLocation } from 'react-router-dom'
import { Calculator, IndianRupee, Percent, ArrowRightLeft } from 'lucide-react'

export function Navigation() {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  const navItems = [
    {
      path: '/loan-emi',
      label: 'Loan EMI',
      icon: Calculator,
    },
    {
      path: '/gst',
      label: 'GST',
      icon: Percent,
    },
    {
      path: '/tax',
      label: 'Tax',
      icon: IndianRupee,
    },
    {
      path: '/loan-comparison',
      label: 'Compare Loans',
      icon: ArrowRightLeft,
    },
  ]

  return (
    <nav className="flex items-center -mb-px space-x-1">
      {navItems.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          to={path}
          className={`
            inline-flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium
            ${
              isActive(path)
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-700'
            }
            transition-colors
          `}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </nav>
  )
}
