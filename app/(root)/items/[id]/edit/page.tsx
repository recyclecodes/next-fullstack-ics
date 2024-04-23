import Breadcrumbs from '@/components/breadcrumbs';
// import { notFound } from 'next/navigation';
import { fetchCompanyById } from '@/lib/companies/data';
import EditCompanyForm from '@/app/ui/companies/edit-forms';
// import NotFound from './not-found';
import { Metadata } from 'next';
import { fetchItemById } from '@/lib/items/data';
import UpdateItemForm from '@/app/ui/items/edit-form';

export const metadata: Metadata = {
  title: 'Edit Company',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const item = await fetchItemById(id);

//   if (!company) {
//     <NotFound/>
//   }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Items', href: '/items' },
          {
            label: 'Edit Item',
            href: `/items/${id}/edit`,
            active: true,
          },
        ]}
      />
      <UpdateItemForm item={item} />
    </main>
  );
}




// Type '{ id: string; name: string; description: string | null; price: number | null; quantity: number | null; imageUrl: string; createdAt: Date; }' is not assignable to type '{ name: string; price: number; quantity: number; imageUrl: string; id?: string | undefined; description?: string | undefined; }'.
//   Types of property 'price' are incompatible.
//     Type 'number | null' is not assignable to type 'number'.
//       Type 'null' is not assignable to type 'number'.ts(2322)
// edit-form.tsx(23, 52): The expected type comes from property 'item' which is declared here on type 'IntrinsicAttributes & { item: { name: string; price: number; quantity: number; imageUrl: string; id?: string | undefined; description?: string | undefined; }; }'
// (property) item: {
//     name: string;
//     price: number;
//     quantity: number;
//     imageUrl: string;
//     id?: string | undefined;
//     description?: string | undefined;
// }
