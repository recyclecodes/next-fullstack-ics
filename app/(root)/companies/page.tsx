import { CreateCompany } from '@/app/ui/companies/buttons';
import Table from '@/app/ui/companies/table';
import Search from '@/app/ui/search';
import { lusitana } from '@/components/fonts';
import Pagination from '@/components/pagination';
import { CompaniesTableSkeleton } from '@/components/skeletons';
import { fetchCompanyPages } from '@/lib/companies/data';
import { Suspense } from 'react';

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

  const totalPages = await fetchCompanyPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Companies</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Companies..." />
        <CreateCompany />
      </div>
      <Suspense key={query + currentPage} fallback={<CompaniesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
