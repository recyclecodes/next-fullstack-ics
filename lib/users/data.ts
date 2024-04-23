import { unstable_noStore as noStore } from 'next/cache';
import prismadb from '@/lib/prismadb';
import { Company } from '@prisma/client';
import { CompanyForms } from '../zod';
import { string } from 'zod';

export async function fetchLatestUsers() {
  noStore();
  try {
    const users = await prismadb.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return users.map((user) => ({
      ...user,
    }));
  } catch (error) {
    console.log('[USERS_GET]', error);
    throw new Error('Failed to fetch the latest users.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredUsers(query: string, currentPage: number) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const users = await prismadb.user.findMany({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return users;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchUserPages(query: string): Promise<number> {
  noStore();
  try {
    const count = await prismadb.user.count({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error('Failed to fetch total number of users.');
  }
}

export async function fetchUserById(id: string) {
  try {
    const user = await prismadb.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error('User not found.');
    }

    return {
      id: user.id,
      companyId: user.companyId,
      name: user.name || '',
      email: user.email,
      imageUrl: user.imageUrl || `https://avatar.vercel.sh/acme.png`,
      createdAt: user.createdAt,
    };
  } catch (error) {
    console.error('[COMPANY_GET_BY_ID]', error);
    throw new Error('Failed to fetch the user by ID.');
  }
}

export async function fetchCompanies(): Promise<Company[]> {
  try {
    const companies = await prismadb.company.findMany({
      where: {
        deleted: false,
      },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        deleted: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return companies;
  } catch (error) {
    console.error('[COMPANIES_GET]', error);
    throw new Error('Failed to fetch the companies.');
  }
}

// export async function fetchArchivedCompanies(
//   query: string,
//   currentPage: number
// ) {
//   noStore();
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const users = await prismadb.user.findMany({
//       where: { deleted: true, OR: [{ name: { contains: query } }] },
//       orderBy: { createdAt: 'desc' },
//       take: ITEMS_PER_PAGE,
//       skip: offset,
//     });

//     return users;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch users.');
//   }
// }

// export async function fetchArchivedCompanyPages(query: string): Promise<number> {
//   noStore();
//   try {
//     const count = await prismadb.user.count({
//       where: { deleted: true, OR: [{ name: { contains: query } }] },
//     });

//     const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.log('Database Error', error);
//     throw new Error('Failed to fetch total number of users.');
//   }
// }
