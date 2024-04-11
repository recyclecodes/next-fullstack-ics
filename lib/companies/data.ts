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
      id: company.id,
      name: company.name,
      imageUrl: company.imageUrl || `https://avatar.vercel.sh/acme.png`,
      createdAt: company.createdAt,
    }));
  } catch (error) {
    console.log('[COMPANIES_GET]', error);
    throw new Error('Failed to fetch the latest companies.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredCompanies(query: string, currentPage: number) {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  
    try {
      const companies = await prismadb.company.findMany({
        where: {
          OR: [
            { name: { contains: query } },
          ],
        },
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
    try {
        const count = await prismadb.company.count({
            where: {
                OR: [
                    { name: { contains: query } },
                ]
            }
        });

        const totalPages = Math.ceil(count/ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.log('Database Error', error);
        throw new Error('Failed to fetch total number of companies.');
    }
  }