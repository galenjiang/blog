import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "galen's bog ",
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
      <body className={clsx(inter.className, 'h-screen')}>
        {children}

        <footer className="text-center">
            <div>© { now }, Built with Nextjs</div>
            <div>备案号： <span className="text-gray-400">沪ICP备17047243号-1</span></div>
        </footer>
      </body>
    </html>
  )
}
