'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import { itemSchema } from '../zod';

type State = {
  errors?: {
    name?: string[] | undefined;
    description?: string[] | undefined;
    price?: string[] | undefined;
    quantity?: string[] | undefined;
    imageUrl?: string[] | undefined;
  };
  message?: string | null;
};

export async function createItem(formData: FormData): Promise<State> {
  console.log('Received form data:', formData);

  const validatedFields = itemSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    imageUrl: formData.get('imageUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Item.',
    };
  }

  const { name, description, price, quantity, imageUrl } = validatedFields.data;

  try {
    console.log(
      'Creating item with:',
      name,
      'description:',
      description,
      'price:',
      price,
      'quantity',
      quantity,
      'and imageUrl:',
      imageUrl
    );
    await prismadb.item.create({
      data: {
        name,
        description,
        price,
        quantity,
        imageUrl,
      },
    });
    console.log('Item created successfully');
  } catch (error) {
    console.error('Error creating item:', error);
    return {
      message: 'Database Error: Failed to Create Item.',
    };
  }

  revalidatePath('/items');

  redirect('/items');
}

export async function updateItem(
  id: string | undefined,
  formData: FormData
): Promise<State> {
  const validatedFields = itemSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    price: formData.get('price'),
    quantity: formData.get('quantity'),
    imageUrl: formData.get('imageUrl'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Item.',
    };
  }

  const { name, description, price, quantity, imageUrl } = validatedFields.data;
  try {
    console.log(
      'Updating item with name:',
      name,
      'description:',
      description,
      'price:',
      price,
      'quantity',
      quantity,
      'and imageUrl:',
      imageUrl
    );
    await prismadb.item.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        quantity,
        imageUrl,
      },
    });

    console.log('Item updated successfully');
  } catch (error) {
    console.error('Error updating item:', error);
    return {
      message: 'Database Error: Failed to Update Item.',
    };
  }

  revalidatePath('/items');

  redirect('/items');
}

export async function deleteItem(id: string | undefined) {
  try {
    await prismadb.item.update({ where: { id }, data: { deleted: true } });
  } catch (error) {
    return { message: 'Database Error: Failed to Delete item.' };
  }
  revalidatePath('/items');
}

export async function restoreItem(id: string | undefined) {
  try {
    await prismadb.item.update({
      where: { id },
      data: { deleted: false },
    });
  } catch (error) {
    console.error(error);
    return { message: 'Database Error: Failed to restore item.' };
  }
  revalidatePath('/archive');
}

