import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from 'lucide-react'
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
    <Card>
      <CardHeader>
        <CardTitle>Loan Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan 1</h3>
            <div>
              <Label htmlFor="loan1Amount">Loan Amount</Label>
              <Input
                id="loan1Amount"
                type="number"
                value={loan1.loanAmount}
                onChange={(e) => setLoan1({ ...loan1, loanAmount: e.target.value })}
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <Label htmlFor="loan1InterestRate">Interest Rate (% per annum)</Label>
              <Input
                id="loan1InterestRate"
                type="number"
                value={loan1.interestRate}
                onChange={(e) => setLoan1({ ...loan1, interestRate: e.target.value })}
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <Label htmlFor="loan1Tenure">Tenure (Years)</Label>
              <Input
                id="loan1Tenure"
                type="number"
                value={loan1.tenure}
                onChange={(e) => setLoan1({ ...loan1, tenure: e.target.value })}
                placeholder="Enter loan tenure in years"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan 2</h3>
            <div>
              <Label htmlFor="loan2Amount">Loan Amount</Label>
              <Input
                id="loan2Amount"
                type="number"
                value={loan2.loanAmount}
                onChange={(e) => setLoan2({ ...loan2, loanAmount: e.target.value })}
                placeholder="Enter loan amount"
              />
            </div>
            <div>
              <Label htmlFor="loan2InterestRate">Interest Rate (% per annum)</Label>
              <Input
                id="loan2InterestRate"
                type="number"
                value={loan2.interestRate}
                onChange={(e) => setLoan2({ ...loan2, interestRate: e.target.value })}
                placeholder="Enter interest rate"
              />
            </div>
            <div>
              <Label htmlFor="loan2Tenure">Tenure (Years)</Label>
              <Input
                id="loan2Tenure"
                type="number"
                value={loan2.tenure}
                onChange={(e) => setLoan2({ ...loan2, tenure: e.target.value })}
                placeholder="Enter loan tenure in years"
              />
            </div>
          </div>
        </div>
        <Button onClick={compareLoan} className="mt-6">Compare Loans</Button>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {comparisonResult && (
          <div className="mt-6 space-y-6">
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
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  <Legend />
                  <Bar dataKey="EMI" fill="#8884d8" />
                  <Bar dataKey="Total Interest" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
