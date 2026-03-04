import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { locations } from "../data/locations";

export default function OrderCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pide-aqui" className="bg-blue py-20 lg:py-28">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
            Pedidos online
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mt-3">
            Pide desde tu local favorito
          </h2>
          <p className="font-body text-cream/70 mt-4 max-w-lg mx-auto font-light">
            Selecciona el local mas cercano y realiza tu pedido online para recoger o delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, idx) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.15 }}
              className="bg-cream/10 backdrop-blur-sm rounded-2xl p-8 text-center border border-cream/10 hover:border-cream/20 transition-colors"
            >
              <h3 className="font-heading text-xl text-white mb-2">{loc.name}</h3>
              <p className="text-cream/60 text-sm mb-6">{loc.address}</p>
              <a
                href={loc.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-blue font-body text-sm font-semibold uppercase tracking-wider px-8 py-3 rounded-full hover:bg-cream transition-colors"
              >
                Pedir ahora
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
