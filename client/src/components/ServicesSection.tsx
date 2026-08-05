/* ============================================================
   DESIGN: "Deep Space Broadcast" — Services Section (Museum Storytelling Gallery)
   Exibição dos 4 produtos com imagens completas de storytelling (MASP)
   Ordem: 1. MASTER PLAN™ -> 2. ID CONCEPT™ -> 3. I.A.E!™ -> 4. Absolute Cinema™
   
   Comportamento ao expandir:
   - Fechado: Card de prévia com gradiente e textos sobrepostos na imagem.
   - Expandido: A imagem fica 100% LIMPA e COMPLETA sem nenhum texto em cima (apenas a tag da categoria), e todos os textos (título, subtítulo, descrição, entregáveis, UTIO e CTA) descem para a seção expandida abaixo.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Network, Activity, BrainCircuit, Clapperboard, ChevronDown, ChevronUp, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import LeadFormModal from "./LeadFormModal";
import UtioMethodHorizontal from "./UtioMethodHorizontal";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";

const services = [
  {
    id: 1,
    title: "MASTER PLAN™",
    subtitle: "A estrutura completa da sua comunicação Inbound & Outbound.",
    description: "Crescimento sem plano é sorte — não é método. O MASTER PLAN é o sistema completo de comunicação do seu negócio: da governança ao calendário editorial (com entrega de posts prontos por período), dos chatbots no site (Typebot) ao e-mail marketing. Construído com a Bússola UTIO para você investir energia onde gera resultado de verdade. Inclui Treinamentos In-loco ou Virtuais para sua equipe.",
    icon: Network,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_master_plan_masp.png",
    features: [
      "Estruturação Inbound & Outbound",
      "Método UTIO: Bússola de Prioridades",
      "Arquitetura Editorial & Posts Prontos",
      "Chatbots no Site (Typebot) & E-mail",
      "Governança & Gestão de Crises",
      "Treinamentos In-loco ou Virtuais"
    ],
    detailsType: "utio",
    category: "Comunicação & Estratégia"
  },
  {
    id: 2,
    title: "ID CONCEPT™",
    subtitle: "Marca, Branding, Rebranding & Presença Digital Super Premium.",
    description: "Definimos quem sua marca é antes que o mercado decida por você. Do Naming e Rebranding à conceitualização de Key Visual (KV), Moodboard, Guia da Marca (tom e voz) e UX Writing. Desenvolvemos o seu Site Conceitual Super Premium caso precise de uma repaginação total de autoridade. Uma identidade que não é apenas bonita — é um argumento comercial.",
    icon: Activity,
    color: "#C9A84C",
    fromClass: "from-[#C9A84C]",
    image: "/assets/service_id_concept_masp.png",
    features: [
      "Conceito de Marca, Naming & Rebranding",
      "Key Visual (KV), Moodboard & Guia da Marca",
      "Site Conceitual Super Premium & Funcional",
      "UX Writing, Tom & Voz da Marca",
      "Arquitetura da Informação & Copywriting",
      "Repaginação Total de Presença Digital"
    ],
    detailsType: "list",
    category: "Branding & Presença"
  },
  {
    id: 3,
    title: "I.A.E!™",
    subtitle: "Inteligência Artificial Estratégica aplicada à Comunicação & Marketing.",
    description: "Através de um Raio-X de processos, prestamos consultoria para implantar IA focada exclusivamente em Comunicação e Marketing (geração de imagens, conteúdo para redes sociais, automações e comunicação interna assistida). Sem foco em auditoria/financeiro. Inclui Treinamentos In-loco ou Virtuais para capacitar seu time a produzir em dobro pela metade do custo.",
    icon: BrainCircuit,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_iae_masp.png",
    features: [
      "Raio-X de Oportunidades de IA no Marketing",
      "Geração de Imagens & Conteúdo para Redes",
      "Comunicação Interna Assistida por IA",
      "Agentes & Plataformas Sob Medida",
      "Treinamentos In-loco ou Virtuais",
      "Autonomia Operacional para a Equipe"
    ],
    detailsType: "list",
    category: "Inovação & Tech"
  },
  {
    id: 4,
    title: "ABSOLUTE CINEMA™",
    subtitle: "Filmes corporativos e depoimentos com storytelling de cinema.",
    description: "Voltado para marcas que querem criar um filme corporativo em primeira pessoa, vídeos de depoimentos ou bastidores. Trazemos o storytelling cinematográfico com estrutura ágil e poucos equipamentos — desmistificando a ideia de que a empresa precisa gastar uma fortuna para contar sua história com alto impacto.",
    icon: Clapperboard,
    color: "#FF6B35",
    fromClass: "from-[#FF6B35]",
    image: "/assets/service_cinema_masp.png",
    features: [
      "Filmes Corporativos em Primeira Pessoa",
      "Vídeos de Depoimentos & Bastidores",
      "Storytelling Ágil (Poucos Equipamentos)",
      "Cases de Sucesso & Documentários",
      "Séries para YouTube e Redes Sociais",
      "Roteirização, Direção & Media Training"
    ],
    detailsType: "list",
    category: "Audiovisual & Cinema"
  }
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

export default function ServicesSection() {
  const { ref, inView } = useInView();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductTitle, setSelectedProductTitle] = useState("");
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleToggleService = (id: number) => {
    const willExpand = activeService !== id;
    setActiveService(willExpand ? id : null);

    if (willExpand) {
      setTimeout(() => {
        const el = cardRefs.current[id];
        if (el) {
          const yOffset = -80; // offset for sticky header/navbar
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <section id="services" className="relative py-24 bg-[#080C14] overflow-hidden border-t border-[rgba(0,212,255,0.05)]">
      {/* Background Ambient Texture */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img src={SERVICES_BG} alt="" className="w-full h-full object-cover mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-transparent to-[#080C14]" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>02</span>
            <div>
              <div className="tech-badge mb-2">
                <Sparkles size={12} />
                <span>GALERIA DE PRODUTOS</span>
              </div>
              <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                Produtos & <br />
                <span className="gradient-text-cyan">Sistemas de Comunicação</span>
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
          <p className="text-[#8892A4] mt-4 ml-[calc(clamp(4rem,10vw,8rem)+1rem)] max-w-xl text-base leading-relaxed">
            Conheça as 4 soluções estruturadas para acelerar a autoridade, a presença digital e a escala do seu negócio.
          </p>
        </div>

        {/* Gallery Grid — Immersive Exhibition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((svc, i) => {
            const isExpanded = activeService === svc.id;

            return (
              <div 
                key={svc.id}
                ref={(el) => (cardRefs.current[svc.id] = el)}
                className={`relative rounded-2xl bg-[#0F1623] border border-[rgba(255,255,255,0.08)] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-500 group cursor-pointer ${
                  isExpanded ? "ring-1 border-opacity-100 shadow-[0_0_40px_rgba(0,0,0,0.8)]" : "hover:border-opacity-30 hover:-translate-y-1.5"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  borderColor: isExpanded ? svc.color : undefined,
                  transitionDelay: `${i * 100}ms`,
                  boxShadow: isExpanded ? `0 0 35px ${svc.color}25` : undefined
                }}
                onClick={() => handleToggleService(svc.id)}
              >
                {/* Colored Top Border Line */}
                <div 
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }}
                />

                {/* 1. MEDIA CONTAINER — Larger before click */}
                <div className={`relative w-full overflow-hidden transition-all duration-700 bg-[#080C14] ${
                  isExpanded ? "aspect-[16/9] sm:aspect-[16/9] min-h-[260px] sm:min-h-[360px]" : "aspect-[4/3] sm:aspect-[16/10] min-h-[320px] sm:min-h-[420px]"
                }`}>
                  {/* High-Res Artwork Image */}
                  <img 
                    src={svc.image} 
                    alt={svc.title} 
                    className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${
                      isExpanded ? "scale-100 opacity-100" : "opacity-90 group-hover:scale-105"
                    }`}
                  />

                  {/* Dark Gradient Overlay — ONLY visible when COLLAPSED */}
                  {!isExpanded && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] via-[#0F1623]/80 via-40% to-transparent pointer-events-none transition-opacity duration-500" />
                  )}

                  {/* ONLY THE CATEGORY TAG IS OVERLAID AT TOP LEFT */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                    <span 
                      className="px-3 py-1.5 text-[0.65rem] font-mono-tech font-semibold uppercase tracking-widest border backdrop-blur-md rounded-md bg-[#080C14]/85 shadow-md"
                      style={{ color: svc.color, borderColor: `${svc.color}40` }}
                    >
                      {svc.category}
                    </span>

                    <div 
                      className="w-9 h-9 rounded-lg flex items-center justify-center border backdrop-blur-md bg-[#080C14]/85 shadow-lg"
                      style={{ borderColor: `${svc.color}40`, color: svc.color }}
                    >
                      <svc.icon size={18} />
                    </div>
                  </div>

                  {/* OVERLAID PREVIEW TEXT — ONLY visible when COLLAPSED */}
                  {!isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col justify-end">
                      <h3 className="font-display font-800 text-2xl sm:text-3xl text-[#F0F4FF] leading-tight group-hover:text-white transition-colors duration-200">
                        {svc.title}
                      </h3>
                      
                      <p className="text-xs font-mono-tech tracking-widest uppercase font-semibold mt-1 mb-2" style={{ color: svc.color }}>
                        {svc.subtitle}
                      </p>

                      {/* Trigger Bar */}
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div 
                          className="inline-flex items-center gap-2 font-mono-tech text-[0.65rem] tracking-widest uppercase font-bold"
                          style={{ color: svc.color }}
                        >
                          <ChevronDown size={14} />
                          <span>[+] Ver Obra Completa & Detalhes</span>
                        </div>

                        <span className="text-[10px] font-mono-tech text-[#8892A4]">
                          0{i + 1}/04
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. EXPANDED CONTENT DRAWER — Below the clean image when clicked */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out bg-[#0F1623] ${
                    isExpanded ? "max-h-[1600px] opacity-100 p-6 sm:p-8 border-t border-white/10" : "max-h-0 opacity-0 p-0"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Service Title & Subtitle */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-display font-800 text-3xl text-[#F0F4FF] leading-tight">
                        {svc.title}
                      </h3>
                      <span className="text-xs font-mono-tech text-[#8892A4]">
                        Obra 0{i + 1}/04
                      </span>
                    </div>

                    <p className="text-xs font-mono-tech tracking-widest uppercase font-semibold mt-1" style={{ color: svc.color }}>
                      {svc.subtitle}
                    </p>
                  </div>

                  {/* Description Paragraph */}
                  <p className="text-[#8892A4] text-sm leading-relaxed font-outfit mb-8 pb-6 border-b border-white/5">
                    {svc.description}
                  </p>

                  {/* Deliverables List */}
                  <h4 className="text-[#F0F4FF] font-display font-700 text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: svc.color }} />
                    <span>Entregáveis Incluídos:</span>
                  </h4>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {svc.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#8892A4] bg-[#080C14]/80 p-3.5 rounded-xl border border-white/5">
                        <CheckCircle2 size={16} style={{ color: svc.color }} className="flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Interactive UTIO Method Component inside Master Plan card */}
                  {svc.detailsType === "utio" && (
                    <div className="my-8">
                      <UtioMethodHorizontal />
                    </div>
                  )}

                  {/* CTA Action Button */}
                  <button 
                    onClick={() => {
                      setSelectedProductTitle(svc.title);
                      setIsModalOpen(true);
                    }}
                    className="w-full py-4 rounded-xl flex items-center justify-center gap-2 font-mono-tech text-xs tracking-widest uppercase font-bold transition-all duration-300 shadow-lg mb-4"
                    style={{ 
                      backgroundColor: `${svc.color}15`, 
                      borderColor: `${svc.color}50`, 
                      borderWidth: "1px",
                      color: svc.color 
                    }}
                  >
                    <span>Agendar Conversa Estratégica — {svc.title}</span>
                    <ArrowRight size={14} />
                  </button>

                  {/* Collapse Bar */}
                  <button
                    onClick={() => setActiveService(null)}
                    className="w-full text-center py-2 font-mono-tech text-[0.65rem] tracking-widest uppercase text-[#8892A4] hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <ChevronUp size={12} />
                    <span>[-] Ocultar Detalhes & Retornar à Galeria</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <LeadFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedProduct={selectedProductTitle} 
      />
    </section>
  );
}
