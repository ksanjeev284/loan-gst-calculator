import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Calculator, IndianRupee, Clock, Percent, ArrowRightLeft } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface LoanDetails {
  loanAmount: string;
  interestRate: string;
  tenure: string;
}

export function LoanComparison() {
  const [loan1, setLoan1] = useState<LoanDetails>({ loanAmount: '', interestRate: '', tenure: '' })
  const [loan2, setLoan2] = useState<LoanDetails>({ loanAmount: '', interestRate: '', tenure: '' })
  const [comparisonResult, setComparisonResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateEMI = (principal: number, rate: number, time: number) => {
    const monthlyRate = rate / 12 / 100
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, time)) / (Math.pow(1 + monthlyRate, time) - 1)
    const totalAmount = emi * time
    const totalInterest = totalAmount - principal
    return { emi, totalInterest, totalAmount }
  }

  const compareLoan = () => {
    setError(null)
    if (!loan1.loanAmount || !loan1.interestRate || !loan1.tenure ||
        !loan2.loanAmount || !loan2.interestRate || !loan2.tenure) {
      setError('Please fill in all fields for both loans')
      return
    }

    const loan1Details = calculateEMI(parseFloat(loan1.loanAmount), parseFloat(loan1.interestRate), parseFloat(loan1.tenure) * 12)
    const loan2Details = calculateEMI(parseFloat(loan2.loanAmount), parseFloat(loan2.interestRate), parseFloat(loan2.tenure) * 12)

    setComparisonResult({
      loan1: { ...loan1Details, name: 'Loan 1' },
      loan2: { ...loan2Details, name: 'Loan 2' }
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
  }

  const chartData = comparisonResult ? [
    { name: 'Loan 1', EMI: comparisonResult.loan1.emi, 'Total Interest': comparisonResult.loan1.totalInterest },
    { name: 'Loan 2', EMI: comparisonResult.loan2.emi, 'Total Interest': comparisonResult.loan2.totalInterest }
  ] : []

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-100 dark:border-[#2a3142] dark:bg-[#1e2536]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-indigo-600 dark:text-indigo-400">
            <ArrowRightLeft className="h-6 w-6" />
            Loan Comparison Calculator
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Compare different loan options to find the best one for you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Loan 1 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Loan Option 1
              </h3>
              <div className="space-y-2">
                <Label htmlFor="loan1Amount" className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    Loan Amount
                  </div>
                </Label>
                <Input
                  id="loan1Amount"
                  type="number"
                  value={loan1.loanAmount}
                  onChange={(e) => setLoan1({ ...loan1, loanAmount: e.target.value })}
                  placeholder="Enter loan amount"
                  className="border-indigo-100 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan1InterestRate" className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-gray-500" />
                    Interest Rate (% p.a.)
                  </div>
                </Label>
                <Input
                  id="loan1InterestRate"
                  type="number"
                  value={loan1.interestRate}
                  onChange={(e) => setLoan1({ ...loan1, interestRate: e.target.value })}
                  placeholder="Enter interest rate"
                  className="border-indigo-100 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan1Tenure" className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    Tenure (Years)
                  </div>
                </Label>
                <Input
                  id="loan1Tenure"
                  type="number"
                  value={loan1.tenure}
                  onChange={(e) => setLoan1({ ...loan1, tenure: e.target.value })}
                  placeholder="Enter loan tenure"
                  className="border-indigo-100 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Loan 2 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                Loan Option 2
              </h3>
              <div className="space-y-2">
                <Label htmlFor="loan2Amount" className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    Loan Amount
                  </div>
                </Label>
                <Input
                  id="loan2Amount"
                  type="number"
                  value={loan2.loanAmount}
                  onChange={(e) => setLoan2({ ...loan2, loanAmount: e.target.value })}
                  placeholder="Enter loan amount"
                  className="border-indigo-100 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan2InterestRate" className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-gray-500" />
                    Interest Rate (% p.a.)
                  </div>
                </Label>
                <Input
                  id="loan2InterestRate"
                  type="number"
                  value={loan2.interestRate}
                  onChange={(e) => setLoan2({ ...loan2, interestRate: e.target.value })}
                  placeholder="Enter interest rate"
                  className="border-indigo-100 focus:border-indigo-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan2Tenure" className="text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    Tenure (Years)
                  </div>
                </Label>
                <Input
                  id="loan2Tenure"
                  type="number"
                  value={loan2.tenure}
                  onChange={(e) => setLoan2({ ...loan2, tenure: e.target.value })}
                  placeholder="Enter loan tenure"
                  className="border-indigo-100 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={compareLoan} 
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-1/3"
            >
              Compare Loans
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {comparisonResult && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI Difference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(Math.abs(comparisonResult.loan1.emi - comparisonResult.loan2.emi))}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Interest Difference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(Math.abs(comparisonResult.loan1.totalInterest - comparisonResult.loan2.totalInterest))}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Total Payment Difference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(Math.abs(comparisonResult.loan1.totalAmount - comparisonResult.loan2.totalAmount))}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader>
                    <CardTitle className="text-lg">EMI Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        <Bar dataKey="EMI" fill="#4F46E5" name="Monthly EMI" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader>
                    <CardTitle className="text-lg">Interest Comparison</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                        <Bar dataKey="Total Interest" fill="#818CF8" name="Total Interest" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Detailed Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Details</TableHead>
                        <TableHead>Loan 1</TableHead>
                        <TableHead>Loan 2</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Loan Amount</TableCell>
                        <TableCell>{formatCurrency(parseFloat(loan1.loanAmount))}</TableCell>
                        <TableCell>{formatCurrency(parseFloat(loan2.loanAmount))}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Interest Rate</TableCell>
                        <TableCell>{loan1.interestRate}%</TableCell>
                        <TableCell>{loan2.interestRate}%</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tenure (Years)</TableCell>
                        <TableCell>{loan1.tenure}</TableCell>
                        <TableCell>{loan2.tenure}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Monthly EMI</TableCell>
                        <TableCell>{formatCurrency(comparisonResult.loan1.emi)}</TableCell>
                        <TableCell>{formatCurrency(comparisonResult.loan2.emi)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Interest</TableCell>
                        <TableCell>{formatCurrency(comparisonResult.loan1.totalInterest)}</TableCell>
                        <TableCell>{formatCurrency(comparisonResult.loan2.totalInterest)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Payment</TableCell>
                        <TableCell>{formatCurrency(comparisonResult.loan1.totalAmount)}</TableCell>
                        <TableCell>{formatCurrency(comparisonResult.loan2.totalAmount)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
