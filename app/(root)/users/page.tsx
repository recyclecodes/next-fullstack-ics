import Search from '@/app/ui/search';
import { CreateUser } from '@/app/ui/users/buttons';
import UsersTable from '@/app/ui/users/table';
import { inter } from '@/components/fonts';
import Pagination from '@/components/pagination';
// import { UsersTableSkeleton } from '@/components/skeletons';
import { fetchUserPages } from '@/lib/users/data';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'ICS | Users',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchUserPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-base`}>Users</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Users..." />
        <CreateUser />
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <UsersTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
