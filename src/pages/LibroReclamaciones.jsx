import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { locations } from "../data/locations";

const documentTypes = ["DNI", "CE", "Pasaporte"];
const claimTypes = [
  { value: "reclamo", label: "Reclamo", description: "Disconformidad relacionada a los productos o servicios." },
  { value: "queja", label: "Queja", description: "Disconformidad no relacionada a los productos o servicios; sino al proceso de atencion." },
];

const initialForm = {
  location: "",
  docType: "DNI",
  docNumber: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  isMinor: false,
  parentName: "",
  parentDoc: "",
  goodType: "producto",
  amount: "",
  goodDescription: "",
  claimType: "reclamo",
  claimDetail: "",
  request: "",
};

function LocationSelector({ onSelect }) {
  return (
    <section className="bg-beige py-16 lg:py-24">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-brown/80 text-center leading-relaxed mb-10 font-light">
          Cada local cuenta con su propio Libro de Reclamaciones. Selecciona el local donde ocurrio el hecho para continuar.
        </p>

        <div className="space-y-4">
          {locations.map((loc) => (
            <motion.button
              key={loc.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(loc)}
              className="w-full bg-cream rounded-2xl border border-line p-6 md:p-8 text-left hover:border-blue/40 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl text-brown group-hover:text-blue transition-colors">
                    El Piombino {loc.name}
                  </h3>
                  <p className="text-brown/60 text-sm mt-1">{loc.address}</p>
                </div>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-brown/30 group-hover:text-blue group-hover:translate-x-1 transition-all flex-shrink-0">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function LibroReclamaciones() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleSelectLocation(loc) {
    setSelectedLocation(loc);
    setForm((prev) => ({ ...prev, location: loc.name }));
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        setStatus({ type: "success", code: data.code });
      } else {
        const data = await res.json();
        setStatus({ type: data.errors ? "validation" : "error" });
      }
    } catch {
      setStatus({ type: "error" });
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
            Atencion al cliente
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mt-3"
          >
            Libro de Reclamaciones
          </motion.h1>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {!selectedLocation ? (
          <motion.div
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <LocationSelector onSelect={handleSelectLocation} />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <section className="bg-beige py-16 lg:py-24">
              <div className="max-w-3xl mx-auto px-6">
                <div className="flex items-center gap-3 mb-8">
                  <button
                    onClick={() => { setSelectedLocation(null); setForm(initialForm); setStatus(null); }}
                    className="flex items-center gap-2 text-brown/60 hover:text-blue text-sm font-medium transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Cambiar local
                  </button>
                  <span className="text-brown/30">|</span>
                  <span className="text-brown font-semibold text-sm">El Piombino {selectedLocation.name}</span>
                </div>

                <div className="bg-cream rounded-2xl border border-line p-8 md:p-10 mb-8">
                  <h3 className="font-heading text-lg text-brown mb-3">Datos del proveedor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-brown/70">
                    <p><span className="font-semibold text-brown">Razon social:</span> {selectedLocation.razonSocial}</p>
                    <p><span className="font-semibold text-brown">RUC:</span> {selectedLocation.ruc}</p>
                    <p className="md:col-span-2"><span className="font-semibold text-brown">Direccion:</span> {selectedLocation.address}</p>
                  </div>
                </div>

                {status?.type === "success" ? (
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
                    <h3 className="font-heading text-2xl text-brown mb-2">Reclamo registrado</h3>
                    <p className="text-brown/70 mb-2">Tu codigo de reclamo es:</p>
                    <p className="font-body text-2xl font-bold text-blue mb-4">{status.code}</p>
                    <p className="text-brown/50 text-sm">Conserva este codigo. Recibiras una respuesta en un plazo maximo de 30 dias calendario.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-cream rounded-2xl border border-line p-8 md:p-10 space-y-6">
                      <h3 className="font-heading text-lg text-brown">1. Identificacion del consumidor</h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label htmlFor="docType" className={labelClass}>Tipo de documento</label>
                          <select id="docType" name="docType" value={form.docType} onChange={handleChange} className={`${inputClass} appearance-none`}>
                            {documentTypes.map((dt) => <option key={dt} value={dt}>{dt}</option>)}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="docNumber" className={labelClass}>Numero de documento</label>
                          <input id="docNumber" name="docNumber" type="text" required value={form.docNumber} onChange={handleChange} className={inputClass} />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="name" className={labelClass}>Nombre completo</label>
                        <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={inputClass} />
                      </div>

                      <div>
                        <label htmlFor="address" className={labelClass}>Domicilio</label>
                        <input id="address" name="address" type="text" required value={form.address} onChange={handleChange} className={inputClass} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className={labelClass}>Telefono</label>
                          <input id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} className={inputClass} />
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClass}>Correo electronico</label>
                          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputClass} />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <input id="isMinor" name="isMinor" type="checkbox" checked={form.isMinor} onChange={handleChange} className="w-4 h-4 accent-blue" />
                        <label htmlFor="isMinor" className="text-brown/70 text-sm">Menor de edad</label>
                      </div>

                      {form.isMinor && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-7">
                          <div>
                            <label htmlFor="parentName" className={labelClass}>Nombre del padre/madre</label>
                            <input id="parentName" name="parentName" type="text" required value={form.parentName} onChange={handleChange} className={inputClass} />
                          </div>
                          <div>
                            <label htmlFor="parentDoc" className={labelClass}>DNI del padre/madre</label>
                            <input id="parentDoc" name="parentDoc" type="text" required value={form.parentDoc} onChange={handleChange} className={inputClass} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="bg-cream rounded-2xl border border-line p-8 md:p-10 space-y-6">
                      <h3 className="font-heading text-lg text-brown">2. Identificacion del bien contratado</h3>

                      <div className="flex gap-6">
                        {["producto", "servicio"].map((t) => (
                          <label key={t} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="goodType" value={t} checked={form.goodType === t} onChange={handleChange} className="w-4 h-4 accent-blue" />
                            <span className="text-brown text-sm font-medium capitalize">{t}</span>
                          </label>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="amount" className={labelClass}>Monto reclamado (S/.)</label>
                          <input id="amount" name="amount" type="text" value={form.amount} onChange={handleChange} className={inputClass} placeholder="0.00" />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="goodDescription" className={labelClass}>Descripcion del bien</label>
                        <textarea id="goodDescription" name="goodDescription" rows="3" required value={form.goodDescription} onChange={handleChange} className={`${inputClass} resize-none`} />
                      </div>
                    </div>

                    <div className="bg-cream rounded-2xl border border-line p-8 md:p-10 space-y-6">
                      <h3 className="font-heading text-lg text-brown">3. Detalle de la reclamacion</h3>

                      <div className="space-y-3">
                        {claimTypes.map((ct) => (
                          <label key={ct.value} className="flex items-start gap-3 cursor-pointer">
                            <input type="radio" name="claimType" value={ct.value} checked={form.claimType === ct.value} onChange={handleChange} className="w-4 h-4 accent-blue mt-0.5" />
                            <div>
                              <span className="text-brown text-sm font-semibold">{ct.label}</span>
                              <p className="text-brown/50 text-xs">{ct.description}</p>
                            </div>
                          </label>
                        ))}
                      </div>

                      <div>
                        <label htmlFor="claimDetail" className={labelClass}>Detalle</label>
                        <textarea id="claimDetail" name="claimDetail" rows="4" required value={form.claimDetail} onChange={handleChange} className={`${inputClass} resize-none`} />
                      </div>

                      <div>
                        <label htmlFor="request" className={labelClass}>Pedido del consumidor</label>
                        <textarea id="request" name="request" rows="3" required value={form.request} onChange={handleChange} className={`${inputClass} resize-none`} />
                      </div>
                    </div>

                    <div className="bg-cream rounded-2xl border border-line p-6 md:p-8">
                      <p className="text-brown/50 text-xs leading-relaxed">
                        Conforme al Codigo de Proteccion y Defensa del Consumidor (Ley 29571) y el Decreto Supremo 011-2011-PCM, el proveedor debera dar respuesta al reclamo o queja en un plazo no mayor a treinta (30) dias calendario, pudiendo ampliar el plazo hasta por treinta (30) dias mas, previa comunicacion al consumidor.
                      </p>
                    </div>

                    {status?.type === "error" && (
                      <p className="text-red-600 text-sm">Ocurrio un error. Por favor intenta nuevamente.</p>
                    )}
                    {status?.type === "validation" && (
                      <p className="text-red-600 text-sm">Por favor verifica los datos ingresados.</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-blue text-white font-body text-sm font-semibold uppercase tracking-wider py-3.5 rounded-full hover:bg-blue/90 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Enviando..." : "Enviar reclamo"}
                    </button>
                  </form>
                )}
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
