import '@/styles/globals.css'
import clsx from 'clsx'
import { Inter } from '@next/font/google'
import GlassPane from '@/components/GlassPane'
import Sidebar from '@/components/Sidebar'
import { LogOut } from 'react-feather'
import { signout } from '@/lib/api'

const inter = Inter({
  variable: '--font-inter',
})

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(inter.variable, 'dark')}>
      <head />

      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          <Sidebar />
          <main className="w-full pl-6 h-full">{children}</main>
        </GlassPane>
      </body>
    </html>
  )
}
