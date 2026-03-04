import { useState } from "react";
import { motion } from "motion/react";
import { locations } from "../data/locations";
import { whatsappNumber, contactEmail } from "../data/navigation";

const subjects = [
  "Consulta general",
  "Reservas",
  "Eventos y catering",
  "Reclamo",
  "Sugerencia",
];

export default function Contacto() {
  const [form, setForm] = useState({ subject: "", location: "", name: "", email: "", phone: "", message: "" });
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ subject: "", location: "", name: "", email: "", phone: "", message: "" });
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
            Hablemos
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Contacto
          </motion.h1>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
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
                  <h3 className="font-heading text-2xl text-brown mb-2">Mensaje enviado</h3>
                  <p className="text-brown/70">Gracias por escribirnos. Te responderemos a la brevedad.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-cream rounded-2xl border border-line p-8 md:p-10 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subject" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                        Asunto
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors appearance-none"
                      >
                        <option value="">Seleccionar asunto</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="location" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                        Local (opcional)
                      </label>
                      <select
                        id="location"
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors appearance-none"
                      >
                        <option value="">Todos los locales</option>
                        {locations.map((loc) => (
                          <option key={loc.id} value={loc.name}>{loc.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="name" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                      Nombre completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                        Telefono (opcional)
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors resize-none"
                    />
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
                    {submitting ? "Enviando..." : "Enviar mensaje"}
                  </button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-cream rounded-2xl border border-line p-8">
                <h3 className="font-heading text-lg text-brown mb-4">Otros canales</h3>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-brown/70 hover:text-blue transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                    </svg>
                    <span className="text-sm">WhatsApp</span>
                  </a>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="flex items-center gap-3 text-brown/70 hover:text-blue transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M22 6l-10 7L2 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-sm">{contactEmail}</span>
                  </a>
                </div>
              </div>

              <div className="bg-cream rounded-2xl border border-line p-8">
                <h3 className="font-heading text-lg text-brown mb-4">Horarios de atencion</h3>
                <p className="text-brown/70 text-sm">Lunes a Domingo</p>
                <p className="text-brown text-sm font-medium">8:00 am - 10:00 pm</p>
                <p className="text-brown/50 text-xs mt-3">Respondemos mensajes en horario laboral.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
