import Breadcrumbs from '@/components/breadcrumbs';
// import { notFound } from 'next/navigation';
import { fetchCompanyById } from '@/lib/companies/data';
import EditCompanyForm from '@/app/ui/companies/edit-forms';
// import NotFound from './not-found';
import { Metadata } from 'next';
import { fetchCompanies, fetchUserById } from '@/lib/users/data';
import UpdateUserForm from '@/app/ui/users/edit-form';

export const metadata: Metadata = {
  title: 'Edit User',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
//   const company = await fetchCompanyById(id);
  const [companies, user] = await Promise.all([
      fetchCompanies(),
      fetchUserById(id),
  ]);

  //   if (!company) {
  //     <NotFound/>
  //   }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/users' },
          {
            label: 'Edit User',
            href: `/users/${id}/edit`,
            active: true,
          },
        ]}
      />
      <UpdateUserForm companies={companies} user={user} />
    </main>
  );
}
