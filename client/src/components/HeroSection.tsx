/* ============================================================
   DESIGN: "Deep Space Broadcast" — Hero Section
   Full-viewport cinematic hero with parallax and decode animation
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Sparkles } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";
const ICARO_PHOTO = "/manus-storage/icaro-hero_34b888d3.jpg";

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
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      >
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080C14] via-[#080C14]/80 to-[#080C14]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-[#080C14]/50" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
          {/* Left: Text content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tech badge */}
            <div
              className="tech-badge animate-fade-in-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}
            >
              <Sparkles size={10} />
              Coordenador de Comunicação · Produtor Multimídia
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

            {/* Tagline */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="line-accent w-16 mb-4" />
              <p className="text-[#8892A4] font-outfit text-lg leading-relaxed max-w-xl">
                🎬 Criador de narrativas audiovisuais e estrategista de comunicação.
                De <span className="text-[#F0F4FF] font-medium">Ministérios</span> à{" "}
                <span className="text-[#C9A84C] font-medium">COP28 em Dubai</span>.
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
                href="#showreel"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#showreel")?.scrollIntoView({ behavior: "smooth" });
                }}
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

            {/* Stats */}
            <div
              className="animate-fade-in-up pt-4 grid grid-cols-3 gap-4 max-w-md"
              style={{ animationDelay: "1.3s", animationFillMode: "both" }}
            >
              {[
                { value: "10+", label: "Anos de Experiência" },
                { value: "COP28", label: "Dubai · Internacional" },
                { value: "IA", label: "Integrada ao Workflow" },
              ].map((stat) => (
                <div key={stat.label} className="stat-item">
                  <div className="font-display font-800 text-xl text-[#00D4FF]">{stat.value}</div>
                  <div className="font-mono-tech text-[0.6rem] text-[#8892A4] uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo */}
          <div
            className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-[rgba(0,212,255,0.12)] animate-border-pulse" />
              <div className="absolute -inset-8 border border-[rgba(0,212,255,0.05)]" />

              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-[#00D4FF]" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-[#00D4FF]" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-[#FF6B35]" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-[#FF6B35]" />

              {/* Photo */}
              <div className="relative overflow-hidden w-[320px] h-[420px] lg:w-[380px] lg:h-[500px]">
                <img
                  src={ICARO_PHOTO}
                  alt="Ícaro Albuquerque"
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient overlay on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080C14]/20 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#0F1623] border border-[rgba(0,212,255,0.25)] p-3 backdrop-blur-sm">
                <div className="font-mono-tech text-[0.6rem] text-[#00D4FF] uppercase tracking-widest">
                  AI-Enhanced
                </div>
                <div className="font-display font-700 text-sm text-[#F0F4FF]">
                  Comunicação
                </div>
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
