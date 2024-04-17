import Breadcrumbs from '@/components/breadcrumbs';
// import { notFound } from 'next/navigation';
import { fetchCompanyById } from '@/lib/companies/data';
import EditCompanyForm from '@/app/ui/companies/edit-forms';
import NotFound from './not-found';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Company',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = await fetchCompanyById(id);

  if (!company) {
    <NotFound/>
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/companies' },
          {
            label: 'Edit Company',
            href: `/companies/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditCompanyForm company={company} />
    </main>
  );
}
