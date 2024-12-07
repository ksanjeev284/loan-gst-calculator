import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './components/theme-provider'
import LoanEMIPage from './pages/loan-emi'
import GSTPage from './pages/gst'
import TaxPage from './pages/tax'
import LoanComparisonPage from './pages/loan-comparison'
import PrivacyPolicy from './pages/privacy-policy'
import Terms from './pages/terms'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="paisa-finance-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/loan-emi" replace />} />
            <Route path="/loan-emi" element={<LoanEMIPage />} />
            <Route path="/gst" element={<GSTPage />} />
            <Route path="/tax" element={<TaxPage />} />
            <Route path="/loan-comparison" element={<LoanComparisonPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}
