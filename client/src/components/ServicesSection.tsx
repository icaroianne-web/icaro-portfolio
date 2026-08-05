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
    subtitle: "A estratégia que os outros consultores deveriam ter te vendido primeiro.",
    description: "Crescimento sem plano é sorte — não é método. O MASTER PLAN é o sistema completo de comunicação do seu negócio: do diagnóstico ao calendário, do posicionamento à crise. Construído com o Método UTIO — Urgente, Timing, Imprescindível, Opcional — para que você invista energia apenas onde gera resultado de verdade.",
    icon: Network,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_master_plan_masp.png",
    features: [
      "Raio-X de Comunicação",
      "Método UTIO: Bússola de Prioridades",
      "Arquitetura e Calendário Editorial",
      "Governança e Gestão de Crises",
      "Framework de E-mail Marketing",
      "Consultoria Estratégica Contínua"
    ],
    detailsType: "utio",
    category: "Comunicação & Estratégia"
  },
  {
    id: 2,
    title: "ID CONCEPT™",
    subtitle: "Definimos quem você é antes que o mercado decida por você.",
    description: "Não começo pelo logo. Começo pelo conceito — a ideia central que define sua posição no mercado e onde você quer ser visto daqui a 10 anos. Daí nasce tudo: a estética, a linguagem, o site conceitual premium e até a denominação que você ainda não tinha para si mesmo. Uma identidade que não é apenas bonita — é um argumento comercial.",
    icon: Activity,
    color: "#C9A84C",
    fromClass: "from-[#C9A84C]",
    image: "/assets/service_id_concept_masp.png",
    features: [
      "Conceito de Marca e Naming Estratégico",
      "Identidade Visual e Manual de Marca",
      "Site Conceitual Premium & Funcional",
      "Direção de Arte e KV (Key Visual)",
      "Posicionamento, Tom de Voz e Copy",
      "Direcionamento de Pauta e Presença Pública"
    ],
    detailsType: "list",
    category: "Branding & Presença"
  },
  {
    id: 3,
    title: "I.A.E!™",
    subtitle: "Sua equipe produzindo em dobro. Seu custo produzindo pela metade.",
    description: "A maioria das empresas usa IA para experimentar. Eu uso para escalar. O I.A.E! implanta inteligência artificial no fluxo real da sua operação — com realismo, qualidade e identidade de marca intactos. Saída de conteúdo premium em fração do tempo, equipe treinada e autônoma, e processos que continuam funcionando quando você não está. Produção inteligente também é produção consciente.",
    icon: BrainCircuit,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_iae_masp.png",
    features: [
      "Diagnóstico e Mapeamento de Gargalos",
      "Implementação de Stack de IA Sob Medida",
      "Produção de Conteúdo Premium com IA",
      "Fluxos Escaláveis para a Equipe",
      "Treinamento In-loco ou Remoto",
      "Autonomia: Você sai funcionando, não dependente"
    ],
    detailsType: "list",
    category: "Inovação & Tech"
  },
  {
    id: 4,
    title: "ABSOLUTE CINEMA™",
    subtitle: "Conteúdo que não precisa de contexto para impactar.",
    description: "Toda empresa tem uma história melhor do que imagina. O trabalho aqui é encontrar a sua essência e contá-la do jeito certo — transformando trajetória em narrativa inesquecível. Não entrego um vídeo institucional. Entrego o argumento audiovisual que abre portas, gera autoridade e fica na memória de quem importa.",
    icon: Clapperboard,
    color: "#FF6B35",
    fromClass: "from-[#FF6B35]",
    image: "/assets/service_cinema_masp.png",
    features: [
      "Filmes Institucionais & Documentários",
      "Storytelling de Marca & Cases de Sucesso",
      "Séries para YouTube e Reels",
      "Roteirização e Direção Criativa",
      "Media Training para Executivos",
      "Cobertura de Eventos Internacionais"
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
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>04</span>
            <div>
              <div className="tech-badge mb-2">
                <Sparkles size={12} />
                <span>GALERIA DE PRODUTOS</span>
              </div>
              <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                Soluções <br />
                <span className="gradient-text-cyan">Estratégicas</span>
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
          <p className="text-[#8892A4] mt-4 ml-[calc(clamp(4rem,10vw,8rem)+1rem)] max-w-xl text-base leading-relaxed">
            Clique no card para revelar a obra completa e explorar todos os entregáveis e métodos.
          </p>
        </div>

        {/* Gallery Grid — Immersive Exhibition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((svc, i) => {
            const isExpanded = activeService === svc.id;

            return (
              <div 
                key={svc.id}
                className={`relative rounded-2xl bg-[#0F1623] border border-[rgba(255,255,255,0.08)] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] transition-all duration-500 group cursor-pointer ${
                  isExpanded ? "ring-1 border-opacity-100 shadow-[0_0_40px_rgba(0,0,0,0.8)]" : "hover:border-opacity-30 hover:-translate-y-1.5"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  borderColor: isExpanded ? svc.color : undefined,
                  transitionDelay: `${i * 100}ms`,
                  boxShadow: isExpanded ? `0 0 35px ${svc.color}25` : undefined
                }}
                onClick={() => setActiveService(isExpanded ? null : svc.id)}
              >
                {/* Colored Top Border Line */}
                <div 
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${svc.color}, transparent)` }}
                />

                {/* 1. MEDIA CONTAINER */}
                <div className={`relative w-full overflow-hidden transition-all duration-700 bg-[#080C14] ${
                  isExpanded ? "aspect-[16/9] sm:aspect-[16/9]" : "aspect-[16/10] sm:aspect-[16/9]"
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
