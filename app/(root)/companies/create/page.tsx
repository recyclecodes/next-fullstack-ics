import Breadcrumbs from '@/app/ui/companies/breadcrumbs';
import CompanyForm from '@/app/ui/companies/create-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Companies', href: '/companies' },
          {
            label: 'Create Company',
            href: '/companies/create',
            active: true,
          },
        ]}
      />
      <CompanyForm />
    </main>
  );
}