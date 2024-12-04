import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function GSTCalculator() {
  const [price, setPrice] = useState<string>('')
  const [gstRate, setGSTRate] = useState<string>('')
  const [gstAmount, setGSTAmount] = useState<number | null>(null)
  const [finalPrice, setFinalPrice] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const calculateGST = () => {
    setError(null)
    if (!price || !gstRate) {
      setError('Please fill in all fields')
      return
    }

    const priceValue = parseFloat(price)
    const gstRateValue = parseFloat(gstRate)

    if (priceValue <= 0 || gstRateValue < 0) {
      setError('Please enter valid positive numbers')
      return
    }

    const gstAmount = (priceValue * gstRateValue) / 100
    const finalPrice = priceValue + gstAmount

    setGSTAmount(gstAmount)
    setFinalPrice(finalPrice)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>GST Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="price">Original Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter original price"
            />
          </div>
          <div>
            <Label htmlFor="gstRate">GST Rate (%)</Label>
            <Select onValueChange={setGSTRate} value={gstRate}>
              <SelectTrigger id="gstRate">
                <SelectValue placeholder="Select GST rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5%</SelectItem>
                <SelectItem value="12">12%</SelectItem>
                <SelectItem value="18">18%</SelectItem>
                <SelectItem value="28">28%</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={calculateGST}>Calculate GST</Button>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {gstAmount !== null && (
            <div className="mt-4 space-y-2">
              <p>GST Amount: {formatCurrency(gstAmount)}</p>
              <p>Final Price (Inclusive of GST): {formatCurrency(finalPrice!)}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
