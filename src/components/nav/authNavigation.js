import Link from 'next/link';
import Image from 'next/image';

const AuthNavigation = () => {
  return (
    <nav className="container fixed top-0 z-50 p-5">
      <Link href="/sign-in">
        <Image src="/logo.svg" alt="Logo" width={140} height={56} priority />
      </Link>
    </nav>
  );
};

export default AuthNavigation;
