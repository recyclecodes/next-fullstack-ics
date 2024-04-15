'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CompanyForms, companySchema } from '@/lib/zod';

import { createCompany } from '@/lib/companies/actions';
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

export default function CompanyForm() {
  const form = useForm<CompanyForms>({ resolver: zodResolver(companySchema) });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const { toast } = useToast();

  async function onSubmit(values: CompanyForms) {
    console.log('Submitting form with values:', values);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await createCompany(formData);
    } catch (error) {
      console.error('An error occurred:', error);
      toast({
        variant: 'destructive',
        description: 'Error creating the company',
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company logo</FormLabel>
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company name"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/companies"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
}

// 'use client';

// import { useRef } from 'react';
// import { createCompany } from '@/lib/companies/actions';
// import { useFormState } from 'react-dom';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import ImageUpload from '@/components/image-upload';

// export default function CompanyForm() {
//   const formRef = useRef<HTMLFormElement>(null);

//   const initialState = {
//     message: '',
//     errors: { name: undefined, imageUrl: undefined },
//   };
//   const [state, dispatch] = useFormState(createCompany, initialState);

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     dispatch(formData);
//     formRef.current?.reset();
//   }

//   return (
//     <form ref={formRef} onSubmit={handleSubmit}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <div className="mb-4">
//           <label htmlFor="name" className="mb-2 block text-sm font-medium">
//             Company Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
//             placeholder="Enter company name"
//             aria-describedby="name-error"
//           />
//           <div id="name-error" aria-live="polite" aria-atomic="true">
//             {state.errors?.name &&
//               state.errors.name.map((error: string) => (
//                 <p className="mt-2 text-sm text-red-500" key={error}>
//                   {error}
//                 </p>
//               ))}
//           </div>
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="image-upload"
//             className="mb-2 block text-sm font-medium"
//           >
//             Image Upload (Optional)
//           </label>
//           <ImageUpload
//             disabled={false}
//             onChange={(value: string) => {
//               const input = document.getElementById(
//                 'image-url'
//               ) as HTMLInputElement;
//               input.value = value;
//             }}
//             onRemove={() => {
//               const input = document.getElementById(
//                 'image-url'
//               ) as HTMLInputElement;
//               input.value = '';
//             }}
//             value={[]}
//           />
//         </div>

//         <div aria-live="polite" aria-atomic="true">
//           {state.message ? (
//             <p className="mt-2 text-sm text-red-500">{state.message}</p>
//           ) : null}
//         </div>
//       </div>
//       <div className="mt-6 flex justify-end gap-4">
//         <Link
//           href="/dashboard/companies"
//           className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//         >
//           Cancel
//         </Link>
//         <Button type="submit">Create Company</Button>
//       </div>
//     </form>
//   );
// }
