import Link from 'next/link';

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <nav className="container mx-auto">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link href="/points" className="hover:underline">Pontos Turísticos</Link>
        </li>
        <li>
          <Link href="/admin" className="hover:underline">Admin</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
