import { CompaniesTableSkeleton, SearchSkeleton } from '@/components/skeletons';

export default function loading() {
  return (
    <>
      <SearchSkeleton />
      <CompaniesTableSkeleton />
    </>
  );
}
