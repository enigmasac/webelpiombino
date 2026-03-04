import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { whatsappNumber } from "../data/navigation";
import { locations } from "../data/locations";

const menuItems = [
  {
    label: "Inicio",
    path: "/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    label: "Carta",
    path: "/carta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
  },
  {
    label: "Historia",
    path: "/historia",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Locales",
    path: "/locales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Contacto",
    path: "/contacto",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    label: "Trabaja con nosotros",
    path: "/trabaja-con-nosotros",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Proveedores",
    path: "/proveedores",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5a1 1 0 0 1-1 1h-2" />
        <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/51${whatsappNumber}`,
    isExternal: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

const tabs = [
  {
    label: "Menu",
    isMenu: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Carta",
    path: "/carta",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Pide Aqui",
    isCta: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Locales",
    path: "/locales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/51${whatsappNumber}`,
    isExternal: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
      </svg>
    ),
  },
];

function MenuCard({ item, onClick }) {
  const location = useLocation();
  const isActive = item.path && location.pathname === item.path;
  const cls = `flex flex-col items-center justify-center gap-2 py-5 rounded-2xl transition-all duration-200 active:scale-95 ${
    isActive ? "bg-blue/15 text-blue" : "bg-beige text-brown/70 hover:bg-beige/80"
  }`;

  if (item.isExternal) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        <span className="text-[#25D366]">{item.icon}</span>
        <span className="font-body text-xs font-medium">{item.label}</span>
      </a>
    );
  }

  return (
    <NavLink to={item.path} className={cls} onClick={onClick}>
      {item.icon}
      <span className="font-body text-xs font-medium text-center leading-tight px-1">{item.label}</span>
    </NavLink>
  );
}

function OrderPanel({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[60] bg-blue flex flex-col"
    >
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <h2 className="font-heading text-2xl text-white">Pide Aqui</h2>
        <button onClick={onClose} className="text-white/60 hover:text-white p-2">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="px-6 text-cream/60 text-sm mb-6">
        Selecciona tu local y realiza tu pedido online.
      </p>

      <div className="flex-1 px-6 space-y-4 overflow-y-auto pb-8">
        {locations.map((loc, idx) => (
          <motion.a
            key={loc.id}
            href={loc.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className="block bg-white rounded-2xl p-6 active:scale-[0.98] transition-transform"
          >
            <h3 className="font-heading text-xl text-blue mb-1">
              {loc.name}
            </h3>
            <p className="text-brown/60 text-sm mb-4">{loc.address}</p>
            <span className="inline-flex items-center gap-2 bg-blue text-white font-body text-sm font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full">
              Pedir ahora
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

export default function MobileBottomNav() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <AnimatePresence>
        {orderOpen && <OrderPanel onClose={() => setOrderOpen(false)} />}
      </AnimatePresence>

      <div
        className={`fixed inset-0 z-40 bg-brown/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`fixed inset-x-0 bottom-0 z-[45] lg:hidden transition-transform duration-300 ease-out ${menuOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="bg-cream border-t border-line rounded-t-3xl pb-24 pt-6 px-6">
          <div className="flex items-center justify-between mb-6">
            <img
              src="/images/logo.png"
              alt="El Piombino"
              className="h-8 w-auto"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-beige text-brown/60"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {menuItems.map((item) => (
              <MenuCard key={item.label} item={item} onClick={() => setMenuOpen(false)} />
            ))}
          </div>
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-md border-t border-line safe-area-pb">
        <div className="flex items-end justify-around px-2 pt-1 pb-2">
          {tabs.map((tab) =>
            tab.isCta ? (
              <button
                key={tab.label}
                onClick={() => setOrderOpen(true)}
                className="flex flex-col items-center -mt-5"
              >
                <span className="flex items-center justify-center w-14 h-14 bg-blue rounded-full text-white shadow-lg shadow-blue/30">
                  {tab.icon}
                </span>
                <span className="text-[10px] font-semibold text-blue mt-1 uppercase tracking-wide">
                  {tab.label}
                </span>
              </button>
            ) : tab.isMenu ? (
              <button
                key={tab.label}
                onClick={() => setMenuOpen(!menuOpen)}
                className={`flex flex-col items-center gap-0.5 py-1 min-w-[56px] transition-colors duration-200 ${
                  menuOpen ? "text-blue" : "text-brown/50"
                }`}
              >
                {menuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
                  </svg>
                ) : tab.icon}
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ) : tab.isExternal ? (
              <a
                key={tab.label}
                href={tab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-0.5 py-1 min-w-[56px] text-[#25D366]"
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.label}</span>
              </a>
            ) : (
              <NavLink
                key={tab.path}
                to={tab.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 py-1 min-w-[56px] ${
                    isActive ? "text-blue" : "text-brown/50"
                  }`
                }
              >
                {tab.icon}
                <span className="text-[10px] font-medium">{tab.label}</span>
              </NavLink>
            )
          )}
        </div>
      </nav>
    </>
  );
}
