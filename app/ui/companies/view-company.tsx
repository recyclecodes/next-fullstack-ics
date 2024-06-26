import { fetchFilteredCompanyWithUsers } from '@/lib/companies/data';
import Image from 'next/image';
import { DeleteCompany, UpdateCompany } from './buttons';
import { formatDateToLocal } from '@/lib/utils';

export default async function CompanyTable({
  companyId, 
  currentPage,
}: {
  companyId: string; 
  currentPage: number;
}) {
  const company = await fetchFilteredCompanyWithUsers(companyId, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <table className="hidden min-w-full text-gray-900 md:table">
          <thead className="rounded-lg text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Id
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                User
              </th>
              <th scope="col" className="relative py-3 pl-6 pr-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {company.users?.map((user) => (
              <tr
                key={user.id}
                className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-3 py-3">{user.id}</td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <Image
                      src={user.imageUrl ?? '/fallback/01.png'}
                      className="rounded-full"
                      width={28}
                      height={28}
                      alt={`${user.name}'s profile picture`}
                    />
                    <p>{user.name}</p>
                  </div>
                </td>
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex justify-end gap-3">
                    {/* Add action buttons here */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
