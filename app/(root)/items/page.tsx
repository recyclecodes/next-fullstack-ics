import { CreateItem } from '@/app/ui/items/buttons';
import ItemsTable from '@/app/ui/items/table';
import Search from '@/app/ui/search';
// import { CreateUser } from '@/app/ui/users/buttons';
// import UsersTable from '@/app/ui/users/table';
import { inter } from '@/components/fonts';
import Pagination from '@/components/pagination';
import { fetchItemPages } from '@/lib/items/data';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'ICS | Items',
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

  const totalPages = await fetchItemPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-base`}>Items</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Items..." />
        <CreateItem />
      </div>
      <Suspense key={query + currentPage} fallback={''}>
        <ItemsTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
