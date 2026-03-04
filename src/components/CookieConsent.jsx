import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const STORAGE_KEY = "piombino_cookies_accepted";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-20 lg:bottom-6 left-4 right-4 lg:left-auto lg:right-6 lg:max-w-md z-50 bg-brown text-cream rounded-2xl p-5 shadow-2xl"
        >
          <p className="text-sm leading-relaxed mb-4">
            Usamos cookies para mejorar tu experiencia en nuestro sitio. Al continuar navegando, aceptas nuestro uso de cookies.
          </p>
          <div className="flex gap-3">
            <button
              onClick={accept}
              className="bg-blue text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-blue/90 transition-colors"
            >
              Aceptar
            </button>
            <button
              onClick={accept}
              className="text-cream/60 text-sm font-medium px-4 py-2 hover:text-cream transition-colors"
            >
              Cerrar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
