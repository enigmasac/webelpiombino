import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const slides = [
  { image: "/images/hero/hero-1.jpg", alt: "Pasteles artesanales de El Piombino" },
  { image: "/images/hero/hero-2.jpg", alt: "Pasta carbonara" },
  { image: "/images/hero/hero-3.jpg", alt: "Disfrutando un cafe en El Piombino" },
  { image: "/images/hero/hero-4.jpg", alt: "Desayuno con huevos y tostadas" },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section className="relative h-[85vh] lg:h-screen overflow-hidden bg-brown">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative w-full h-full overflow-hidden"
          >
            <img
              src={slides[current].image}
              alt={slides[current].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-brown from-5% via-brown/70 via-45% to-brown/25" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col items-center justify-end pb-24 lg:pb-32 px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-cream/70 mb-4"
        >
          Desde 1997
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl text-white max-w-3xl leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]"
        >
          Pasion por los sabores autenticos
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="font-body text-base md:text-lg text-cream/80 mt-6 max-w-xl font-light"
        >
          Pasteleria, cafeteria y restaurante en Lima. Tres locales para disfrutar.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <a
            href="#pide-aqui"
            className="bg-blue text-white font-body text-sm font-semibold uppercase tracking-wider px-8 py-3 rounded-full hover:bg-blue/90 transition-colors"
          >
            Pide Aqui
          </a>
          <a
            href="/carta"
            className="border border-cream/40 text-cream font-body text-sm font-semibold uppercase tracking-wider px-8 py-3 rounded-full hover:bg-cream/10 transition-colors"
          >
            Ver Carta
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir a slide ${idx + 1}`}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === current ? "w-8 bg-white" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
