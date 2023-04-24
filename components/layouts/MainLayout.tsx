import { PropsWithChildren } from 'react';
import NavBar from '../NavBar';
import Header from '../Header';
import ItemTopBar from '../ItemTopBar';
import { useRouter } from 'next/router';

const MainLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pageName = router.pathname.split('/')[1];
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <NavBar />
        <div className="flex w-full flex-col">
          {pageName === 'items' && <ItemTopBar />}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
