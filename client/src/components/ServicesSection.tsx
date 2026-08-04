import { useEffect, useRef, useState } from "react";
import { Network, Activity, BrainCircuit, Clapperboard, ChevronDown, ChevronUp, CheckCircle2 } from "lucide-react";
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
    image: "/assets/service_plano_diretor.jpg",
    features: [
      "Raio-X de Comunicação",
      "Método UTIO: Bússola de Prioridades",
      "Arquitetura e Calendário Editorial",
      "Governança e Gestão de Crises",
      "Framework de E-mail Marketing",
      "Consultoria Estratégica Contínua"
    ],
    detailsType: "utio",
    category: "Comunicação"
  },
  {
    id: 2,
    title: "ID CONCEPT™",
    subtitle: "Definimos quem você é antes que o mercado decida por você.",
    description: "Não começo pelo logo. Começo pelo conceito — a ideia central que define sua posição no mercado e onde você quer ser visto daqui a 10 anos. Daí nasce tudo: a estética, a linguagem, o site conceitual premium e até a denominação que você ainda não tinha para si mesmo. Uma identidade que não é apenas bonita — é um argumento comercial.",
    icon: Activity,
    color: "#C9A84C",
    fromClass: "from-[#C9A84C]",
    image: "/assets/service_marca_viva.jpg",
    features: [
      "Conceito de Marca e Naming Estratégico",
      "Identidade Visual e Manual de Marca",
      "Site Conceitual Premium & Funcional",
      "Direção de Arte e KV (Key Visual)",
      "Posicionamento, Tom de Voz e Copy",
      "Direcionamento de Pauta e Presença Pública"
    ],
    detailsType: "list",
    category: "Branding"
  },
  {
    id: 3,
    title: "I.A.E!™",
    subtitle: "Sua equipe produzindo em dobro. Seu custo produzindo pela metade.",
    description: "A maioria das empresas usa IA para experimentar. Eu uso para escalar. O I.A.E! implanta inteligência artificial no fluxo real da sua operação — com realismo, qualidade e identidade de marca intactos. Saída de conteúdo premium em fração do tempo, equipe treinada e autônoma, e processos que continuam funcionando quando você não está. Produção inteligente também é produção consciente.",
    icon: BrainCircuit,
    color: "#00D4FF",
    fromClass: "from-[#00D4FF]",
    image: "/assets/service_inteligencia_artificial.jpg",
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
    title: "Absolute Cinema™",
    subtitle: "Conteúdo que não precisa de contexto para impactar.",
    description: "Toda empresa tem uma história melhor do que imagina. O trabalho aqui é encontrar a sua essência e contá-la do jeito certo — transformando trajetória em narrativa inesquecível. Não entrego um vídeo institucional. Entrego o argumento audiovisual que abre portas, gera autoridade e fica na memória de quem importa.",
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
      "Cobertura de Eventos Internacionais"
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
            Cada projeto começa por uma pergunta: onde você quer chegar? O resto é método.
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
                    <UtioMethodHorizontal />
                  )}

                  <button 
                    onClick={() => {
                      setSelectedProductTitle(svc.title);
                      setIsModalOpen(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[rgba(255,255,255,0.03)] border transition-colors hover:bg-[rgba(255,255,255,0.08)] font-mono-tech text-xs tracking-widest uppercase"
                    style={{ borderColor: `${svc.color}40`, color: svc.color }}
                  >
                    Agendar Conversa Estratégica
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
