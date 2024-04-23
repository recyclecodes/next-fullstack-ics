'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { userSchema } from '../zod';

type State = {
  errors?: {
    companyId?: string[] | undefined;
    email?: string[] | undefined;
    name?: string[] | undefined;
    imageUrl?: string[] | undefined;
  };
  message?: string | null;
};

export async function createUser(formData: FormData): Promise<State> {
  console.log('Received form data:', formData);

  const validatedFields = userSchema.safeParse({
    companyId: formData.get('companyId'),
    email: formData.get('email'),
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { companyId, email, name, imageUrl } = validatedFields.data;

  try {
    console.log(
      'Creating user with companyId:',
      companyId,
      'email:',
      email,
      'name:',
      name,
      'and imageUrl:',
      imageUrl
    );
    await prismadb.user.create({
      data: {
        companyId,
        email,
        name,
        imageUrl,
      },
    });
    console.log('User created successfully');
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  revalidatePath('/users');

  redirect('/users');
}

export async function updateUser(
  id: string | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = userSchema.safeParse({
    companyId: formData.get('companyId'),
    email: formData.get('email'),
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { companyId, email, name, imageUrl } = validatedFields.data;

  try {
    console.log('Updating company with name:', name, 'and imageUrl:', imageUrl);
    await prismadb.user.update({
      where: {
        id,
      },
      data: {
        companyId,
        email,
        name,
        imageUrl,
      },
    });

    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      message: 'Database Error: Failed to Update User.',
    };
  }

  revalidatePath('/users');

  redirect('/users');
}

export async function deleteUser(id: string | undefined) {
  try {
    await prismadb.user.update({ where: { id }, data: { deleted: true } });
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
  revalidatePath('/users');
}

export async function restoreUser(id: string | undefined) {
  try {
    await prismadb.user.update({
      where: { id },
      data: { deleted: false },
    });
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to restore user.' };
  }
  revalidatePath('/archive');
}

