import { motion } from "motion/react";

export default function PoliticaPrivacidad() {
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
            Politica de Privacidad
          </motion.h1>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-cream rounded-2xl border border-line p-8 md:p-12 space-y-8 text-brown/80 text-sm leading-relaxed">
            <p className="text-brown/50 text-xs">Ultima actualizacion: Marzo 2026</p>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">1. Informacion que recopilamos</h2>
              <p>En El Piombino recopilamos informacion personal cuando usted:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Completa un formulario de contacto en nuestro sitio web.</li>
                <li>Realiza un pedido a traves de nuestras plataformas de delivery.</li>
                <li>Presenta un reclamo o queja a traves de nuestro Libro de Reclamaciones virtual.</li>
                <li>Se postula a una vacante a traves de nuestra seccion Trabaja con Nosotros.</li>
                <li>Se registra como proveedor.</li>
              </ul>
              <p>La informacion que podemos recopilar incluye: nombre completo, documento de identidad, direccion, correo electronico, numero de telefono y cualquier otro dato que usted proporcione voluntariamente.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">2. Uso de la informacion</h2>
              <p>Utilizamos su informacion personal para:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Procesar y responder sus consultas, reclamos o solicitudes.</li>
                <li>Gestionar pedidos y reservas.</li>
                <li>Evaluar postulaciones laborales.</li>
                <li>Mejorar nuestros productos y servicios.</li>
                <li>Cumplir con obligaciones legales y regulatorias.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">3. Proteccion de datos</h2>
              <p>Implementamos medidas de seguridad tecnicas y organizativas para proteger su informacion personal contra acceso no autorizado, perdida o alteracion. Solo el personal autorizado tiene acceso a sus datos personales.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">4. Compartir informacion</h2>
              <p>No vendemos, comercializamos ni transferimos su informacion personal a terceros, salvo en los siguientes casos:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cuando sea requerido por ley o por autoridad competente.</li>
                <li>Para cumplir con lo establecido en el Libro de Reclamaciones (Ley 29571).</li>
                <li>Con proveedores de servicios que nos asisten en la operacion del sitio web, bajo acuerdos de confidencialidad.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">5. Derechos del titular</h2>
              <p>De acuerdo con la Ley N° 29733, Ley de Proteccion de Datos Personales, usted tiene derecho a:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Acceder a sus datos personales.</li>
                <li>Rectificar datos inexactos.</li>
                <li>Cancelar o solicitar la supresion de sus datos.</li>
                <li>Oponerse al tratamiento de sus datos.</li>
              </ul>
              <p>Para ejercer estos derechos, puede comunicarse con nosotros a traves de nuestro correo electronico de contacto.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">6. Consentimiento</h2>
              <p>Al utilizar nuestro sitio web, usted acepta los terminos de esta Politica de Privacidad. Si no esta de acuerdo con estos terminos, le recomendamos no proporcionar informacion personal a traves de nuestro sitio.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">7. Cambios en la politica</h2>
              <p>Nos reservamos el derecho de modificar esta Politica de Privacidad en cualquier momento. Los cambios seran publicados en esta pagina con la fecha de actualizacion correspondiente.</p>
            </div>

            <div className="space-y-4">
              <h2 className="font-heading text-lg text-brown">8. Contacto</h2>
              <p>Para consultas sobre esta politica, puede escribirnos a <a href="mailto:contacto@elpiombino.pe" className="text-blue hover:underline">contacto@elpiombino.pe</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
