import React, { useState } from 'react'
import './styles/globals.css'
import { LoanEMICalculator } from './components/LoanEMICalculator'
import { GSTCalculator } from './components/GSTCalculator'
import { LoanComparison } from './components/LoanComparison'
import { TaxCalculator } from './components/TaxCalculator'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="loan" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="loan">Loan EMI</TabsTrigger>
              <TabsTrigger value="gst">GST</TabsTrigger>
              <TabsTrigger value="comparison">Loan Comparison</TabsTrigger>
              <TabsTrigger value="tax">Tax Calculator</TabsTrigger>
            </TabsList>
            <TabsContent value="loan">
              <LoanEMICalculator />
            </TabsContent>
            <TabsContent value="gst">
              <GSTCalculator />
            </TabsContent>
            <TabsContent value="comparison">
              <LoanComparison />
            </TabsContent>
            <TabsContent value="tax">
              <TaxCalculator />
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </div>
  )
}

