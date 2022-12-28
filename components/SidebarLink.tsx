'use client'
import { Settings, User, Grid, Calendar, LogOut } from 'react-feather'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signout } from '@/lib/api'

const icons = {
  Settings,
  User,
  Grid,
  Calendar,
  LogOut,
}

export interface SidbarTypes {
  label: string
  icon: 'Settings' | 'Calendar' | 'Grid' | 'User' | 'LogOut'
  link: string
}

export default function SidebarLink({ link, icon }: SidbarTypes) {
  const pathname = usePathname()
  let isActive = false

  if (pathname === link) {
    isActive = true
  }

  if (pathname === '/signout') {
    signout()
  }

  const Icon = icons[icon]

  return (
    <Link href={link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600'
        )}
      />
    </Link>
  )
}
