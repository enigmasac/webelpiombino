import { Link, NavLink } from "react-router-dom";
import { useScrolled } from "../hooks/useScrolled";
import { navLinks } from "../data/navigation";

export default function Navbar() {
  const scrolled = useScrolled(32);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-cream transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 lg:h-24 flex items-center gap-10">
        <Link to="/" className="flex-shrink-0 lg:flex-shrink-0 mx-auto lg:mx-0">
          <img
            src="/images/logo.png"
            alt="El Piombino"
            className="h-12 lg:h-16 w-auto"
          />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `font-body text-sm font-medium uppercase tracking-widest transition-colors hover:text-blue ${
                    isActive ? "text-blue" : "text-brown"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href="#pide-aqui"
          className="hidden lg:inline-block ml-auto bg-blue text-white font-body text-sm font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full hover:bg-blue/90 transition-colors"
        >
          Pide Aqui
        </a>
      </nav>
    </header>
  );
}
