import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const taxSlabs = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 750000, rate: 10 },
  { min: 750000, max: 1000000, rate: 15 },
  { min: 1000000, max: 1250000, rate: 20 },
  { min: 1250000, max: 1500000, rate: 25 },
  { min: 1500000, max: Infinity, rate: 30 },
]

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
          slabwiseTax.push({ slab: `${min + 1} - ${max}`, rate: `${rate}%`, tax })
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
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Tax Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="income">Annual Income</Label>
            <Input
              id="income"
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="Enter your annual income"
            />
          </div>
          <div>
            <Label htmlFor="regime">Tax Regime</Label>
            <Select onValueChange={(value: 'old' | 'new') => setRegime(value)} value={regime}>
              <SelectTrigger id="regime">
                <SelectValue placeholder="Select tax regime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New Regime</SelectItem>
                <SelectItem value="old">Old Regime</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateTax}>Calculate Tax</Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {taxDetails && (
            <div className="mt-4 space-y-4">
              <div>
                <p>Annual Income: {formatCurrency(taxDetails.annualIncome)}</p>
                <p>Total Tax: {formatCurrency(taxDetails.taxAmount)}</p>
                <p>Effective Tax Rate: {taxDetails.effectiveRate.toFixed(2)}%</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Slab-wise Tax Breakdown</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Slab</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Tax</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {taxDetails.slabwiseTax.map((slab: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{slab.slab}</TableCell>
                        <TableCell>{slab.rate}</TableCell>
                        <TableCell>{formatCurrency(slab.tax)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
