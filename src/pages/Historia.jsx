import { useRef } from "react";
import { motion, useInView } from "motion/react";

const timeline = [
  {
    year: "1997",
    title: "El inicio",
    description:
      "Abrimos nuestras puertas por primera vez en San Miguel, con la vision de crear un espacio donde los sabores italianos se fusionaran con la tradicion peruana.",
  },
  {
    year: "2005",
    title: "Crecimiento",
    description:
      "La acogida de nuestros clientes nos impulso a expandir nuestra carta, incorporando pasteles artesanales y platos de fondo que se convirtieron en referentes.",
  },
  {
    year: "2012",
    title: "Segunda sede",
    description:
      "Llegamos a Surco con un nuevo local mas amplio, manteniendo la calidez y la calidad que nos caracteriza.",
  },
  {
    year: "2019",
    title: "San Isidro",
    description:
      "Abrimos nuestra tercera sede en el corazon empresarial de Lima, ofreciendo desayunos ejecutivos y pasteleria fina.",
  },
  {
    year: "Hoy",
    title: "Tradicion que continua",
    description:
      "Con mas de 25 anos de trayectoria, seguimos comprometidos con ofrecer productos de la mas alta calidad, hechos con pasion y recetas que se han perfeccionado con el tiempo.",
  },
];

const values = [
  {
    title: "Calidad",
    description: "Ingredientes seleccionados y recetas perfeccionadas durante mas de 25 anos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Tradicion",
    description: "Recetas inspiradas en la pasteleria italiana y la gastronomia peruana.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Calidez",
    description: "Un ambiente familiar donde cada cliente se siente como en casa.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative pl-12 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 w-8 h-8 bg-blue rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
      <div className="absolute left-[15px] top-8 bottom-0 w-px bg-line last:hidden" />
      <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-blue">
        {item.year}
      </span>
      <h3 className="font-heading text-xl text-brown mt-1 mb-2">{item.title}</h3>
      <p className="text-brown/70 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export default function Historia() {
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
            Sobre nosotros
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Nuestra Historia
          </motion.h1>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-brown/80 text-lg text-center leading-relaxed mb-16 font-light">
            El Piombino nacio de un sueno familiar: crear un lugar donde la pasteleria artesanal y la cocina casera se encuentren. Desde aquella primera sede en San Miguel, hemos crecido manteniendo lo que nos hace unicos — el amor por lo que hacemos.
          </p>
          <div>
            {timeline.map((item, idx) => (
              <TimelineItem key={item.year} item={item} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl text-brown text-center mb-14">
            Nuestros valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue/10 text-blue rounded-2xl mb-5">
                  {value.icon}
                </div>
                <h3 className="font-heading text-xl text-brown mb-3">{value.title}</h3>
                <p className="text-brown/70 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
