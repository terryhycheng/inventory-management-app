import Link from 'next/link';

import {
  HiOutlineHome,
  HiOutlineRectangleStack,
  HiOutlineQueueList,
} from 'react-icons/hi2';
import { AiFillGithub } from 'react-icons/ai';

const NavBar = () => {
  return (
    <div className="flex w-[180px] flex-col justify-between border-gray-300 bg-main pt-10">
      <nav className="flex flex-col gap-4 text-white">
        <Link href="/" className="flex flex-col items-center gap-1 pb-4">
          <HiOutlineHome className="h-8 w-8" />
          <p>Dashboard</p>
        </Link>
        <Link href="/items" className="flex flex-col items-center gap-1 pb-4">
          <HiOutlineRectangleStack className="h-8 w-8" />
          <p>Items</p>
        </Link>
        <Link href="/records" className="flex flex-col items-center gap-1 pb-4">
          <HiOutlineQueueList className="h-8 w-8" />
          <p>Records</p>
        </Link>
      </nav>
      <div className="flex flex-col items-center justify-center  gap-2 bg-[#47494B] px-6 py-4 text-center text-white">
        <AiFillGithub className="h-8 w-8" />
        <div>
          <p className="text-[0.5rem] uppercase tracking-[0.1rem]">
            designed & built by
          </p>
          <p className="text-sm font-bold capitalize tracking-[0.08rem]">
            terryhycheng
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
