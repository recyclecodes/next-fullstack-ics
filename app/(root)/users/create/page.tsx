import Breadcrumbs from '@/components/breadcrumbs';
import CreateUserForm from '@/app/ui/users/create-form';
import { fetchCompanies } from '@/lib/users/data';


export default async function Page() {
  const companies = await fetchCompanies();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Users', href: '/users' },
          {
            label: 'Create User',
            href: '/users/create',
            active: true,
          },
        ]}
      />
      <CreateUserForm companies={companies} />
    </main>
  );
}
