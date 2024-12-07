import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Calculator, IndianRupee, Clock, Percent } from 'lucide-react'
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

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-100 dark:border-[#2a3142] dark:bg-[#1e2536]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-indigo-600 dark:text-indigo-400">
            <Calculator className="h-6 w-6" />
            Loan EMI Calculator
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Calculate your monthly EMI, total interest, and view detailed amortization schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="loanAmount" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  Loan Amount
                </div>
              </Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter loan amount"
                className="border-indigo-100 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interestRate" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-gray-500" />
                  Interest Rate (% p.a.)
                </div>
              </Label>
              <Input
                id="interestRate"
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                placeholder="Enter interest rate"
                className="border-indigo-100 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tenure" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Loan Tenure (Years)
                </div>
              </Label>
              <Input
                id="tenure"
                type="number"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
                placeholder="Enter loan tenure"
                className="border-indigo-100 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={calculateEMI} 
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-1/3"
            >
              Calculate EMI
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {emi && totalInterest && totalPayment && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(emi)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Total Interest</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(totalInterest)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Total Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(totalPayment)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Payment Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Principal', value: parseFloat(loanAmount) },
                            { name: 'Total Interest', value: totalInterest }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          <Cell fill="#4F46E5" />
                          <Cell fill="#818CF8" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Amortization Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="max-h-[300px] overflow-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="dark:border-[#2a3142]">
                            <TableHead className="dark:text-gray-400">Month</TableHead>
                            <TableHead className="dark:text-gray-400">Principal</TableHead>
                            <TableHead className="dark:text-gray-400">Interest</TableHead>
                            <TableHead className="dark:text-gray-400">Balance</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {amortizationSchedule.map((row, index) => (
                            <TableRow key={index} className="dark:border-[#2a3142]">
                              <TableCell className="dark:text-gray-300">{row.month}</TableCell>
                              <TableCell className="dark:text-gray-300">{formatCurrency(row.principal)}</TableCell>
                              <TableCell className="dark:text-gray-300">{formatCurrency(row.interest)}</TableCell>
                              <TableCell className="dark:text-gray-300">{formatCurrency(row.balance)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
