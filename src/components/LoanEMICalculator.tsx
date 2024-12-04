import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export function LoanEMICalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('')
  const [interestRate, setInterestRate] = useState<string>('')
  const [tenure, setTenure] = useState<string>('')
  const [emi, setEMI] = useState<number | null>(null)
  const [totalInterest, setTotalInterest] = useState<number | null>(null)
  const [totalPayment, setTotalPayment] = useState<number | null>(null)
  const [amortizationSchedule, setAmortizationSchedule] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  const calculateEMI = () => {
    setError(null)
    if (!loanAmount || !interestRate || !tenure) {
      setError('Please fill in all fields')
      return
    }

    const principal = parseFloat(loanAmount)
    const rate = parseFloat(interestRate) / 12 / 100
    const time = parseFloat(tenure) * 12

    if (principal <= 0 || rate <= 0 || time <= 0) {
      setError('Please enter valid positive numbers')
      return
    }

    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1)
    const totalAmount = emi * time
    const totalInterestPayment = totalAmount - principal

    setEMI(emi)
    setTotalInterest(totalInterestPayment)
    setTotalPayment(totalAmount)

    // Calculate amortization schedule
    let balance = principal
    const schedule = []
    for (let i = 1; i <= time; i++) {
      const interest = balance * rate
      const principalPaid = emi - interest
      balance -= principalPaid
      schedule.push({
        month: i,
        emi: emi,
        principal: principalPaid,
        interest: interest,
        balance: balance
      })
    }
    setAmortizationSchedule(schedule)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
  }

  const chartData = [
    { name: 'Principal', value: parseFloat(loanAmount) },
    { name: 'Total Interest', value: totalInterest || 0 },
  ]

  const COLORS = ['#0088FE', '#00C49F']

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan EMI Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="Enter loan amount"
            />
          </div>
          <div>
            <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
            <Input
              id="interestRate"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>
          <div>
            <Label htmlFor="tenure">Tenure (Years)</Label>
            <Input
              id="tenure"
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              placeholder="Enter loan tenure in years"
            />
          </div>
          <Button onClick={calculateEMI}>Calculate EMI</Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {emi !== null && (
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <p>Monthly EMI: {formatCurrency(emi)}</p>
                <p>Total Interest: {formatCurrency(totalInterest!)}</p>
                <p>Total Payment: {formatCurrency(totalPayment!)}</p>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Amortization Schedule</h3>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Month</TableHead>
                        <TableHead>EMI</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {amortizationSchedule.map((row) => (
                        <TableRow key={row.month}>
                          <TableCell>{row.month}</TableCell>
                          <TableCell>{formatCurrency(row.emi)}</TableCell>
                          <TableCell>{formatCurrency(row.principal)}</TableCell>
                          <TableCell>{formatCurrency(row.interest)}</TableCell>
                          <TableCell>{formatCurrency(row.balance)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
