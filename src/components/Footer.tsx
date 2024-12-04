import React from 'react'

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Loan & GST Calculator. All rights reserved.</p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Disclaimer: This calculator is for educational purposes only. Please consult with a financial advisor for accurate financial advice.
        </p>
      </div>
    </footer>
  )
}

