'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { companySchema } from '../zod';

type State = {
  errors?: {
    name?: string[] | undefined;
    imageUrl?: string[] | undefined;
  };
  message?: string | null;
};

export async function createCompany(formData: FormData): Promise<State> {
  console.log('Received form data:', formData);

  const validatedFields = companySchema.safeParse({
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl'),
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

  revalidatePath('/companies');

  redirect('/companies');
}

export async function updateCompany(
  id: string | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = companySchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Company.',
    };
  }

  const { name, imageUrl } = validatedFields.data;

  try {
    console.log('Updating company with name:', name, 'and imageUrl:', imageUrl);
    await prismadb.company.update({
      where: { id },
      data: {
        name,
        imageUrl,
      },
    });

    console.log('Company updated successfully');
  } catch (error) {
    console.error('Error updating company:', error);
    return {
      message: 'Database Error: Failed to Update Company.',
    };
  }

  revalidatePath('/companies');

  redirect('/companies');
}

export async function deleteCompany(id: string | undefined) {
  try {
    await prismadb.company.delete({ where: { id } });
    revalidatePath('/companies');
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Company.' };
  }
}
