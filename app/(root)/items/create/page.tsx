import Breadcrumbs from '@/components/breadcrumbs';
import CreateItemForm from '@/app/ui/items/create-form';


export default async function Page() {
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Items', href: '/items' },
          {
            label: 'Create Item',
            href: '/items/create',
            active: true,
          },
        ]}
      />
      <CreateItemForm/>
    </main>
  );
}
