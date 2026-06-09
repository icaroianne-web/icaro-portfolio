/* ============================================================
   DESIGN: "Deep Space Broadcast" — Cases Section
   Grid masonry com cards interativos e overlay de detalhes
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Globe, Building2, Leaf, Tv, Users, Megaphone } from "lucide-react";

const CASES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/cases-bg-QeazzTAEWuWpntiEmDoMC7.webp";
const DUBAI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/dubai-cop28-54NchRQcmNgEMvWqnqgHxH.webp";

const cases = [
  {
    id: 1,
    tag: "Internacional",
    icon: Globe,
    title: "COP28 — Dubai",
    subtitle: "Conferência das Nações Unidas sobre Mudanças Climáticas",
    year: "2023",
    location: "Dubai, Emirados Árabes",
    description: "Cobertura audiovisual completa e produção de conteúdo para a 28ª Conferência do Clima da ONU. Criação de narrativas visuais que comunicaram os compromissos climáticos do Brasil para o mundo.",
    results: ["Cobertura internacional", "Conteúdo multilíngue", "Alcance global"],
    color: "#C9A84C",
    featured: true,
    image: DUBAI_IMG,
  },
  {
    id: 2,
    tag: "Governo Federal",
    icon: Building2,
    title: "Ministério Federal",
    subtitle: "Coordenação de Comunicação Institucional",
    year: "2022",
    location: "Brasília, Brasil",
    description: "Coordenação completa da comunicação institucional, incluindo produção audiovisual, gestão de redes sociais e estratégia de conteúdo para órgão do governo federal.",
    results: ["Estratégia de conteúdo", "Produção audiovisual", "Gestão de crise"],
    color: "#00D4FF",
    featured: false,
    image: null,
  },
  {
    id: 3,
    tag: "Sustentabilidade",
    icon: Leaf,
    title: "Campanha Ambiental",
    subtitle: "Comunicação para Impacto Social",
    year: "2023",
    location: "Brasil",
    description: "Desenvolvimento de campanha de comunicação para conscientização ambiental, com produção de vídeos, reels e conteúdo para redes sociais com uso de IA.",
    results: ["Vídeos virais", "IA integrada", "Alto engajamento"],
    color: "#4CAF50",
    featured: false,
    image: null,
  },
  {
    id: 4,
    tag: "Broadcast",
    icon: Tv,
    title: "Vídeos Institucionais",
    subtitle: "Produção Audiovisual de Alto Nível",
    year: "2021-2024",
    location: "Brasil",
    description: "Direção e produção de vídeos institucionais para grandes organizações, com roteiro, captação, edição e pós-produção completa.",
    results: ["Múltiplos clientes", "Premiações", "Alta qualidade"],
    color: "#FF6B35",
    featured: false,
    image: null,
  },
  {
    id: 5,
    tag: "Redes Sociais",
    icon: Users,
    title: "Estratégia Digital com IA",
    subtitle: "Gestão e Automação de Conteúdo",
    year: "2020-2024",
    location: "Remoto",
    description: "Implementação de estratégias avançadas de redes sociais com uso de ferramentas de Inteligência Artificial para criação, automação e análise de conteúdo.",
    results: ["Crescimento orgânico", "Automação IA", "ROI comprovado"],
    color: "#9B59B6",
    featured: false,
    image: null,
  },
  {
    id: 6,
    tag: "Eventos",
    icon: Megaphone,
    title: "Cobertura de Eventos",
    subtitle: "Produção ao Vivo e Pós-Produção",
    year: "2019-2024",
    location: "Brasil e Internacional",
    description: "Cobertura audiovisual de grandes eventos corporativos, conferências e cerimônias, com transmissão ao vivo e produção de conteúdo para redes sociais em tempo real.",
    results: ["Transmissão ao vivo", "Cobertura completa", "Entrega rápida"],
    color: "#00D4FF",
    featured: false,
    image: null,
  },
];

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

export default function CasesSection() {
  const { ref, inView } = useInView();
  const [activeCase, setActiveCase] = useState<number | null>(null);

  return (
    <section id="cases" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={CASES_BG} alt="" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#080C14]/85 to-[#080C14]" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>02</span>
            <div>
              <div className="tech-badge mb-2">Portfólio</div>
              <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                Cases de<br />
                <span className="gradient-text-warm">Sucesso</span>
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
          <p className="text-[#8892A4] mt-4 ml-[calc(clamp(4rem,10vw,8rem)+1rem)] max-w-lg">
            Projetos que deixaram marca — do âmbito local ao palco internacional.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <div
              key={item.id}
              className={`case-card group cursor-pointer transition-all duration-500 ${
                item.featured ? "md:col-span-2 lg:col-span-2" : ""
              } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActiveCase(activeCase === item.id ? null : item.id)}
            >
              {/* Featured image */}
              {item.featured && item.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="tech-badge" style={{ borderColor: `${item.color}40`, color: item.color }}>
                      {item.tag}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center border transition-colors duration-300"
                      style={{
                        borderColor: `${item.color}30`,
                        backgroundColor: `${item.color}08`,
                      }}
                    >
                      <item.icon size={18} style={{ color: item.color }} />
                    </div>
                    <div>
                      {!item.featured && (
                        <span
                          className="font-mono-tech text-[0.6rem] uppercase tracking-widest"
                          style={{ color: item.color }}
                        >
                          {item.tag}
                        </span>
                      )}
                      <div className="font-mono-tech text-[0.65rem] text-[#8892A4]">{item.year}</div>
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="text-[#8892A4] group-hover:text-[#00D4FF] transition-colors duration-200 mt-1"
                  />
                </div>

                <h3 className="font-display font-800 text-lg text-[#F0F4FF] mb-1">{item.title}</h3>
                <p className="text-[#8892A4] text-xs mb-3">{item.subtitle}</p>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-400 ${
                    activeCase === item.id ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-[#8892A4] text-sm leading-relaxed mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.results.map((r) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 text-xs font-mono-tech"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}0D`,
                          border: `1px solid ${item.color}25`,
                        }}
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[rgba(0,212,255,0.08)]">
                  <Globe size={11} className="text-[#8892A4]" />
                  <span className="font-mono-tech text-[0.65rem] text-[#8892A4]">{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a
            href="https://wa.me/5511940684068"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex"
          >
            Vamos criar juntos o próximo case?
          </a>
        </div>
      </div>
    </section>
  );
}
