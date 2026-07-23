/* ============================================================
   DESIGN: "Deep Space Broadcast"
   Portfolio de Ícaro Albuquerque — Coordenador de Comunicação / Produtor Multimídia
   Paleta: #080C14 bg | #00D4FF cyan | #FF6B35 orange | #C9A84C gold
   Fontes: Syne (display) | Outfit (body) | JetBrains Mono (tech)
   ============================================================ */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import MarqueeSection from "@/components/MarqueeSection";
import CasesSection from "@/components/CasesSection";
import ShowreelSection from "@/components/ShowreelSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C14]">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <CasesSection />
      <AboutSection />
      <ServicesSection />
      <ShowreelSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
