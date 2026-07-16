/* ============================================================
   DESIGN: "Deep Space Broadcast" — Cases Section
   Grid simétrico com Dossiê Transmídia, Indicador UX e Imagens Reais do Site da EDS
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Globe, Building2, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import EvidenceGallery, { type Evidence } from "./EvidenceGallery";

const CASES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/cases-bg-QeazzTAEWuWpntiEmDoMC7.webp";
const DUBAI_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/dubai-cop28-54NchRQcmNgEMvWqnqgHxH.webp";

const cases = [
  {
    id: 1,
    tag: "Internacional",
    icon: Globe,
    title: "COP28 — Dubai (EDS)",
    subtitle: "Do Atendimento na Amazônia ao Palco Global da ONU",
    year: "2023",
    location: "Dubai, Emirados Árabes",
    desafio: "Primeira ONG de saúde da história convidada a palestrar em uma COP da ONU. O desafio era converter programas assistenciais complexos de saúde indígena em 'produtos institucionais' claros, atraentes e de rápido entendimento para lideranças globais e investidores internacionais sob o ritmo frenético e escasso de tempo da conferência climática.",
    execucao: "Criação de identidade visual própria para os programas sociais (4 logotipos exclusivos), desenvolvimento de materiais editoriais premium bilíngues (Catálogo Editorial, Menu Institucional e Cardápio Estratégico de captação) e produção do vídeo de abertura da COP28. Liderou o desenvolvimento do Guia de Comunicação para Povos Indígenas, realizando o compliance das diretrizes do Governo Federal para orientar as agências prestadoras de serviço sobre práticas éticas, narrativas e respeito cultural em campo.",
    impacto: "Reconhecimento institucional de alto nível perante a OMS e FUNAI, consolidação mundial da saúde indígena como eixo central da preservação ambiental e aumento expressivo no volume de captação de recursos. O Guia de Comunicação tornou-se referência de governança de marca, sendo amplamente elogiado e chancelado pelas próprias lideranças indígenas.",
    results: ["Compliance de Marca", "Estratégia Bilíngue", "Liderança Étnico-Cultural"],
    color: "#C9A84C",
    image: DUBAI_IMG,
    // TODO: adicionar vídeos de produção da COP28 (evidences do tipo "video")
    evidences: [
      { type: "image", url: "https://eds.org.br/wp-content/uploads/2023/11/programa-eds-card-01.webp", caption: "Produto 01: Centro Cirúrgico Móvel (Tecnologia Social)" },
      { type: "image", url: "https://eds.org.br/wp-content/uploads/2023/11/programa-eds-card-02.webp", caption: "Produto 02: Saúde da Mulher Indígena" },
      { type: "image", url: "https://eds.org.br/wp-content/uploads/2023/11/programa-eds-card-03.webp", caption: "Produto 03: Ortopedia e Reabilitação na Amazônia" },
      { type: "image", url: "https://eds.org.br/wp-content/uploads/2023/11/programa-eds-card-04.webp", caption: "Produto 04: Telemedicina e Conectividade de Guardiões" },
      { type: "image", url: "https://eds.org.br/wp-content/uploads/2023/11/programa-eds-card-05.webp", caption: "Produto 05: Infraestrutura de Unidades de Saúde" }
    ] as Evidence[]
  },
  {
    id: 2,
    tag: "Governo Federal",
    icon: Building2,
    title: "Projeto Orla do Sol",
    subtitle: "Produção Audiovisual Estratégica para Ministérios",
    year: "2022",
    location: "Brasília, Brasil",
    desafio: "Janela de tempo criticamente escassa para estruturar, captar em campo, roteirizar e editar um projeto audiovisual institucional complexo e de altíssima exigência técnica, demandado com urgência para apresentação estratégica e validação interna dentro de Ministérios federais.",
    execucao: "Implementação de uma força-tarefa ágil de produção audiovisual de ponta. Coordenação de captação externa acelerada combinada a uma pós-produção em tempo recorde, fundindo uma narrativa documental altamente impactante com o rigor técnico, relatórios e prazos exigidos pelas pastas governamentais.",
    impacto: "Aprovação unânime e imediata do projeto escrito e exibição oficial do material audiovisual nos Ministérios em Brasília, assegurando a chancela institucional da iniciativa, o cumprimento do cronograma governamental e a liberação de fluxos subsequentes.",
    results: ["Gestão de Prazo Crítico", "Audiovisual de Elite", "Articulação Técnica"],
    color: "#00D4FF",
    image: null,
    evidences: [
      { type: "image", url: "/assets/orla_1.jpg", caption: "Direção de Produção em Campo" },
      { type: "image", url: "/assets/orla_2.jpg", caption: "Material Entregue nos Ministérios" }
    ] as Evidence[]
  },
  {
    id: 3,
    tag: "Rebranding & Growth",
    icon: TrendingUp,
    title: "Global",
    subtitle: "Finamac Global: De Commodity a Produto Premium",
    year: "2025/2026",
    location: "Brasil", // TODO: confirmar cidade/UF a exibir
    desafio: "As maquininhas de pagamento da Finamac Global eram percebidas e comercializadas como produto de baixo custo — sem diferenciação estética, tecnológica ou de marca frente à concorrência do setor.",
    execucao: "Reestruturação completa da identidade visual do produto, elevando-o a um patamar premium — na mesma lógica de marcas de referência em design no varejo de eletrodomésticos, onde tecnologia e design deixam de ser suporte e passam a ser o próprio argumento de venda. Para viabilizar o novo volume de produção de peças multimídia com uma equipe reduzida, foram integradas ferramentas de IA à automação criativa. Em paralelo, implementou-se automação de campanhas via HubSpot, robustecendo o CRM, e conduziu-se a migração do site institucional para uma plataforma bivalente (institucional + e-commerce, via Shopify).",
    impacto: "Aumento de 22% no número de novos leads gerados, com CRM e captação de leads significativamente mais robustos e escaláveis.",
    results: ["+22% Novos Leads", "Rebranding Premium", "Automação com IA", "HubSpot + Shopify"],
    color: "#FF6B35",
    image: null,
    // TODO: substituir pelos arquivos reais (antes/depois de redes sociais, site e produto)
    evidences: [
      // { type: "before_after", before: "/assets/global_social_antes.jpg", after: "/assets/global_social_depois.jpg", caption: "Redes Sociais: Antes x Depois" },
      // { type: "before_after", before: "/assets/global_site_antes.jpg", after: "/assets/global_site_depois.jpg", caption: "Site Institucional: Antes x Depois" },
      // { type: "before_after", before: "/assets/global_produto_antes.jpg", after: "/assets/global_produto_depois.jpg", caption: "Apresentação do Produto: Antes x Depois" },
    ] as Evidence[]
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

export default function CasesSection() {
  const { ref, inView } = useInView();
  const [activeCase, setActiveCase] = useState<number | null>(null);

  return (
    <section id="cases" className="relative py-24 overflow-hidden bg-[#080C14]">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={CASES_BG} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#080C14]/90 to-[#080C14]" />
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
            Projetos estratégicos de alto impacto — do âmbito local ao palco diplomático internacional.
          </p>
        </div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <div
              key={item.id}
              className={`case-card group cursor-pointer transition-all duration-500 flex flex-col justify-between ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActiveCase(activeCase === item.id ? null : item.id)}
            >
              <div>
                {/* Imagem de topo para COP28 */}
                {item.image && (
                  <div className="relative h-48 overflow-hidden border-b border-[rgba(0,212,255,0.08)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className="tech-badge" style={{ borderColor: `${item.color}40`, color: item.color, backgroundColor: "#0F1623" }}>
                        {item.tag}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6">
                  {!item.image && (
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono-tech text-[0.6rem] uppercase tracking-widest" style={{ color: item.color }}>
                        {item.tag}
                      </span>
                      <div className="font-mono-tech text-[0.65rem] text-[#8892A4]">{item.year}</div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 mb-4">
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
                      {item.image && <div className="font-mono-tech text-[0.65rem] text-[#8892A4]">{item.year}</div>}
                      <h3 className="font-display font-800 text-base text-[#F0F4FF] leading-tight group-hover:text-[#00D4FF] transition-colors duration-200">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-[#8892A4] text-xs mb-3 font-outfit leading-relaxed">{item.subtitle}</p>

                  {/* INDICADOR INTERATIVO DE CLIQUE UX */}
                  <div 
                    className="inline-flex items-center gap-1.5 font-mono-tech text-[0.6rem] tracking-widest uppercase mb-4 px-2.5 py-1 bg-[rgba(0,212,255,0.02)] border border-[rgba(0,212,255,0.12)] transition-all duration-300 text-[#00D4FF] group-hover:text-[#FF6B35] group-hover:border-[#FF6B35]/40"
                  >
                    {activeCase === item.id ? (
                      <>
                        <ChevronUp size={12} />
                        <span>[-] Fechar Dossiê</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown size={12} />
                        <span>[+] Clique para Abrir o Case</span>
                      </>
                    )}
                  </div>

                  {/* Dossiê Expandido */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeCase === item.id ? "max-h-[1200px] opacity-100 pt-4 border-t border-[rgba(0,212,255,0.08)]" : "max-h-0 opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-4 text-xs leading-relaxed text-[#8892A4] font-outfit">
                      <div>
                        <strong className="text-[#00D4FF] block mb-1 font-display tracking-wide uppercase text-[0.7rem]">⚡ O DESAFIO</strong>
                        <p>{item.desafio}</p>
                      </div>
                      <div>
                        <strong className="text-[#C9A84C] block mb-1 font-display tracking-wide uppercase text-[0.7rem]">🛠️ A EXECUÇÃO</strong>
                        <p>{item.execucao}</p>
                      </div>
                      <div>
                        <strong className="text-[#FF6B35] block mb-1 font-display tracking-wide uppercase text-[0.7rem]">📈 O IMPACTO</strong>
                        <p>{item.impacto}</p>
                      </div>
                    </div>

                    {/* Módulo de Evidências: abas exibidas conforme conteúdo disponível */}
                    {item.evidences && item.evidences.length > 0 && (
                      <EvidenceGallery evidences={item.evidences} color={item.color} />
                    )}

                    {/* Tags Finais */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {item.results.map((r) => (
                        <span
                          key={r}
                          className="px-2 py-0.5 text-[0.6rem] font-mono-tech tracking-wide"
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
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="flex items-center justify-between pt-3 border-t border-[rgba(0,212,255,0.05)]">
                  <div className="flex items-center gap-2">
                    <Globe size={11} className="text-[#8892A4]" />
                    <span className="font-mono-tech text-[0.65rem] text-[#8892A4]">{item.location}</span>
                  </div>
                  <ExternalLink size={12} className="text-[#8892A4] group-hover:text-[#00D4FF] transition-colors duration-200" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a href="https://wa.me/5511940684068" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex text-xs">
            Vamos criar juntos o próximo case de sucesso?
          </a>
        </div>
      </div>
    </section>
  );
}