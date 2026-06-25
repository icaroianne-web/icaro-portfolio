/* ============================================================
   DESIGN: "Deep Space Broadcast" — Stats/Impact Section
   Números de impacto com animação de contagem desacelerada
   ============================================================ */

import { useEffect, useRef, useState } from "react";

const stats = [
  { 
    value: 10, 
    suffix: "+", 
    label: "Anos de Experiência", 
    desc: "Em comunicação e produção audiovisual" 
  },
  { 
    value: 40, 
    suffix: "+", 
    label: "Projetos Entregues", 
    desc: "Vídeos, campanhas e estratégias digitais" 
  },
  { 
    value: 5, 
    suffix: "+", 
    label: "Projetos Internacionais", 
    desc: "COP28 Dubai · Conecon 2025 · Orla do Sol e +" 
  }
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame: number;
    const duration = 3000; // 3 segundos de contagem fluida
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setCount(target);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-16 overflow-hidden bg-[#080C14]">
      {/* Linha acentuada superior */}
      <div className="line-accent mb-0" />

      <div className="container">
        {/* Forçando estritamente 3 colunas no desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="py-10 px-6 text-center border-[rgba(0,212,255,0.08)] border-b md:border-b-0 md:border-r last:border-r-0 last:border-b-0"
            >
              <div className="font-display font-800 text-[clamp(2.5rem,5vw,4rem)] text-[#00D4FF] leading-none mb-2">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-display font-700 text-sm text-[#F0F4FF] mb-1">{stat.label}</div>
              <div className="font-mono-tech text-[0.65rem] text-[#8892A4] leading-relaxed max-w-xs mx-auto">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Linha acentuada inferior */}
      <div className="line-accent mt-0" />
    </section>
  );
}