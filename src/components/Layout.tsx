import React from 'react';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';
import { ThemeToggle } from './ThemeToggle';
import { Calculator } from 'lucide-react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export function Layout({ children, showBackButton = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#151821]">
      <header className="border-b dark:border-[#2a3142] sticky top-0 bg-white dark:bg-[#1a1f2e] z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Calculator className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                PaisaFinance
              </span>
            </Link>
            {showBackButton && (
              <Link
                to="/"
                className="inline-flex items-center px-3 py-1.5 text-sm border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-md dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-[#2a3142] transition-colors"
              >
                ← Back
              </Link>
            )}
          </div>
          <ThemeToggle />
        </div>
        {!showBackButton && (
          <div className="container mx-auto px-4">
            <Navigation />
          </div>
        )}
      </header>

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
