import { useState } from 'react'

interface LoanDetails {
  amount: number
  interest: number
  tenure: number
  emi: number
  totalInterest: number
  totalPayment: number
}

export function LoanComparisonCalculator() {
  const [loan1, setLoan1] = useState<LoanDetails>({
    amount: 0,
    interest: 0,
    tenure: 0,
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  })

  const [loan2, setLoan2] = useState<LoanDetails>({
    amount: 0,
    interest: 0,
    tenure: 0,
    emi: 0,
    totalInterest: 0,
    totalPayment: 0,
  })

  const calculateEMI = (amount: number, interest: number, tenure: number): number => {
    const monthlyRate = interest / (12 * 100)
    const months = tenure * 12
    const emi =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    return isNaN(emi) ? 0 : emi
  }

  const calculateLoanDetails = (
    amount: number,
    interest: number,
    tenure: number
  ): LoanDetails => {
    const emi = calculateEMI(amount, interest, tenure)
    const totalPayment = emi * tenure * 12
    const totalInterest = totalPayment - amount

    return {
      amount,
      interest,
      tenure,
      emi,
      totalInterest,
      totalPayment,
    }
  }

  const handleLoan1Change = (
    field: keyof Pick<LoanDetails, 'amount' | 'interest' | 'tenure'>,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0
    const newLoan = calculateLoanDetails(
      field === 'amount' ? numValue : loan1.amount,
      field === 'interest' ? numValue : loan1.interest,
      field === 'tenure' ? numValue : loan1.tenure
    )
    setLoan1(newLoan)
  }

  const handleLoan2Change = (
    field: keyof Pick<LoanDetails, 'amount' | 'interest' | 'tenure'>,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0
    const newLoan = calculateLoanDetails(
      field === 'amount' ? numValue : loan2.amount,
      field === 'interest' ? numValue : loan2.interest,
      field === 'tenure' ? numValue : loan2.tenure
    )
    setLoan2(newLoan)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Loan 1 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Loan Option 1</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="loan1-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Amount
            </label>
            <input
              id="loan1-amount"
              type="number"
              placeholder="Enter loan amount"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleLoan1Change('amount', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="loan1-interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Rate (%)
            </label>
            <input
              id="loan1-interest"
              type="number"
              step="0.1"
              placeholder="Enter interest rate"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleLoan1Change('interest', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="loan1-tenure" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Tenure (Years)
            </label>
            <input
              id="loan1-tenure"
              type="number"
              placeholder="Enter loan tenure"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleLoan1Change('tenure', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Loan 2 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Loan Option 2</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="loan2-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Amount
            </label>
            <input
              id="loan2-amount"
              type="number"
              placeholder="Enter loan amount"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleLoan2Change('amount', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="loan2-interest" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interest Rate (%)
            </label>
            <input
              id="loan2-interest"
              type="number"
              step="0.1"
              placeholder="Enter interest rate"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleLoan2Change('interest', e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="loan2-tenure" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loan Tenure (Years)
            </label>
            <input
              id="loan2-tenure"
              type="number"
              placeholder="Enter loan tenure"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              onChange={(e) => handleLoan2Change('tenure', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Comparison Results</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Loan Option 1</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Monthly EMI: {formatCurrency(loan1.emi)}</p>
              <p>Total Interest: {formatCurrency(loan1.totalInterest)}</p>
              <p>Total Payment: {formatCurrency(loan1.totalPayment)}</p>
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Loan Option 2</h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Monthly EMI: {formatCurrency(loan2.emi)}</p>
              <p>Total Interest: {formatCurrency(loan2.totalInterest)}</p>
              <p>Total Payment: {formatCurrency(loan2.totalPayment)}</p>
            </div>
          </div>
        </div>

        {/* Difference Analysis */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h3 className="font-medium mb-2 text-gray-900 dark:text-white">Difference Analysis</h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>EMI Difference: {formatCurrency(Math.abs(loan1.emi - loan2.emi))}</p>
            <p>
              Total Interest Difference:{' '}
              {formatCurrency(Math.abs(loan1.totalInterest - loan2.totalInterest))}
            </p>
            <p>
              Total Payment Difference:{' '}
              {formatCurrency(Math.abs(loan1.totalPayment - loan2.totalPayment))}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
