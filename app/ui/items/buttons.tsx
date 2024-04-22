'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { deleteItem } from '@/lib/items/actions';
import Link from 'next/link';

export function CreateItem() {
  return (
    <Link href="/items/create">
      <Button className="flex">
        <div className="hidden md:block">Create Item</div>
        <Icons.plus className="h-5 md:ml-4" />
      </Button>
    </Link>
  );
}

export function UpdateItem({ id }: { id: string }) {
  return (
    <Link href={`/items/${id}/edit`}>
      <Button>
        <span className="sr-only">Update</span>
        <Icons.pencil className="w-5" />
      </Button>
    </Link>
  );
}

export function DeleteItem({ id }: { id: string }) {
  const { toast } = useToast();

  const removeItem = async () => {
    try {
      await deleteItem(id);
      toast({
        variant: 'default',
        description: `Successfully deleted item with ID ${id}`,
      });
    } catch (error) {
      console.error('An error occurred while deleting the item:', error);
      toast({
        variant: 'destructive',
        description: `Error deleting the item with ID ${id}`,
      });
    }
  };
  return (
    <form action={removeItem}>
      <Button>
        <span className="sr-only">Delete</span>
        <Icons.trash className="w-5" />
      </Button>
    </form>
  );
}
