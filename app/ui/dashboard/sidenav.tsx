import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';

import CompanyLogo from '@/components/company-logo';
import { UserButton, currentUser } from '@clerk/nextjs';

export default async function SideNav() {
  const user = await currentUser();
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-primary p-4 md:h-40"
        href="/"
      >
        <div className="w-40 text-white md:w-40">
          <CompanyLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <div className='flex items-center'>
          <UserButton /> <div className="md:block hidden ml-4">{user?.firstName}</div>
        </div>
      </div>
    </div>
  );
}
