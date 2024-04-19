// import { CreateCompany } from '@/app/ui/companies/buttons';
// import CompaniesTable from '@/app/ui/companies/table';
// import CompanyTable from '@/app/ui/companies/view-company';
// import Search from '@/app/ui/search';
// import { inter } from '@/components/fonts';
// import Pagination from '@/components/pagination';
// import { CompaniesTableSkeleton } from '@/components/skeletons';
// import { fetchCompanyById, fetchCompanyPagesWithUsers } from '@/lib/companies/data';
// import { Metadata } from 'next';
// import { Suspense } from 'react';

// export const metadata: Metadata = {
//   title: 'ICS | Companies',
// };

// export default async function Page({
//   params,
//   searchParams,
// }: {
//   params: {
//     id: string;
//   };
//   searchParams?: {
//     query?: string;
//     page?: string;
//   };
// }) {
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;

//   const id = params.id;
//   const totalPages = await fetchCompanyPagesWithUsers(query);

//   const company = await fetchCompanyById(id);

//   return (
//     <div className="w-full">
//       <div className="flex w-full items-center justify-between">
//         <h1 className={`${inter.className} text-base`}>Companies</h1>
//       </div>
//       <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
//         <Search placeholder="Search Companies..." />
//         <CreateCompany />
//       </div>
//       <Suspense key={query + currentPage} fallback={<CompaniesTableSkeleton />}>
//         <CompanyTable
//           companyId={company}
//           query={query}
//           currentPage={currentPage}
//         />
//       </Suspense>
//       <div className="mt-5 flex w-full justify-center">
//         <Pagination totalPages={totalPages} />
//       </div>
//     </div>
//   );
// }
