import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function StatsSection() {
  const { ref, inView } = useInView();

  // Você pode editar estes números e textos depois como quiser!
  const stats = [
    { label: "Anos de Experiência", value: "10+" },
    { label: "Projetos Entregues", value: "150+" },
    { label: "Marcas Atendidas", value: "50+" }
  ];

  return (
    <section className="py-16 bg-[#080C14] border-t border-b border-[rgba(0,212,255,0.05)] relative z-10">
      <div className="container" ref={ref}>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="font-display font-800 text-5xl text-[#00D4FF] mb-2">{stat.value}</div>
              <div className="font-mono-tech text-xs tracking-widest text-[#8892A4] uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}