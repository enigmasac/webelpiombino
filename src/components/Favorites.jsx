import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { favorites } from "../data/favorites";

function FavoriteCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-line mb-4">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <span className="font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-brown/50">
        {item.category}
      </span>
      <h3 className="font-heading text-lg text-brown mt-1">{item.name}</h3>
    </motion.div>
  );
}

export default function Favorites() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-body text-xs font-semibold uppercase tracking-[0.3em] text-brown/50">
            Nuestros favoritos
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-brown mt-3">
            Lo que nos hace especiales
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {favorites.map((item, idx) => (
            <FavoriteCard key={item.id} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
