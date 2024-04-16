import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { deleteCompany } from '@/lib/companies/actions';
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
        <span className="sr-only">Update</span>
        <Icons.pencil className="w-5" />
      </Button>
    </Link>
  );
}

export function DeleteCompany({ id }: { id: string }) {
  const removeCompany = deleteCompany.bind(null, id);
  return (
    <form action={removeCompany}>
      <Button className="hover:bg-gray-100 hover:text-gray-900">
        <span className="sr-only">Delete</span>
        <Icons.trash className="w-5" />
      </Button>
    </form>
  );
}
