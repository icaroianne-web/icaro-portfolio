/* ============================================================
   DESIGN: "Deep Space Broadcast"
   Portfolio & Consultoria de Ícaro Albuquerque
   Paleta: #080C14 bg | #00D4FF cyan | #FF6B35 orange | #C9A84C gold
   Fontes: Syne (display) | Outfit (body) | JetBrains Mono (tech)
   ============================================================ */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CasesSection from "@/components/CasesSection";
import MarqueeSection from "@/components/MarqueeSection";
import StatsSection from "@/components/StatsSection";
import BlogTeaserSection from "@/components/BlogTeaserSection";
import ShowreelSection from "@/components/ShowreelSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C14]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CasesSection />
      <MarqueeSection />
      <StatsSection />
      <BlogTeaserSection />
      <ShowreelSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
