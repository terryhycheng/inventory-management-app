import Image from 'next/image';
import UserBadge from './UserBadge';
import { FiLogOut } from 'react-icons/fi';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();

  const getPageName = (): string => {
    const page = router.pathname.split('/')[1];
    switch (page) {
      case '':
        return 'dashboard';
      case 'records':
        return 'records';
      case 'items':
        return 'items';
      default:
        return 'not found';
    }
  };

  return (
    <div className="shadow-l4 flex min-h-[100px] items-center justify-between bg-white p-6 px-8">
      <div className="flex gap-6">
        <Image src="/logo.png" width={120} height={150} alt="morrisons logo" />
        <div className="flex flex-col justify-center">
          <h1 className="font-semibold">Inventory Management System</h1>
          <h2 className="text-3xl font-bold capitalize">{getPageName()}</h2>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <UserBadge />
        <div className="cursor-pointer rounded-full border p-3">
          <FiLogOut className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Header;
