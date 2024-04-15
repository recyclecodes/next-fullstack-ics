import Breadcrumbs from '@/app/ui/companies/breadcrumbs';
import { notFound } from 'next/navigation';
import { fetchCompanyById } from '@/lib/companies/data';
import EditCompanyForm from '@/app/ui/companies/edit-forms';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const company = await fetchCompanyById(id);

  if (!company) {
    notFound();
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
