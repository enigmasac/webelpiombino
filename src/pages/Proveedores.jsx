import { useState } from "react";
import { motion } from "motion/react";

const categories = [
  "Alimentos y bebidas",
  "Panaderia y pasteleria",
  "Lacteos y derivados",
  "Carnes y embutidos",
  "Frutas y verduras",
  "Envases y empaques",
  "Limpieza e higiene",
  "Equipos y maquinaria",
  "Servicios generales",
  "Otro",
];

export default function Proveedores() {
  const [form, setForm] = useState({
    company: "",
    ruc: "",
    contactName: "",
    email: "",
    phone: "",
    category: "",
    products: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ company: "", ruc: "", contactName: "", email: "", phone: "", category: "", products: "", message: "" });
      } else {
        const data = await res.json();
        setStatus(data.errors ? "validation" : "error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass = "w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors";
  const labelClass = "block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2";

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
            Trabaja con nosotros
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Proveedores
          </motion.h1>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-brown/80 text-center leading-relaxed mb-12 font-light">
            En El Piombino trabajamos con proveedores comprometidos con la calidad. Si deseas ofrecer tus productos o servicios, completa el siguiente formulario y nuestro equipo de compras se pondra en contacto contigo.
          </p>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-cream rounded-2xl border border-line p-12 text-center"
            >
              <div className="w-16 h-16 bg-blue/10 text-blue rounded-full flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-heading text-2xl text-brown mb-2">Solicitud enviada</h3>
              <p className="text-brown/70">Gracias por tu interes. Nuestro equipo revisara tu informacion y te contactaremos pronto.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-cream rounded-2xl border border-line p-8 md:p-10 space-y-6">
              <div>
                <label htmlFor="company" className={labelClass}>Razon social / Empresa</label>
                <input id="company" name="company" type="text" required value={form.company} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="ruc" className={labelClass}>RUC</label>
                  <input id="ruc" name="ruc" type="text" required value={form.ruc} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="contactName" className={labelClass}>Nombre de contacto</label>
                  <input id="contactName" name="contactName" type="text" required value={form.contactName} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Telefono</label>
                  <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="category" className={labelClass}>Categoria</label>
                <select id="category" name="category" required value={form.category} onChange={handleChange} className={`${inputClass} appearance-none`}>
                  <option value="">Seleccionar categoria</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="products" className={labelClass}>Productos o servicios que ofrece</label>
                <textarea id="products" name="products" rows="3" required value={form.products} onChange={handleChange} className={`${inputClass} resize-none`} />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>Mensaje adicional (opcional)</label>
                <textarea id="message" name="message" rows="3" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm">Ocurrio un error. Por favor intenta nuevamente.</p>
              )}
              {status === "validation" && (
                <p className="text-red-600 text-sm">Por favor verifica los datos ingresados.</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue text-white font-body text-sm font-semibold uppercase tracking-wider py-3.5 rounded-full hover:bg-blue/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "Enviando..." : "Enviar solicitud"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
