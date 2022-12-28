import Image from 'next/image'
import Card from './Card'
import logo from '@/assets/images/logo.png'
import SidebarLink, { SidbarTypes } from './SidebarLink'

const links: SidbarTypes[] = [
  {
    label: 'Home',
    icon: 'Grid',
    link: '/home',
  },
  {
    label: 'Calendar',
    icon: 'Calendar',
    link: '/calendar',
  },
  {
    label: 'Settings',
    icon: 'Settings',
    link: '/settings',
  },
]

export default function Sidebar() {
  return (
    <Card className="">
      <div>
        <Image src={logo} alt="Able logo" priority className="w-14" />
      </div>
      {links.map((link) => (
        <SidebarLink
          key={link.label}
          link={link.link}
          label={link.label}
          icon={link.icon}
        />
      ))}
    </Card>
  )
}
