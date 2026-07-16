/* ============================================================
   DESIGN: "Deep Space Broadcast" — Cases Section
   Grid simétrico com Dossiê Transmídia, Indicador UX e Imagens Reais do Site da EDS
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Globe, Building2, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import EvidenceGallery, { type Evidence } from "./EvidenceGallery";

const CASES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/cases-bg-QeazzTAEWuWpntiEmDoMC7.webp";

const cases = [
  {
    id: 1,
    tag: "Gestão Pública & Crise",
    icon: Building2,
    title: "Prefeitura de Santa Fé do Sul",
    subtitle: "Estratégia Ágil, Contenção de Danos e Mobilização Comunitária",
    year: "2020-2024",
    location: "São Paulo, Brasil",
    desafios: [
      "Prazo Crítico de Entrega: Assumi a assessoria de comunicação a apenas quatro dias da entrega da campanha audiovisual do maior projeto turístico da história da cidade (Orla do Sol), cuja proposta ainda estava em fase de formulação e precisava ser viabilizada com urgência para captação de emendas parlamentares.",
      "Crise Hídrica Severa: Necessidade de conter o iminente pânico populacional e garantir transparência em tempo real sobre as obras de engenharia emergencial (poço profundo) da prefeitura.",
      "Combate à Desinformação na Pandemia: Administrar o alto volume de boatos/fake news e a sobrecarga de atendimentos dos canais de saúde pública durante a Covid-19.",
      "Isolamento Social & Engajamento Cultural: Manter a comunidade culturalmente ativa, unida e informada de forma dinâmica durante os meses de isolamento social."
    ],
    solucoes: [
      "Imersão & Produção Audiovisual Acelerada: Roteirizei, editei, inseri trilha sonora e criei a marca oficial da Orla do Sol em tempo recorde (símbolo oficial até hoje). Incluí uma animação georreferenciada com planta 3D da orla para busca de emendas.",
      "Boletins Diários de Transparência: Conduzi cobertura jornalística in loco das obras emergenciais com informativos diários em vídeo direto do campo, estabelecendo um canal direto e confiável com a população.",
      "Chatbot de Triagem e Informação: Desenvolvi e implementei um chatbot automatizado no WhatsApp para triagem de sintomas de Covid-19, envio de boletins epidemiológicos e agendamentos de vacinação.",
      "Programas Digitais SECTUR: Criei o canal de Turismo no YouTube e produzi programas originais ('Memórias', 'Rolê da Estância', 'Biblioteca em Casa') para valorização cultural e estímulo à leitura infantil."
    ],
    impactos: [
      "Credibilidade e Recursos Federais: A campanha elevou a credibilidade da proposta, que avançou do nível estadual (Invest-SP) para o federal. Hoje, o projeto está em execução com recursos da União.",
      "Estabilidade e Aprovação Histórica (70%): A transparência da crise de abastecimento combateu a desinformação. O acervo serviu como ativo na campanha eleitoral, contribuindo para a reeleição histórica do prefeito.",
      "90% de Cobertura Vacinal: O chatbot otimizou a comunicação e a logística de vacinação de Covid-19, permitindo que a cidade superasse as metas de imunização do estado de São Paulo.",
      "Legado de Audiência e Acervo: O canal oficial de Turismo permanece ativo no YouTube, servindo como patrimônio histórico digital com milhares de visualizações orgânicas."
    ],
    results: ["Recursos Federais", "90% Cobertura Vacinal", "70% Aprovação Pública", "Canal SECTUR (YouTube)"],
    color: "#00D4FF",
    image: "/assets/orla_rota_aerea_mapa.png",
    evidences: [
      { type: "image", url: "/assets/orla_lancamento_video.png", caption: "Lançamento oficial do Programa Orla do Sol (Facebook, mar/2021)" },
      { type: "image", url: "/assets/orla_render_3d_projeto.png", caption: "Identidade visual criada + renders 3D da avenida (ciclovia e orla)" },
      { type: "image", url: "/assets/orla_rota_aerea_mapa.png", caption: "Mapeamento aéreo do traçado da Avenida Orla do Sol" },
      { type: "image", url: "/assets/orla_apresentacao_sp_secretario.png", caption: "Apresentação em São Paulo ao Secretário Estadual de Turismo (jul/2021)" }
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
    desafios: [
      "Desalinhamento Criativo e Retrabalho: Agências parceiras não dominavam a complexidade e sensibilidade do tema indígena, gerando propostas inadequadas e retrabalho constante para o time da ONG.",
      "Tradução de Projetos Complexos sob Pressão: Como convidada especial da COP28 pelo próprio presidente da conferência (Sultão Al Jaber), a EDS precisava converter programas assistenciais de saúde em produtos de comunicação claros e atraentes em tempo recorde.",
      "Tangibilização do Impacto Climático: Como provar em números, para líderes mundiais do clima e grandes investidores na COP28, que a saúde indígena é diretamente responsável pela preservação ambiental?"
    ],
    solucoes: [
      "Guia de Governança Indígena: Criei um manual focado em povos isolados que padronizou nomenclaturas e estabeleceu diretrizes éticas rigorosas para imagens e hierarquia de órgãos competentes.",
      "Arsenal Transmídia & Pitch de Guerrilha: Empacotei a ONG em Cardápios de Investimento e Catálogos premium. Na COP28, armei a equipe com iPads contendo vídeos cinematográficos e dossiês compartilháveis via QR Code.",
      "O Carbono como Moeda de Valor: Utilizamos o coeficiente de retenção de carbono das terras demarcadas como 'moeda'. A narrativa provou que o indígena saudável configura a maior barreira de preservação da Amazônia."
    ],
    impactos: [
      "Governança Ética e Conformidade: O alinhamento reduziu o retrabalho das agências parceiras a zero. A pertinência do Guia de Comunicação foi tão alta que ele passou a integrar o Manual de Conduta oficial dos médicos voluntários da ONG.",
      "Reconhecimento Histórico: A apresentação transmídia institucional pavimentou a recepção da ONG pelo presidente da COP28 e coroou o prêmio de Inovação Tecnológica (Centro Cirúrgico Móvel).",
      "Captação Global (+15%): A narrativa do carbono e o Cardápio de Investimentos aumentaram em 15% a base de doadores internacionais e garantiram parcerias gigantescas com indústrias farmacêuticas para as próximas expedições."
    ],
    results: ["Primeira ONG (COP28)", "+15% Doações Internacionais", "Reconhecimento FUNAI & OMS", "4 Logotipos + Guia de Governança"],
    color: "#C9A84C",
    image: "/assets/cop28_folha_sp_sultao.png",
    evidences: [
      { type: "video", url: "https://www.youtube.com/watch?v=34d7U08nFec", caption: "Vídeo de Abertura da COP28 (Direção Geral)" },
      { type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Mini Clipe: Saúde Indígena na Amazônia" },
      { type: "image", url: "/assets/cop28_convite_oficial.png", caption: "EDS convidada especial da COP28 pelo Presidente Designado Sultão Al Jaber" },
      { type: "image", url: "/assets/cop28_folha_sp_sultao.png", caption: "Repercussão na Folha de S.Paulo: recepção da EDS pelo Sultão/Presidente da COP" },
      { type: "image", url: "/assets/cop28_funai_joenia_wapichana.png", caption: "Encontro institucional com Joenia Wapichana, Presidenta da FUNAI" },
      { type: "image", url: "/assets/cop28_oms_maria_neira.png", caption: "Encontro com María Neira, Diretora de Saúde Pública da OMS (PHE)" },
      { type: "image", url: "https://eds.org.br/wp-content/uploads/2023/11/programa-eds-card-01.webp", caption: "Produto 01: Centro Cirúrgico Móvel (Tecnologia Social)" }
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
    desafios: [
      "Comunicação Visual Defasada: Equipamentos de altíssima tecnologia e design arrojado não tinham a identidade premium que mereciam.",
      "Conteúdo Estagnado: A marca sobrevivia de 'requentar' vídeos antigos, com qualidade baixa e ritmo ultrapassado.",
      "Fosso de Leads: O time comercial estava afogado em uma base antiga, sem campanhas ativas.",
      "Silos Internos: Engenharia, Marketing e Comercial não falavam a mesma língua, faltando processos e alinhamento."
    ],
    solucoes: [
      "Conceito Ice Tech: Criei do zero uma identidade unindo a pureza do gelo à performance tecnológica. Inspirados na estética 'Tesla', transformamos as máquinas em objetos de desejo.",
      "Choque Audiovisual: Lançamos o TikTok com receitas virais e criamos o quadro 'Pessoas que são Máquinas de Sucesso' no YouTube, pulverizando cortes nas redes. Passamos a transmitir workshops ao vivo direto do showroom e laboratório técnico.",
      "Máquina de Aquisição: Estruturei campanhas (Meta/Google Ads) integradas ao HubSpot para atrair leads qualificados.",
      "Governança: Criei fluxos ágeis entre Engenharia, Marketing e Comercial, com rituais de aprovação e uma arquitetura editorial robusta."
    ],
    impactos: [
      "Valorização Estética: O conceito Ice Tech consolidou as máquinas como itens premium e gerou forte orgulho interno na equipe.",
      "Boom de Engajamento: A esteira de conteúdo em vídeo resultou em +19% de audiência e +27% de engajamento orgânico nas redes.",
      "Geração de Leads (+31%): A máquina de aquisição de tráfego pago gerou um salto de +31% em novos leads qualificados e vendas batidas mesmo em época de tarifaço.",
      "Fim dos Silos (Dream Team): A nova governança integrou Engenharia, Marketing e Vendas em rituais ágeis, consolidando o BYB (Build Your Business) Dream Team."
    ],
    results: ["Conceito Ice Tech", "Estética Tesla", "TikTok & YouTube", "+31% Novos Leads", "HubSpot & Ads"],
    color: "#FF6B35",
    image: "/assets/finamac_ice_tech.jpg",
    evidences: [
      { type: "image", url: "/assets/finamac_ice_tech.jpg", caption: "Estética Tesla: Equipamento Conceito Ice Tech" },
      { type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Cortes YouTube: Pessoas que são Máquinas de Sucesso" },
      { type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", caption: "Workshop ao vivo direto do Showroom" }
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
      <div className="absolute inset-0 z-0">
        <img src={CASES_BG} alt="" className="w-full h-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#080C14]/90 to-[#080C14]" />
      </div>

      <div className="container relative z-10" ref={ref}>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cases.map((item, i) => (
            <div
              key={item.id}
              className={`case-card group cursor-pointer transition-all duration-500 flex flex-col justify-between overflow-hidden ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => setActiveCase(activeCase === item.id ? null : item.id)}
            >
              <div>
                <div className="relative h-48 overflow-hidden border-b border-[rgba(0,212,255,0.08)] bg-[#0F1623]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] to-transparent" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-[0.6rem] uppercase tracking-widest" style={{ color: item.color }}>
                      {item.tag}
                    </span>
                    <div className="font-mono-tech text-[0.65rem] text-[#8892A4]">{item.year}</div>
                  </div>

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
                      <h3 className="font-display font-800 text-base text-[#F0F4FF] leading-tight group-hover:text-[#00D4FF] transition-colors duration-200">{item.title}</h3>
                    </div>
                  </div>

                  <p className="text-[#8892A4] text-xs mb-3 font-outfit leading-relaxed">{item.subtitle}</p>

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

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      activeCase === item.id ? "max-h-[1600px] opacity-100 pt-4 border-t border-[rgba(0,212,255,0.08)]" : "max-h-0 opacity-0"
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-4 text-xs leading-relaxed text-[#8892A4] font-outfit">
                      <div>
                        <strong className="text-[#00D4FF] block mb-2 font-display tracking-wide uppercase text-[0.7rem]">⚡ DESAFIOS</strong>
                        <ul className="space-y-2">
                          {item.desafios.map((desafio, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="font-mono-tech text-[0.6rem] px-1.5 py-0.5 border rounded flex-shrink-0" style={{ borderColor: `${item.color}40`, color: item.color, backgroundColor: `${item.color}08` }}>
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[#8892A4] leading-relaxed">{desafio}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-[#C9A84C] block mb-2 font-display tracking-wide uppercase text-[0.7rem]">🛠️ SOLUÇÃO</strong>
                        <ul className="space-y-2">
                          {item.solucoes.map((solucao, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="font-mono-tech text-[0.6rem] px-1.5 py-0.5 border rounded flex-shrink-0" style={{ borderColor: `${item.color}40`, color: item.color, backgroundColor: `${item.color}08` }}>
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[#8892A4] leading-relaxed">{solucao}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-[#FF6B35] block mb-2 font-display tracking-wide uppercase text-[0.7rem]">📈 IMPACTO</strong>
                        <ul className="space-y-2">
                          {item.impactos.map((impacto, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="font-mono-tech text-[0.6rem] px-1.5 py-0.5 border rounded flex-shrink-0" style={{ borderColor: `${item.color}40`, color: item.color, backgroundColor: `${item.color}08` }}>
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <span className="text-[#8892A4] leading-relaxed">{impacto}</span>
                            </li>
                          ))}
                        </ul>
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