import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { GeistSans } from 'geist/font/sans';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'spenz - Manage Your Expenses Easily',
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

