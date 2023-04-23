import { PropsWithChildren } from 'react';
import NavBar from '../NavBar';
import Header from '../Header';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
