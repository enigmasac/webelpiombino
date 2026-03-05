import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppBubble from "./components/WhatsAppBubble";
import MobileBottomNav from "./components/MobileBottomNav";
import CookieConsent from "./components/CookieConsent";

const Home = lazy(() => import("./pages/Home"));
const Carta = lazy(() => import("./pages/Carta"));
const Historia = lazy(() => import("./pages/Historia"));
const Locales = lazy(() => import("./pages/Locales"));
const TrabajaConNosotros = lazy(() => import("./pages/TrabajaConNosotros"));
const Contacto = lazy(() => import("./pages/Contacto"));
const LibroReclamaciones = lazy(() => import("./pages/LibroReclamaciones"));
const Proveedores = lazy(() => import("./pages/Proveedores"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-beige">
      <div className="w-8 h-8 border-3 border-brown/20 border-t-brown rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/carta" element={<Carta />} />
            <Route path="/historia" element={<Historia />} />
            <Route path="/locales" element={<Locales />} />
            <Route path="/trabaja-con-nosotros" element={<TrabajaConNosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/libro-reclamaciones" element={<LibroReclamaciones />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppBubble />
      <MobileBottomNav />
      <CookieConsent />
    </>
  );
}
