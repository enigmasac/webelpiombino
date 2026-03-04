import { motion } from "motion/react";
import { locations } from "../data/locations";
import LocationCard from "../components/LocationCard";

export default function Locales() {
  return (
    <>
      <section className="bg-brown pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-cream/50"
          >
            Encuentranos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Nuestros Locales
          </motion.h1>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-brown/80 text-lg text-center leading-relaxed mb-14 max-w-2xl mx-auto font-light">
            Tres sedes en Lima para que siempre tengas un Piombino cerca.
            Cada local mantiene el mismo ambiente acogedor y la calidad que nos caracteriza.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc, idx) => (
              <motion.div
                key={loc.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.15 }}
              >
                <LocationCard location={loc} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
