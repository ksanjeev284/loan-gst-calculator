import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-indigo-100 dark:border-[#2a3142] dark:bg-[#1a1f2e] py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} PaisaFinance. All rights reserved.
        </div>
        <div className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500">
          Disclaimer: This calculator is for educational purposes only. Please consult with a financial advisor for accurate financial advice.
        </div>
        <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Privacy Policy
          </Link>
          <span>|</span>
          <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}
