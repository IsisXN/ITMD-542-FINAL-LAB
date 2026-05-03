import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/photography", label: "Photography" },
  { href: "/projects", label: "Projects" },
  { href: "/booking", label: "Bookings" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#05070d]/85 backdrop-blur-md">
      <div className="page-shell flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-lg font-semibold tracking-[0.2em] text-[#bfd7ff] transition hover:text-white"
        >
          ISISXN
        </Link>

        <nav className="flex flex-wrap items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[#dbe8ff] transition hover:border-[#8fb9ff]/40 hover:bg-[#8fb9ff]/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}