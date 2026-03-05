import { Link } from "react-router-dom";
import { footerLinks, socialLinks, contactEmail } from "../data/navigation";

function SocialIcon({ icon }) {
  const paths = {
    instagram: (
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
    ),
    facebook: (
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    ),
    tiktok: (
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    ),
    rappi: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.2 14.4c-.4.4-1 .6-1.6.6h-3.2c-.6 0-1.2-.2-1.6-.6-.4-.4-.6-1-.6-1.6V9.2c0-.6.2-1.2.6-1.6.4-.4 1-.6 1.6-.6h3.2c.6 0 1.2.2 1.6.6.4.4.6 1 .6 1.6v5.6c0 .6-.2 1.2-.6 1.6zM13.6 9.6h-3.2v4.8h3.2V9.6z" />
    ),
  };

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      {paths[icon]}
    </svg>
  );
}

export default function Footer() {
  const allLinks = [...footerLinks.nosotros, ...footerLinks.servicio];

  return (
    <footer className="bg-brown text-cream pb-28 lg:pb-0">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center gap-5">
          <img
            src="/images/logo-vertical.png"
            alt="El Piombino"
            className="h-20 w-auto brightness-0 invert"
          />

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {allLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-cream/60 hover:text-white text-xs uppercase tracking-wider transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${contactEmail}`}
              className="text-cream/60 hover:text-white text-xs uppercase tracking-wider transition-colors"
            >
              Contacto
            </a>
          </nav>

          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.icon}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={social.icon === "rappi" ? "opacity-50 hover:opacity-100 transition-opacity" : "text-cream/50 hover:text-white transition-colors"}
              >
                {social.icon === "rappi" ? (
                  <img src="/images/rappi-icon.png" alt="Rappi" className="w-6 h-6 brightness-0 invert" />
                ) : (
                  <SocialIcon icon={social.icon} />
                )}
              </a>
            ))}
          </div>

          <p className="text-cream/30 text-xs">
            &copy; {new Date().getFullYear()} El Piombino. Todos los derechos reservados.
          </p>
          <p className="text-cream/20 text-[10px]">
            Desarrollado por{" "}
            <a href="https://www.enigmasac.com" target="_blank" rel="noopener noreferrer" className="hover:text-cream/40 transition-colors underline">
              Enigma Developers
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
