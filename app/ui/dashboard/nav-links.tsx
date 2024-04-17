'use client';

import {
  HomeIcon,
  BuildingOffice2Icon,
  UsersIcon,
  ArchiveBoxXMarkIcon,
  DeviceTabletIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  {
    name: 'Companies',
    href: '/companies',
    icon: BuildingOffice2Icon,
  },
  { name: 'Users', href: '/users', icon: UsersIcon },
  { name: 'Items', href: '/items', icon: DeviceTabletIcon },
  { name: 'Archive', href: '/archive', icon: ArchiveBoxXMarkIcon },

];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-primary/10 hover:text-primary-background md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-primary/0 text-primary-background ': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
