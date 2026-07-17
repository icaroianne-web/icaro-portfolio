/* ============================================================
   DESIGN: "Deep Space Broadcast" — Hero Section
   Full-viewport cinematic hero with parallax and decode animation
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Sparkles } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";
const ICARO_OFFICE_PHOTO = "/assets/ICARO_OFFICE.png";

function DecodeText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    let iteration = 0;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(
          text
            .split("")
            .map((char, idx) => {
              if (char === " ") return " ";
              if (idx < iteration) return text[idx];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        if (iteration >= text.length) {
          clearInterval(interval);
          setDisplayed(text);
        }
        iteration += 0.5;
      }, 40);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span>{displayed}</span>;
}

export default function HeroSection() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    const el = document.querySelector("#sobre");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <img
          src={HERO_BG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110 opacity-40 mix-blend-screen"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_40%,rgba(0,212,255,0.25),transparent_35%),radial-gradient(circle_at_95%_60%,rgba(255,107,53,0.2),transparent_30%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14] via-[#080C14]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/10 to-[#080C14]/40" />
        <div className="absolute inset-0 backdrop-blur-[0.5px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[80vh]">
          {/* Left: Text content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tech badge atualizado com Comunicação e Marketing */}
            <div
              className="tech-badge animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <Sparkles size={10} />
              COORDENADOR DE COMUNICAÇÃO E MARKETING - PRODUÇÃO MULTIMÍDIA
            </div>

            {/* Main title */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              <h1 className="font-display font-800 leading-[0.9] text-[#F0F4FF]">
                <span
                  className="block text-[clamp(3.5rem,8vw,7rem)] tracking-tight"
                  style={{ textShadow: "0 0 80px rgba(0,212,255,0.15)" }}
                >
                  <DecodeText text="ÍCARO" delay={600} />
                </span>
                <span className="block text-[clamp(2.5rem,6vw,5.5rem)] tracking-tight gradient-text-cyan">
                  <DecodeText text="ALBUQUERQUE" delay={900} />
                </span>
              </h1>
            </div>

            {/* Tagline com os novos textos corporativos e destaques visuais */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="line-accent w-16 mb-4" />
              <p className="text-[#8892A4] font-outfit text-lg leading-relaxed max-w-2xl">
                Estrategista de Comunicação Corporativa, criador de narrativas audiovisuais com campanhas que alcançaram desde <span className="text-[#F0F4FF] font-medium">Ministérios brasileiros</span> até a <span className="text-[#C9A84C] font-medium">Conferência Mundial do Clima (COP28), em Dubai</span>.
              </p>
            </div>

            {/* Competências */}
            <div
              className="animate-fade-in-up flex flex-wrap gap-2"
              style={{ animationDelay: "0.9s", animationFillMode: "both" }}
            >
              {["Produção Audiovisual", "Estratégia Digital", "IA para Redes Sociais", "Comunicação Institucional", "Showreel & Reels"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono-tech text-[#8892A4] border border-[rgba(0,212,255,0.12)] bg-[rgba(0,212,255,0.04)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className="animate-fade-in-up flex flex-wrap gap-4 pt-2"
              style={{ animationDelay: "1.1s", animationFillMode: "both" }}
            >
              <a
                href="https://icaroia.carrd.co"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Play size={16} fill="currentColor" />
                Ver Showreel
              </a>
              <a
                href="#cases"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#cases")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline"
              >
                Cases de Sucesso
              </a>
            </div>
          </div>

          {/* Right: Photo Container */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in"
            style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[390px] lg:w-[410px] lg:max-w-[410px] mt-8 lg:mt-0">
              <div className="absolute -inset-10 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.22),transparent_50%)] blur-2xl" />
              
              {/* Linhas de contorno */}
              <div className="absolute -inset-3 border border-[rgba(0,212,255,0.25)] animate-border-pulse z-0" />
              <div className="absolute -inset-6 border border-[rgba(0,212,255,0.08)] hidden sm:block z-0" />

              {/* Cantoneiras HUD */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#00D4FF] z-20" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#00D4FF] z-20" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#FF6B35] z-20" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#FF6B35] z-20" />

              {/* Box da Imagem */}
              <div className="relative overflow-hidden w-full aspect-[0.76] lg:h-[540px] bg-transparent z-10">
                <img
                  src={ICARO_OFFICE_PHOTO}
                  alt="Ícaro Albuquerque"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#8892A4] hover:text-[#00D4FF] transition-colors duration-200 group"
      >
        <span className="font-mono-tech text-[0.65rem] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}