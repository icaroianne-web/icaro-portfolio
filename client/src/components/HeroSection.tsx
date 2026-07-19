/* ============================================================
   DESIGN: "Deep Space Broadcast" — Hero Section
   Full-viewport cinematic hero with scroll-controlled video (Emergent Style)
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Play, Sparkles } from "lucide-react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import ScrollSequence from "./ScrollSequence";

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // O container do hero tem 400vh para permitir rolagem extensa
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Aplica uma física de mola suave para evitar saltos (RIGG)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  // O texto aparece gradualmente conforme o vídeo roda para o final
  const opacity = useTransform(smoothProgress, [0.4, 0.9], [0, 1]);
  const scale = useTransform(smoothProgress, [0.4, 0.9], [0.95, 1]);

  // O indicador de scroll deve sumir logo no começo
  const scrollOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const scrollToNext = () => {
    const el = document.querySelector("#sobre");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} id="hero" className="relative h-[400vh] bg-[#080C14]">
      {/* Container "sticky" que fica preso na tela enquanto o usuário rola os 400vh */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Camada 1: O Vídeo Dominante Full-Screen (Emergent Workflow) */}
        <div className="absolute inset-0 z-0 w-full h-full bg-black">
          <ScrollSequence scrollYProgress={smoothProgress} className="w-full h-full object-cover opacity-100" />
          
          {/* Overlays mais suaves para não apagar o vídeo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#080C14] via-[#080C14]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-[#080C14]/20 pointer-events-none" />
        </div>

        {/* Camada 2: Grid overlay sutil corporativo */}
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Camada 3: Conteúdo original (UI) animado com o scroll */}
        <motion.div 
          style={{ opacity, scale }}
          className="container relative z-10 pt-24 pb-16 w-full"
        >
          <div className="max-w-3xl space-y-6">
            {/* Tech badge */}
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

            {/* Tagline */}
            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.7s", animationFillMode: "both" }}
            >
              <div className="line-accent w-16 mb-4" />
              <p className="text-[#00D4FF] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-outfit text-lg leading-relaxed max-w-2xl font-medium">
                Estrategista de Comunicação Corporativa, criador de narrativas audiovisuais com campanhas que alcançaram desde <span className="text-white font-semibold">Ministérios brasileiros</span> até a <span className="text-[#C9A84C] font-semibold">Conferência Mundial do Clima (COP28), em Dubai</span>.
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
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-primary"
              >
                Consultoria
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
              <a
                href="#showreel"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#showreel")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline"
              >
                <Play size={16} fill="currentColor" />
                Showreel
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator adaptado para indicar o efeito Fake 3D */}
        <motion.button
          style={{ opacity: scrollOpacity }}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#8892A4] hover:text-[#00D4FF] transition-colors duration-200 group"
        >
          <span className="font-mono-tech text-[0.65rem] uppercase tracking-widest text-[#00D4FF]">Scroll para explorar</span>
          <ChevronDown size={18} className="animate-bounce" color="#00D4FF" />
        </motion.button>

      </div>
    </section>
  );
}