import ArchivedCompaniesTable from '@/app/ui/archived/company-table';
import ArchivedUsersTable from '@/app/ui/archived/user-table';
import Search from '@/app/ui/search';
import { inter } from '@/components/fonts';
import Pagination from '@/components/pagination';
import { CompaniesTableSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchArchivedCompanyPages } from '@/lib/companies/data';
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

  const totalPages = await fetchArchivedCompanyPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${inter.className} text-base`}>Archive</h1>
      </div>
      <Tabs defaultValue="company" className="w-full mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="company">Companies</TabsTrigger>
          <TabsTrigger value="user">Users</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search..." />
        </div>
        <TabsContent value="company">
          {/* <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your company here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card> */}
          <div className="w-full">
            <Suspense
              key={query + currentPage}
              fallback={<CompaniesTableSkeleton />}
            >
              <ArchivedCompaniesTable query={query} currentPage={currentPage} />
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="user">
        <div className="w-full">
            <Suspense
              key={query + currentPage}
              fallback={<CompaniesTableSkeleton />}
            >
              <ArchivedUsersTable query={query} currentPage={currentPage}/>
            </Suspense>
            <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
