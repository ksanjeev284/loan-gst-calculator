import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Calculator, IndianRupee, Percent } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

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

  const gstRates = ['5', '12', '18', '28']

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-100 dark:border-[#2a3142] dark:bg-[#1e2536]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl text-indigo-600 dark:text-indigo-400">
            <Calculator className="h-6 w-6" />
            GST Calculator
          </CardTitle>
          <CardDescription className="dark:text-gray-400">Calculate GST amount and final price for your products</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <IndianRupee className="h-4 w-4 text-gray-500" />
                  Original Price
                </div>
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter original price"
                className="border-indigo-100 focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstRate" className="text-sm font-medium">
                <div className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-gray-500" />
                  GST Rate
                </div>
              </Label>
              <Select value={gstRate} onValueChange={setGSTRate}>
                <SelectTrigger className="border-indigo-100 focus:border-indigo-500">
                  <SelectValue placeholder="Select GST rate" />
                </SelectTrigger>
                <SelectContent>
                  {gstRates.map((rate) => (
                    <SelectItem key={rate} value={rate}>
                      {rate}%
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={calculateGST} 
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-1/3"
            >
              Calculate GST
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {gstAmount !== null && finalPrice !== null && (
            <div className="mt-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Original Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(parseFloat(price))}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">GST Amount</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(gstAmount)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-[#2a3142] dark:to-[#1e2536] dark:border-[#2a3142]">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-gray-600 dark:text-gray-400">Final Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {formatCurrency(finalPrice)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-[#1e2536] dark:border-[#2a3142]">
                <CardHeader>
                  <CardTitle className="text-lg dark:text-white">Price Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: 'Original Price', value: parseFloat(price) },
                        { name: 'GST Amount', value: gstAmount },
                        { name: 'Final Price', value: finalPrice }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Bar dataKey="value" fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
