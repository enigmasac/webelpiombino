import { useState } from "react";
import { motion } from "motion/react";

const positions = [
  "Barista",
  "Pastelero/a",
  "Mesero/a",
  "Cocinero/a",
  "Cajero/a",
  "Administrador/a",
];

export default function TrabajaConNosotros() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setStatus("filesize");
      e.target.value = "";
      return;
    }
    setStatus(null);
    setCvFile(file);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v));
      if (cvFile) body.append("cv", cvFile);

      const res = await fetch("/api/leads", {
        method: "POST",
        body,
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", position: "", message: "" });
        setCvFile(null);
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
            Unete al equipo
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Trabaja con nosotros
          </motion.h1>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-brown/80 text-center leading-relaxed mb-12 font-light">
            En El Piombino valoramos a las personas apasionadas por el servicio y la gastronomia. Si quieres ser parte de nuestro equipo, completa el formulario.
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
              <h3 className="font-heading text-2xl text-brown mb-2">Postulacion enviada</h3>
              <p className="text-brown/70">Gracias por tu interes. Nos pondremos en contacto contigo pronto.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-cream rounded-2xl border border-line p-8 md:p-10 space-y-6">
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
                    Telefono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="position" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                  Puesto al que postula
                </label>
                <select
                  id="position"
                  name="position"
                  required
                  value={form.position}
                  onChange={handleChange}
                  className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors appearance-none"
                >
                  <option value="">Seleccionar puesto</option>
                  {positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cv" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                  CV (opcional, max 5MB, PDF o Word)
                </label>
                <div className="relative">
                  <input
                    id="cv"
                    name="cv"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFile}
                    className="w-full bg-beige border border-line rounded-xl px-4 py-3 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-blue/30 focus:border-blue transition-colors file:mr-3 file:border-0 file:bg-blue/10 file:text-blue file:text-xs file:font-semibold file:uppercase file:tracking-wider file:px-3 file:py-1.5 file:rounded-lg file:cursor-pointer"
                  />
                  {cvFile && (
                    <p className="text-brown/50 text-xs mt-1.5">{cvFile.name} ({(cvFile.size / 1024 / 1024).toFixed(1)} MB)</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block font-body text-xs font-semibold uppercase tracking-[0.15em] text-brown/60 mb-2">
                  Mensaje (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
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
              {status === "filesize" && (
                <p className="text-red-600 text-sm">El archivo excede el limite de 5 MB.</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue text-white font-body text-sm font-semibold uppercase tracking-wider py-3.5 rounded-full hover:bg-blue/90 transition-colors disabled:opacity-50"
              >
                {submitting ? "Enviando..." : "Enviar postulacion"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
