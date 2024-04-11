'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prismadb from '../prismadb';

const FormSchema = z.object({
  id: z.string(),
  name: z.string({
    required_error: 'Company name is required',
    invalid_type_error: 'Company name must be a string',
  }),
  imageUrl: z.string().optional(),
});

type State = {
  errors?: {
    name?: string[] | undefined;
    imageUrl?: string[] | undefined;
  };
  message?: string | null;
};

const CreateCompany = FormSchema.omit({ id: true });

export async function createCompany(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = CreateCompany.safeParse({
    name: formData.get('name'),
    imageUrl: formData.get('image-url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Company.',
    };
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    console.log('Creating company with name:', name, 'and imageUrl:', imageUrl);
    await prismadb.company.create({
      data: {
        name,
        imageUrl,
      },
    });
    console.log('Company created successfully');
  } catch (error) {
    console.error('Error creating company:', error);
    return {
      message: 'Database Error: Failed to Create Company.',
    };
  }
  // Revalidate the cache for the companies page
  revalidatePath('/companies');
  // Redirect the user to the companies page
  redirect('/companies');
}
