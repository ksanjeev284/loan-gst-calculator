import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Calculator, IndianRupee, Percent } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const taxSlabs = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 750000, rate: 10 },
  { min: 750000, max: 1000000, rate: 15 },
  { min: 1000000, max: 1250000, rate: 20 },
  { min: 1250000, max: 1500000, rate: 25 },
  { min: 1500000, max: Infinity, rate: 30 },
]

const COLORS = ['#4F46E5', '#818CF8', '#C7D2FE']

export function TaxCalculator() {
  const [income, setIncome] = useState<string>('')
  const [regime, setRegime] = useState<'old' | 'new'>('new')
  const [taxDetails, setTaxDetails] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateTax = () => {
    setError(null)
    if (!income) {
      setError('Please enter your income')
      return
    }

    const annualIncome = parseFloat(income)
    if (annualIncome < 0) {
      setError('Income cannot be negative')
      return
    }

    let taxAmount = 0
    let effectiveRate = 0
    const slabwiseTax = []

    if (regime === 'new') {
      for (let i = 0; i < taxSlabs.length; i++) {
        const { min, max, rate } = taxSlabs[i]
        if (annualIncome > min) {
          const taxableAmount = Math.min(annualIncome - min, max - min)
          const tax = (taxableAmount * rate) / 100
          taxAmount += tax
          if (tax > 0) {
            slabwiseTax.push({ slab: `₹${formatNumber(min + 1)} - ₹${max === Infinity ? '∞' : formatNumber(max)}`, rate: `${rate}%`, tax })
          }
        }
      }
    } else {
      // Old regime calculation (simplified)
      if (annualIncome <= 250000) {
        taxAmount = 0
      } else if (annualIncome <= 500000) {
        taxAmount = (annualIncome - 250000) * 0.05
      } else if (annualIncome <= 1000000) {
        taxAmount = 12500 + (annualIncome - 500000) * 0.2
      } else {
        taxAmount = 112500 + (annualIncome - 1000000) * 0.3
      }
      slabwiseTax.push({ slab: 'As per old regime', rate: 'Variable', tax: taxAmount })
    }

    effectiveRate = (taxAmount / annualIncome) * 100

    setTaxDetails({
      annualIncome,
      taxAmount,
      effectiveRate,
      slabwiseTax,
      takeHome: annualIncome - taxAmount
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-IN').format(value)
  }

  const pieChartData = taxDetails ? [
    { name: 'Take Home', value: taxDetails.takeHome },
    { name: 'Tax Amount', value: taxDetails.taxAmount }
  ] : []

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-100 dark:border-[#2a3142] dark:bg-[#1e2536]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-indigo-600 dark:text-indigo-400">
            <Calculator className="h-6 w-6" />
            Income Tax Calculator
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Calculate your income tax based on new or old tax regime</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="income" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  Annual Income
                </div>
              </Label>
              <Input
                id="income"
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter your annual income"
                className="border-indigo-100 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="regime" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-gray-500" />
                  Tax Regime
                </div>
              </Label>
              <Select value={regime} onValueChange={(value: 'old' | 'new') => setRegime(value)}>
                <SelectTrigger id="regime" className="border-indigo-100 focus:border-indigo-500">
                  <SelectValue placeholder="Select tax regime" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Regime</SelectItem>
                  <SelectItem value="old">Old Regime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={calculateTax} 
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-1/3"
            >
              Calculate Tax
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {taxDetails && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Total Tax</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(taxDetails.taxAmount)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Take Home</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(taxDetails.takeHome)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Effective Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {taxDetails.effectiveRate.toFixed(2)}%
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Income Distribution</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieChartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Tax Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="dark:border-[#2a3142]">
                          <TableHead className="dark:text-gray-400">Income Slab</TableHead>
                          <TableHead className="dark:text-gray-400">Rate</TableHead>
                          <TableHead className="dark:text-gray-400">Tax</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {taxDetails.slabwiseTax.map((slab: any, index: number) => (
                          <TableRow key={index} className="dark:border-[#2a3142]">
                            <TableCell className="dark:text-gray-300">{slab.slab}</TableCell>
                            <TableCell className="dark:text-gray-300">{slab.rate}</TableCell>
                            <TableCell className="dark:text-gray-300">{formatCurrency(slab.tax)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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
