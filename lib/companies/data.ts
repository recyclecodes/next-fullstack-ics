import { unstable_noStore as noStore } from 'next/cache';
import prismadb from '@/lib/prismadb';

export async function fetchLatestCompanies() {
  noStore();
  try {
    const companies = await prismadb.company.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return companies.map((company) => ({
      ...company,
    }));
  } catch (error) {
    console.log('[COMPANIES_GET]', error);
    throw new Error('Failed to fetch the latest companies.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCompanies(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companies = await prismadb.company.findMany({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchCompanyPages(query: string): Promise<number> {
  noStore();
  try {
    const count = await prismadb.company.count({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error('Failed to fetch total number of companies.');
  }
}

export async function fetchArchivedCompanies(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companies = await prismadb.company.findMany({
      where: { deleted: true, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchArchivedCompanyPages(
  query: string
): Promise<number> {
  noStore();
  try {
    const count = await prismadb.company.count({
      where: { deleted: true, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error('Failed to fetch total number of companies.');
  }
}

export async function fetchFilteredArchiveCompanies(
  query: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companies = await prismadb.company.findMany({
      where: { deleted: true, OR: [{ name: { contains: query } }] },
      orderBy: { createdAt: 'desc' },
      take: ITEMS_PER_PAGE,
      skip: offset,
    });

    return companies;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch companies.');
  }
}

export async function fetchCompanyById(id: string) {
  try {
    const company = await prismadb.company.findUnique({
      where: { id: id },
    });

    if (!company) {
      throw new Error('Company not found.');
    }

    return {
      id: company.id,
      name: company.name,
      imageUrl: company.imageUrl || `https://avatar.vercel.sh/acme.png`,
      createdAt: company.createdAt,
    };
  } catch (error) {
    console.error('[COMPANY_GET_BY_ID]', error);
    throw new Error('Failed to fetch the company by ID.');
  }
}

export async function fetchCompaniesWithUsers(id: string) {
  try {
    const companyUsers = await prismadb.company.findUnique({
      where: {
        id: id,
      },
      include: { users: true },
    });

    return companyUsers;
  } catch (error) {
    console.log('[COMPANY_WITH_USERS', error);
    throw new Error('Failed to fetch company with users.');
  }
}

export async function fetchFilteredCompanyWithUsers(
  query: string,
  currentPage: number
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const company = await prismadb.company.findFirst({
      where: {
        deleted: false,
        name: { contains: query },
      },
      orderBy: { createdAt: 'desc' },
      skip: offset,
    });

    if (!company) {
      throw new Error(`Company matching query '${query}' not found.`);
    }

    const users = await prismadb.user.findMany({
      where: { companyId: company.id },
    });

    return { ...company, users };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch company with users.');
  }
}

export async function fetchCompanyPagesWithUsers(
  query: string
): Promise<number> {
  noStore();
  try {
    const count = await prismadb.user.count({
      where: { deleted: false, OR: [{ name: { contains: query } }] },
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.log('Database Error', error);
    throw new Error('Failed to fetch total number of companies.');
  }
}
