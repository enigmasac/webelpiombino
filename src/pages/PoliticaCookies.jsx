import { motion } from "motion/react";

export default function PoliticaCookies() {
  return (
    <>
      <section className="bg-brown pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-5xl text-white mt-3"
          >
            Politica de Cookies
          </motion.h1>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-cream rounded-2xl border border-line p-8 md:p-12 space-y-8 text-brown/80 text-sm leading-relaxed">
            <p className="text-brown/50 text-xs">Ultima actualizacion: Marzo 2026</p>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">1. Que son las cookies</h2>
              <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web. Son ampliamente utilizadas para hacer que los sitios web funcionen de manera mas eficiente y proporcionar informacion a los propietarios del sitio.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">2. Cookies que utilizamos</h2>

              <h3 className="font-body text-sm font-semibold text-brown">Cookies esenciales</h3>
              <p>Son necesarias para el funcionamiento basico del sitio web. Incluyen cookies que permiten recordar sus preferencias de consentimiento.</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-semibold text-brown">piombino_cookies_accepted</span> — Almacena su consentimiento de cookies. Duracion: permanente.</li>
              </ul>

              <h3 className="font-body text-sm font-semibold text-brown mt-4">Cookies funcionales</h3>
              <p>Permiten recordar sus preferencias y personalizar su experiencia en el sitio, como el idioma o la region.</p>

              <h3 className="font-body text-sm font-semibold text-brown mt-4">Cookies de terceros</h3>
              <p>Nuestro sitio puede utilizar servicios de terceros que establecen sus propias cookies:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-semibold text-brown">Google Fonts</span> — Para cargar las tipografias del sitio.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">3. Control de cookies</h2>
              <p>Usted puede controlar y gestionar las cookies de diversas formas:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>A traves de la configuracion de su navegador, puede bloquear o eliminar cookies.</li>
                <li>Puede configurar su navegador para que le notifique cuando recibe una cookie.</li>
                <li>Puede eliminar las cookies ya almacenadas en su dispositivo en cualquier momento.</li>
              </ul>
              <p>Tenga en cuenta que deshabilitar cookies puede afectar la funcionalidad del sitio web.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">4. Como gestionar cookies en su navegador</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li><span className="font-semibold text-brown">Chrome:</span> Configuracion → Privacidad y seguridad → Cookies</li>
                <li><span className="font-semibold text-brown">Firefox:</span> Opciones → Privacidad y seguridad → Cookies</li>
                <li><span className="font-semibold text-brown">Safari:</span> Preferencias → Privacidad → Cookies</li>
                <li><span className="font-semibold text-brown">Edge:</span> Configuracion → Privacidad → Cookies</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">5. Cambios en la politica</h2>
              <p>Nos reservamos el derecho de actualizar esta Politica de Cookies. Cualquier cambio sera publicado en esta pagina con la fecha de actualizacion correspondiente.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">6. Contacto</h2>
              <p>Si tiene preguntas sobre nuestra Politica de Cookies, puede contactarnos en <a href="mailto:contacto@elpiombino.pe" className="text-blue hover:underline">contacto@elpiombino.pe</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
