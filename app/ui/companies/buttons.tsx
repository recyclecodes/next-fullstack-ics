import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CreateCompany() {
  return (
    <Link href="/companies/create">
      <Button className="flex">
        <div className="hidden md:block">Create Company</div>
        <Icons.plus className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}

export function UpdateCompany({ id }: { id: string }) {
  return (
    <Link href={`/companies/${id}/edit`}>
      <Button className="hover:bg-gray-100 hover:text-gray-900">
        <Icons.pencil className="w-5" />
      </Button>
    </Link>
  );
}

// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);

//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4" />
//       </button>
//     </form>
//   );
// }
