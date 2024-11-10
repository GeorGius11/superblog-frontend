import Link from "next/link";
import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  const linkStyle = (path: string) => {
    return router.pathname === path
      ? "text-yellow-300"
      : "hover:text-yellow-300";
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">Super Blog</Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link href="/posts/manage" className={linkStyle("/posts/manage")}>
            Manage Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
