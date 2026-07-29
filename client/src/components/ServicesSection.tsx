import { useEffect, useRef, useState } from "react";
import { Network, Activity, BrainCircuit, Clapperboard, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
import LeadFormModal from "./LeadFormModal";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";

const services = [
  {
    id: 1,
    title: "MASTER PLAN™",
    subtitle: "Planejamento de Comunicação, Marketing e Conteúdo.",
    description: "Todo negócio que cresce tem uma coisa em comum: sabe exatamente o que quer dizer, para quem, quando e como. O MASTER PLAN é o plano de comunicação completo — do diagnóstico à execução — construído para quem cansou de improvisar e quer resultados previsíveis.",
    icon: Network,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_plano_diretor.jpg",
    features: [
      "Raio-X de Comunicação",
      "Bússola de Prioridades (UTIO)",
      "Arquitetura Editorial",
      "Calendário Editorial",
      "Framework de E-mail Marketing",
      "Consultoria Estratégica"
    ],
    detailsType: "utio",
    category: "Comunicação"
  },
  {
    id: 2,
    title: "ID CONCEPT™",
    subtitle: "Branding, Reposicionamento e Comunicação Visual.",
    description: "Existe uma diferença entre uma marca que tem um logo bonito e uma marca com uma identidade que entra na cabeça das pessoas e não sai. O ID CONCEPT nasce de um conceito. Antes de qualquer cor ou tipografia, existe uma ideia central que define quem você é no mercado — e como isso vai aparecer em absolutamente tudo.",
    icon: Activity,
    color: "#C9A84C",
    fromClass: "from-[#C9A84C]",
    image: "/assets/service_marca_viva.jpg",
    features: [
      "Branding e Rebranding",
      "Identidade Visual e Manual de Marca",
      "Direção de Arte e Estética Proprietária",
      "Posicionamento e Tom de Voz",
      "UX Writing e Copy",
      "SEO On-page"
    ],
    detailsType: "list",
    category: "Branding"
  },
  {
    id: 3,
    title: "I.A.E!™",
    subtitle: "Inteligência Artificial Estratégica.",
    description: "A maioria das empresas ainda trata a IA como curiosidade. O I.A.E! implanta inteligência artificial na operação real do seu negócio: nos processos que consomem tempo, na comunicação que deveria ser automática, nos fluxos que travam sua equipe toda semana. Você sai com sistemas funcionando — não com uma apresentação de slides.",
    icon: BrainCircuit,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_inteligencia_artificial.jpg",
    features: [
      "Diagnóstico de IA",
      "Mapeamento de Processos",
      "Automações e Fluxos de IA",
      "Agentes GPT Personalizados",
      "Prompt Engineering",
      "Capacitação de Equipes"
    ],
    detailsType: "list",
    category: "Inovação & Tech"
  },
  {
    id: 4,
    title: "Absolute Cinema™",
    subtitle: "Contar a história da sua empresa através de storytelling corporativo autêntico.",
    description: "Toda empresa tem uma história melhor do que imagina. O trabalho aqui é encontrar a sua essência e contar a história da sua empresa do jeito certo, transformando sua trajetória numa narrativa inesquecível. Como contador de histórias, não entrego só um vídeo institucional — entrego storytelling B2B, emoção e conexão real.",
    icon: Clapperboard,
    color: "#FF6B35",
    fromClass: "from-[#FF6B35]",
    image: "/assets/service_absolute_cinema.jpg",
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

              <div className="relative w-full h-full bg-[#0F1623] rounded-[10px] overflow-hidden flex flex-col z-10">
                
                {/* Capa do Serviço (Header Image) */}
                <div className="relative h-48 w-full overflow-hidden shrink-0 border-b border-[rgba(255,255,255,0.05)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] to-transparent z-10" />
                  <img src={svc.image} alt={svc.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                  <div 
                    className="absolute bottom-4 left-6 z-20 w-12 h-12 rounded-xl flex items-center justify-center border bg-[#0F1623]/80 backdrop-blur-md shadow-lg"
                    style={{ borderColor: `${svc.color}40`, color: svc.color }}
                  >
                    <svc.icon size={22} />
                  </div>
                </div>

                <div className="flex-1 p-6 flex flex-col">
                  <div className="mb-4">
                    <h3 className="font-display font-800 text-xl text-[#F0F4FF] leading-tight mb-1 group-hover:text-white transition-colors duration-200">
                      {svc.title}
                    </h3>
                    <p className="text-xs font-mono-tech tracking-widest uppercase font-semibold mt-1" style={{ color: svc.color }}>
                      {svc.subtitle}
                    </p>
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
