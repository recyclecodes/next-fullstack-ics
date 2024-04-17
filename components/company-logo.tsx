import { inter } from '@/components/fonts';
import { Icons } from '@/components/icons';


export default function CompanyLogo() {
  return (
    <div
      className={`${inter.className} flex flex-row items-center leading-none text-white`}
    >
    <Icons.apple  className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[30px]">Company</p>
    </div>
  );
}
