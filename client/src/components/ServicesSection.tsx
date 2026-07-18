import { useEffect, useRef, useState } from "react";
import { Network, Activity, BrainCircuit, Clapperboard, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import LeadFormModal from "./LeadFormModal";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";

const services = [
  {
    id: 1,
    title: "Plano Diretor de Comunicação",
    subtitle: "Diagnóstico, prioridade e direção para quem precisa comunicar com clareza.",
    description: "Todo negócio tem urgências, oportunidades e coisas que vive adiando. O problema não é falta de conteúdo — é falta de direção sobre o que fazer primeiro. O Plano Diretor de Comunicação começa com um raio-X do seu negócio e termina com um mapa claro: o que comunicar, quando, e por onde.",
    icon: Network,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    features: [
      "Raio-X de Comunicação",
      "Bússola de Prioridade (método UTIO)",
      "Arquitetura Editorial",
      "Calendário Editorial",
      "Matrizes de E-mail e Landing Pages",
      "Consultoria Estratégica"
    ],
    detailsType: "utio",
    category: "Comunicação"
  },
  {
    id: 2,
    title: "Marca Viva",
    subtitle: "Construção de identidades que transmitem confiança e evoluem.",
    description: "Não adianta ter um logo bonito se o site, as redes e a apresentação falam línguas diferentes. Marca Viva é o processo de construir — ou reconstruir — uma identidade coerente, do posicionamento à experiência digital.",
    icon: Activity,
    color: "#C9A84C",
    fromClass: "from-[#C9A84C]",
    features: [
      "Branding e Rebranding",
      "Identidade Visual e Manual de Marca",
      "Direção de Arte",
      "Desenvolvimento de Sites Responsivos",
      "UX Writing e Copy",
      "SEO On-page"
    ],
    detailsType: "list",
    category: "Branding"
  },
  {
    id: 3,
    title: "Inteligência Artificial (iAI)",
    subtitle: "Descubra como a IA pode escalar a produtividade da sua equipe.",
    description: "Me diga o que você precisa que eu te direi qual Inteligência Artificial você precisa comprar ou aprender a utilizar. Criamos fluxos de trabalho, integramos automações e fazemos treinamentos práticos para equipes de comunicação.",
    icon: BrainCircuit,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    features: [
      "Curadoria de Ferramentas de IA",
      "Automação de Fluxos de Trabalho",
      "Integração de Sistemas",
      "Treinamento para Equipes",
      "Aumento de Produtividade",
      "Consultoria em Inovação"
    ],
    detailsType: "list",
    category: "Inovação & Tech"
  },
  {
    id: 4,
    title: "Absolute Cinema™",
    subtitle: "Histórias autênticas que criam marcas memoráveis.",
    description: "Toda empresa tem uma história melhor do que ela imagina. O trabalho aqui é encontrar qual é essa história e contar do jeito certo. Não é sobre gravar um vídeo institucional — é sobre emoção, autenticidade e conexão B2B.",
    icon: Clapperboard,
    color: "#FF6B35",
    fromClass: "from-[#FF6B35]",
    features: [
      "Filmes Institucionais & Documentários",
      "Storytelling de Marca & Cases de Sucesso",
      "Séries para YouTube e Reels",
      "Roteirização e Direção Criativa",
      "Media Training para Executivos",
      "Desenvolvimento de Quadros"
    ],
    detailsType: "list",
    category: "Audiovisual"
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
              <div className="tech-badge mb-2">Consultoria</div>
              <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                Soluções <br />
                <span className="gradient-text-cyan">Estratégicas</span>
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
          <p className="text-[#8892A4] mt-4 ml-[calc(clamp(4rem,10vw,8rem)+1rem)] max-w-lg">
            Diagnóstico, branding, inteligência artificial e produção audiovisual: serviços estruturados para elevar o patamar do seu negócio.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((svc, i) => (
            <div 
              key={svc.id}
              className={`relative p-[1px] rounded-xl bg-gradient-to-br ${svc.fromClass} to-transparent shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-700 cursor-pointer group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => setActiveService(activeService === svc.id ? null : svc.id)}
            >
              {/* Neon Glow overlay */}
              <div 
                className="absolute inset-0 rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${svc.color}, transparent)` }}
              />

              <div className="relative w-full h-full bg-[#0F1623] rounded-[10px] overflow-hidden flex flex-col p-8 z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div 
                    className="w-14 h-14 rounded-full flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                    style={{ borderColor: `${svc.color}40`, backgroundColor: `${svc.color}10`, color: svc.color }}
                  >
                    <svc.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-display font-800 text-xl text-[#F0F4FF] leading-tight mb-2 group-hover:text-white transition-colors duration-200">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-mono-tech tracking-widest uppercase" style={{ color: svc.color }}>
                      {svc.category}
                    </p>
                  </div>
                </div>

                <p className="text-[#8892A4] text-sm leading-relaxed mb-6 font-outfit">
                  {svc.description}
                </p>

                <div className="mt-auto">
                  <div 
                    className="inline-flex items-center gap-1.5 font-mono-tech text-[0.65rem] tracking-widest uppercase px-3 py-1.5 border transition-all duration-300"
                    style={{ 
                      color: svc.color, 
                      backgroundColor: `${svc.color}05`, 
                      borderColor: `${svc.color}20` 
                    }}
                  >
                    {activeService === svc.id ? (
                      <>
                        <ChevronUp size={14} />
                        <span>[-] Fechar Detalhes</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} />
                        <span>[+] Ver Entregáveis</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Expandable content */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    activeService === svc.id ? "max-h-[1000px] opacity-100 mt-6 pt-6 border-t border-[rgba(255,255,255,0.05)]" : "max-h-0 opacity-0"
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h4 className="text-[#F0F4FF] font-semibold text-sm mb-4">Serviços Incluídos:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {svc.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#8892A4]">
                        <CheckCircle2 size={14} style={{ color: svc.color }} className="flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {svc.detailsType === "utio" && (
                    <div className="bg-[#080C14] p-4 border rounded-md mb-6" style={{ borderColor: `${svc.color}30` }}>
                      <h5 className="font-mono-tech text-xs uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: svc.color }}>
                        <Network size={14} /> Bússola de Prioridade (Método UTIO)
                      </h5>
                      <div className="mt-4 flex justify-center">
                        <img src="/assets/bussola_prioridade_utio.svg" alt="Bússola de Prioridade UTIO" className="w-full max-w-sm drop-shadow-[0_0_15px_rgba(0,212,255,0.2)]" />
                      </div>
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      setSelectedProductTitle(svc.title);
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[rgba(255,255,255,0.03)] border transition-colors hover:bg-[rgba(255,255,255,0.08)] font-mono-tech text-xs tracking-widest uppercase"
                    style={{ borderColor: `${svc.color}40`, color: svc.color }}
                  >
                    Solicitar Orçamento
                  </button>
                </div>
              </div>
            </div>
          ))}
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
