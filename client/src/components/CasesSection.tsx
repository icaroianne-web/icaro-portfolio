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
    tag: "Gestão Pública & Crise",
    icon: Building2,
    title: "Prefeitura de Santa Fé do Sul",
    subtitle: "Estratégia Ágil, Contenção de Danos e Mobilização Comunitária",
    year: "2020-2024",
    location: "São Paulo, Brasil",
    desafio: "A gestão da Prefeitura de Santa Fé do Sul enfrentou desafios simultâneos e heterogêneos: criar, em apenas uma semana, a campanha audiovisual do maior projeto turístico da história da cidade (Orla do Sol); conter o iminente pânico populacional durante uma crise hídrica severa; administrar o alto volume de desinformação e a sobrecarga dos canais de atendimento durante a pandemia de Covid-19; e manter a população culturalmente ativa e unida durante o isolamento social.",
    execucao: "Para a Orla do Sol, roteirizei, captei (com drone) e editei um material cinematográfico mesclando imagens reais e projetos 3D, utilizado na busca por emendas parlamentares. Na crise hídrica, conduzi cobertura in loco das obras emergenciais (poço profundo) com boletins diários de transparência. Na saúde pública, desenvolvi um chatbot no WhatsApp para envio automático de boletins, datas de vacinação e triagem de sintomas. No campo cultural, criei o canal da SECTUR no YouTube e produzi quadros inéditos — Memórias, Rolê da Estância e Biblioteca em Casa — voltados à valorização da história local, do turismo e da leitura infantil.",
    impacto: "A campanha da Orla do Sol elevou a credibilidade da proposta, escalando-a da esfera estadual à pauta federal — hoje o projeto está em execução com recursos da União. A transparência em tempo real na crise hídrica consolidou a confiança na gestão, e o acervo gerado funcionou como combustível estratégico de campanha, contribuindo para a reeleição do prefeito com aprovação histórica de 70%. O chatbot foi peça-chave na logística que alcançou 90% de cobertura vacinal entre o público adulto, superando as metas estaduais. Como legado, o canal oficial de Turismo no YouTube segue ativo, com vídeos orgânicos somando quase 6 mil visualizações locais.",
    results: ["Recursos Federais", "90% Cobertura Vacinal", "70% Aprovação Pública", "Canal SECTUR (YouTube)"],
    color: "#00D4FF",
    image: null,
    // TODO: substituir/complementar pelos arquivos reais (Orla do Sol, crise hídrica, chatbot, canal SECTUR)
    evidences: [
      { type: "image", url: "/assets/orla_1.jpg", caption: "Orla do Sol: Direção de Produção em Campo (Drone)" },
      { type: "image", url: "/assets/orla_2.jpg", caption: "Orla do Sol: Material Entregue para Emendas Parlamentares" }
    ] as Evidence[]
  },
  {
    id: 2,
    tag: "Impacto Global",
    icon: Globe,
    title: "COP28 Dubai — EDS",
    subtitle: "Comunicação de Impacto: Da Amazônia ao Palco Global da ONU",
    year: "2023",
    location: "Dubai, Emirados Árabes",
    desafio: "Agências parceiras não dominavam a complexidade do tema indígena, o que gerava propostas inadequadas e retrabalho constante. Na COP28, a primeira ONG de saúde a participar historicamente de uma conferência climática da ONU precisava transformar programas puramente técnicos em produtos visuais robustos, capazes de atrair investidores de alto escalão. O desafio central era tangibilizar, em números, para líderes mundiais do clima, a relação direta entre saúde indígena e preservação ambiental.",
    execucao: "Criei um Guia de Governança Indígena focado em povos isolados, padronizando nomenclaturas e estabelecendo diretrizes éticas rigorosas para uso de imagens e hierarquia de órgãos competentes. Empacotei a ONG em cardápios de investimento e catálogos premium, e armei a equipe, na própria COP28, com iPads contendo vídeos cinematográficos e dossiês compartilháveis via QR Code — um verdadeiro arsenal transmídia de pitch de guerrilha. A narrativa central utilizou o coeficiente de retenção de carbono das terras demarcadas como moeda de valor, demonstrando que o indígena saudável representa a maior barreira de preservação da Amazônia.",
    impacto: "O alinhamento reduziu a zero o retrabalho das agências parceiras, e o Guia de Governança passou a integrar o Manual de Conduta oficial dos médicos voluntários da ONG. A apresentação transmídia institucional pavimentou a recepção da ONG pelo presidente da COP28 e resultou no prêmio de Inovação Tecnológica, pelo Centro Cirúrgico Móvel. A narrativa do carbono, aliada ao cardápio de investimentos, aumentou em 15% a base de doadores internacionais e viabilizou parcerias com indústrias farmacêuticas para as próximas expedições.",
    results: ["Primeira ONG (COP28)", "+15% Doações Internacionais", "Coeficiente de Carbono", "Guia de Governança"],
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
    id: 3,
    tag: "Rebranding & Growth",
    icon: TrendingUp,
    title: "Finamac Global",
    subtitle: "A Revolução \"Ice Tech\" e a Construção de uma Máquina de Vendas",
    year: "2025/2026",
    location: "Brasil",
    desafio: "Equipamentos de altíssima tecnologia e design arrojado não tinham a identidade visual premium que mereciam. A marca sobrevivia de conteúdo estagnado, \"requentando\" vídeos antigos de baixa qualidade e ritmo ultrapassado. O time comercial estava afogado em uma base de leads antiga, sem campanhas ativas rodando, e a falta de processos e alinhamento entre Engenharia, Marketing e Comercial criava silos internos.",
    execucao: "Criei do zero o conceito Ice Tech, unindo a pureza do gelo à performance tecnológica — inspirado na estética Tesla, transformando as máquinas em objetos de desejo. Lancei o TikTok da marca com receitas virais e criei o quadro \"Pessoas que são Máquinas de Sucesso\" no YouTube, pulverizando cortes nas redes sociais, além de transmissões ao vivo de workshops direto do showroom e do laboratório técnico. Estruturei campanhas de aquisição (Meta e Google Ads) integradas ao HubSpot para atrair leads qualificados, e implementei fluxos ágeis de governança entre Engenharia, Marketing e Comercial, com rituais de aprovação e uma arquitetura editorial robusta.",
    impacto: "A estética Ice Tech, aliada à nova esteira de conteúdo, gerou crescimento de 19% na audiência, +27% de engajamento e +31% em novos leads (valores estimados do período). As metas de vendas foram batidas mesmo durante o cenário de instabilidade tarifária. Culturalmente, o conceito consolidou orgulho interno e uniu a equipe em torno do BYB (Build Your Business) Dream Team.",
    results: ["Conceito Ice Tech", "Estética Tesla", "TikTok & YouTube", "+31% Novos Leads", "HubSpot & Ads"],
    color: "#FF6B35",
    image: null,
    // TODO: substituir pelos arquivos reais (antes/depois de redes sociais, site e produto; cortes do TikTok/YouTube)
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