import Nav from '@/components/nav/nav.js';

export default function AuthLayout({ children }) {
  return (
    <>
      <Nav />
      <main className="container mx-auto">
        <div className="flex items-center justify-center min-h-screen">{children}</div>
      </main>
    </>
  );
}
