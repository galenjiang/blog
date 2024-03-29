import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx';
import dayjs from 'dayjs';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "galen's blog ",
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const now = dayjs().format('YYYY')
  return (
    <html lang="en">
      <body className={clsx(inter.className, 'min-h-screen font-sans antialiased absolute w-full pb-20')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <footer className="text-center w-full absolute bottom-4">
            <div>© {now}, Built with Nextjs</div>
            <div>备案号： <span className="text-gray-400">沪ICP备17047243号-1</span></div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
