import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from 'geist/font/sans';
import { Toaster } from '@/components/ui/toaster';
import ProviderWrapper from '../components/ProviderWrapper';

export const metadata: Metadata = {
  title: 'Spenz - Manage Your Expenses Easily',
  description: 'Track spending, detect fraud, and keep tabs on rising subscription costs with spenz.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ProviderWrapper>
            {children}
            <Toaster />
          </ProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}

