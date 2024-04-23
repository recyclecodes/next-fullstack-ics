import { unstable_noStore as noStore } from 'next/cache';
import prismadb from '@/lib/prismadb';

export async function fetchLatestItems() {
  noStore();
  try {
    const items = await prismadb.item.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return items.map((item) => ({
      ...item,
    }));
  } catch (error) {
    console.log('[ITEMS_GET]', error);
    throw new Error('Failed to fetch the latest items.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredItems(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prismadb.item.findMany({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return items;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items.');
  }
}

export async function fetchItemPages(query: string): Promise<number> {
  noStore();
  try {
    const count = await prismadb.item.count({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error('Failed to fetch total number of items.');
  }
}

export async function fetchArchivedItems(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prismadb.item.findMany({
      where: { deleted: true, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return items;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items.');
  }
}

export async function fetchArchivedItemPages(
  query: string
): Promise<number> {
  noStore();
  try {
    const count = await prismadb.item.count({
      where: { deleted: true, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error('Failed to fetch total number of items.');
  }
}

export async function fetchFilteredArchiveItems(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const items = await prismadb.item.findMany({
      where: { deleted: true, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return items;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items.');
  }
}

export async function fetchItemById(id: string) {
  try {
    const item = await prismadb.item.findUnique({
      where: { id: id },
    });

    if (!item) {
      throw new Error('Item not found.');
    }

    return {
      id: item.id,
      name: item.name,
      description: item.description || undefined,
      price: item.price || undefined,
      quantity: item.quantity || undefined,
      imageUrl: item.imageUrl || `https://avatar.vercel.sh/acme.png`,
      createdAt: item.createdAt,
    };
  } catch (error) {
    console.error('[COMPANY_GET_BY_ID]', error);
    throw new Error('Failed to fetch the item by ID.');
  }
}

// export async function fetchItemsWithUsers(id: string) {
//   try {
//     const itemUsers = await prismadb.item.findUnique({
//       where: {
//         id: id,
//       },
//       include: { users: true },
//     });

//     return itemUsers;
//   } catch (error) {
//     console.log('[COMPANY_WITH_USERS', error);
//     throw new Error('Failed to fetch item with users.');
//   }
// }

// export async function fetchFilteredCompanyWithUsers(
//   query: string,
//   currentPage: number
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const item = await prismadb.item.findFirst({
//       where: {
//         deleted: false,
//         name: { contains: query },
//       },
//       orderBy: { createdAt: 'desc' },
//       skip: offset,
//     });

//     if (!item) {
//       throw new Error(`Company matching query '${query}' not found.`);
//     }

//     const users = await prismadb.user.findMany({
//       where: { itemId: item.id },
//     });

//     return { ...item, users };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch item with users.');
//   }
// }

// export async function fetchCompanyPagesWithUsers(
//   query: string
// ): Promise<number> {
//   noStore();
//   try {
//     const count = await prismadb.user.count({
//       where: { deleted: false, OR: [{ name: { contains: query } }] },
//     });

//     const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.log('Database Error', error);
//     throw new Error('Failed to fetch total number of items.');
//   }
// }
