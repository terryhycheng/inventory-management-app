import Link from 'next/link';

const NavBar = () => {
  return (
    <header className="border-b border-gray-300 p-4">
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/items">Items</Link>
      </nav>
    </header>
  );
};

export default NavBar;
