import Link from 'next/link';

const NavBar = () => {
  return (
    <div className="border-b border-gray-300 p-4">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/items">Items</Link>
      </div>
    </div>
  );
};

export default NavBar;
