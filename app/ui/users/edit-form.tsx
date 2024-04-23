'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserForms, userSchema } from '@/lib/zod';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/image-upload';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import LoadingButton from '@/components/LoadingButton';
import { Company } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { updateUser } from '@/lib/users/actions';

export default function UpdateUserForm({
    user,
    companies,
  }: {
    user: UserForms;
    companies: Company[];
  }) {
    const form = useForm<UserForms>({
      resolver: zodResolver(userSchema),
      defaultValues: user,
    });
  
    const {
      handleSubmit,
      formState: { isSubmitting },
    } = form;
  
    const { toast } = useToast();
  
    const updateUserWithId = updateUser.bind(null, user?.id);
  
    async function onSubmit(values: UserForms) {
      const formData = new FormData();
  
      // Append each field to the FormData object
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      try {
        await updateUserWithId(formData); // Pass formData to updateUserWithId
        toast({
          variant: 'default',
          description: 'Successfully updated user',
        });
      } catch (error) {
        console.error('An error occurred:', error);
        toast({
          variant: 'destructive',
          description: 'Error updating the user',
        });
      }
    }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>User Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Choose Company</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a company"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Company</SelectLabel>
                          {companies.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Fullname"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-6 flex justify-end gap-4">
              <Link
                href="/users"
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Cancel
              </Link>
              <LoadingButton type="submit" loading={isSubmitting}>
                Submit
              </LoadingButton>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
