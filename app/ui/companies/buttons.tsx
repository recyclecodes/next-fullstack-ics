'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
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
      <Button>
        <span className="sr-only">Update</span>
        <Icons.pencil className="w-5" />
      </Button>
    </Link>
  );
}

export function DeleteCompany({ id }: { id: string }) {
  const { toast } = useToast();

  const removeCompany = async () => {
    try {
      await deleteCompany(id);
      toast({
        variant: 'default',
        description: `Successfully deleted company with ID ${id}`,
      });
    } catch (error) {
      console.error('An error occurred while deleting the company:', error);
      toast({
        variant: 'destructive',
        description: `Error deleting the company with ID ${id}`,
      });
    }
  };
  return (
    <form action={removeCompany}>
      <Button>
        <span className="sr-only">Delete</span>
        <Icons.trash className="w-5" />
      </Button>
    </form>
  );
}
