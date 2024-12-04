import React from 'react'
import { Moon, Sun, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export function Header({ darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Calculator className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Loan & GST Calculator</h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
        </Button>
      </div>
    </header>
  )
}

