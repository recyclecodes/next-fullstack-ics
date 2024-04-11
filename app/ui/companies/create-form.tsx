'use client'

import { useRef } from 'react';
import { createCompany } from '@/lib/companies/actions';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  const initialState = {
    message: '',
    errors: { name: undefined, imageUrl: undefined },
  };
  const [state, dispatch] = useFormState(createCompany, initialState);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    dispatch(formData);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Company Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter company name"
            aria-describedby="name-error"
          />
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Company Image URL */}
        <div className="mb-4">
          <label htmlFor="image-url" className="mb-2 block text-sm font-medium">
            Image URL (Optional)
          </label>
          <input
            id="image-url"
            name="image-url"
            type="text"
            className="block w-full rounded-md border border-gray-200 py-2 pl-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Enter image URL"
          />
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/companies"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type='submit'>Create Company</Button>
      </div>
    </form>
  );
}
