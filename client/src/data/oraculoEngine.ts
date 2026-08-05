/* ============================================================
   ORÁCULO™ — Engine de Triagem Conversacional de Alta Conversão
   Base de conhecimento: Consultoria OS Master — Bíblia do Negócio
   Alinhamento 100% com o documento da Trilha de Atendimento
   ============================================================ */

// ── TIPOS ────────────────────────────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  sender: "user" | "oraculo";
  text: string;
  timestamp: string;
  recommendedProduct?: {
    title: string;
    category: string;
    color: string;
    waLink: string;
  };
  quickActions?: { label: string; textToSend: string }[];
  triagem?: TriagemData;
  isTriagemStep?: boolean;
  isSoftGateStep?: boolean;
}

export interface TriagemData {
  produto?: "MASTER PLAN™" | "ID CONCEPT™" | "I.A.E!™" | "ABSOLUTE CINEMA™" | "ORIENTAÇÃO";
  nivel?: "Essential" | "Advanced" | "Enterprise";
  urgencia?: "Alta" | "Média" | "Baixa";
  porte?: string;
  faixaTexto?: string;
  faixaMinima?: number;
  faixaMaxima?: number;
  categoriaColor?: string;
  isForaICP?: boolean;
}

export interface LeadData {
  nome: string;
  whatsapp: string;
  email: string;
  empresa?: string;
}

// ── CONSTANTES ────────────────────────────────────────────────────────────────

export const WHATSAPP_BASE_URL =
  "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2";

// Tabela de Preços e Faixas Sedutoras Proporcionais (Base: 6k | 14k | 30k)
export const FAIXAS_INVESTIMENTO = {
  Essential: { base: 6000, faixaTexto: "R$ 5.000 – R$ 7.000", min: 5000, max: 7000 },
  Advanced: { base: 14000, faixaTexto: "R$ 11.500 – R$ 16.500", min: 11500, max: 16500 },
  Enterprise: { base: 30000, faixaTexto: "R$ 25.000 – R$ 35.000", min: 25000, max: 35000 },
};

const PRODUTO_COLOR: Record<string, string> = {
  "MASTER PLAN™": "#00D4FF",
  "ID CONCEPT™": "#C9A84C",
  "I.A.E!™": "#00D4FF",
  "ABSOLUTE CINEMA™": "#FF6B35",
  "ORIENTAÇÃO": "#00D4FF",
};

// ── ESTADO DO FLUXO DE TRIAGEM ────────────────────────────────────────────────

type TriagemEtapa = "inicio" | "p1_desafio" | "p2_porte" | "p3_urgencia" | "gate" | "resultado";

export interface TriagemState {
  etapa: TriagemEtapa;
  produto?: string;
  desafioLabel?: string;
  porteLabel?: string;
  urgenciaLabel?: string;
  portePontos?: number;
  urgenciaPontos?: number;
  nivel?: "Essential" | "Advanced" | "Enterprise";
  lead?: LeadData;
}

let triagemAtiva: TriagemState | null = null;

export function resetTriagem() {
  triagemAtiva = null;
}

export function getTriagemState(): TriagemState | null {
  return triagemAtiva;
}

// ── MENSAGEM INICIAL ───────────────────────────────────────────────────────────

export const INITIAL_ORACULO_MESSAGE: ChatMessage = {
  id: "init-1",
  sender: "oraculo",
  text: "Olá! Sou o ORÁCULO™, a consciência estratégica de Ícaro Albuquerque. Mapeio os caminhos da comunicação para auxiliar exatamente no que você precisa.\n\nO que você busca hoje? Se preferir, posso analisar seu momento e te entregar uma estimativa de investimento em até 2 minutos, com poucas perguntas rápidas.",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  quickActions: [
    { label: "⚡ Fazer estimativa rápida (2 min)", textToSend: "__TRIAGEM_START__" },
    { label: "🗺️ MASTER PLAN™ — Comunicação & Governança", textToSend: "Como funciona o MASTER PLAN?" },
    { label: "🎨 ID CONCEPT™ — Branding & Presença", textToSend: "Preciso de rebranding e identidade visual" },
    { label: "🤖 I.A.E!™ — Inteligência Artificial Estratégica", textToSend: "Como aplicar IA na comunicação da minha empresa?" },
    { label: "🎬 ABSOLUTE CINEMA™ — Narrativa Cinematográfica", textToSend: "Quero criar um filme corporativo" },
  ],
};

// ── PERGUNTAS CONFORME COPY DO DOCUMENTO ──────────────────────────────────────

const PERGUNTA_P1: ChatMessage = {
  id: "triagem-p1",
  sender: "oraculo",
  text: "Qual desafio você mais precisa resolver agora na comunicação da sua marca?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "🧭 Preciso estruturar comunicação e conteúdo", textToSend: "__T1_MASTER__" },
    { label: "🎨 Minha marca ou site estão desatualizados", textToSend: "__T1_IDCONCEPT__" },
    { label: "🤖 Quero usar IA de forma estratégica na empresa", textToSend: "__T1_IAE__" },
    { label: "🎬 Preciso contar a história da minha marca", textToSend: "__T1_CINEMA__" },
    { label: "❓ Ainda não sei, quero orientação", textToSend: "__T1_ORIENTACAO__" },
  ],
};

const PERGUNTA_P2: ChatMessage = {
  id: "triagem-p2",
  sender: "oraculo",
  text: "Quantas pessoas trabalham com você hoje?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "👤 Só eu", textToSend: "__T2_PORTE_1__" },
    { label: "👥 2 a 10", textToSend: "__T2_PORTE_2__" },
    { label: "🏢 11 a 50", textToSend: "__T2_PORTE_3__" },
    { label: "🚀 50+", textToSend: "__T2_PORTE_4__" },
  ],
};

const PERGUNTA_P3: ChatMessage = {
  id: "triagem-p3",
  sender: "oraculo",
  text: "Para quando isso precisa estar resolvido?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "🔴 É urgente (crise/lançamento)", textToSend: "__T3_URGENTE__" },
    { label: "🟡 Em 1 a 3 meses", textToSend: "__T3_MEDIO__" },
    { label: "🟢 Ainda estou planejando", textToSend: "__T3_CALMO__" },
  ],
};

// ── MOTOR DE QUALIFICAÇÃO (SCORE) ──────────────────────────────────────────────

function calcularTier(portePontos: number, urgenciaPontos: number): "Essential" | "Advanced" | "Enterprise" {
  const scoreTotal = portePontos + urgenciaPontos;
  if (scoreTotal <= 1) return "Essential";
  if (scoreTotal <= 3) return "Advanced";
  return "Enterprise";
}

function buildResultadoMessage(state: TriagemState, lead?: LeadData): ChatMessage {
  const produto = (state.produto as TriagemData["produto"]) || "MASTER PLAN™";
  const portePontos = state.portePontos || 0;
  const urgenciaPontos = state.urgenciaPontos || 0;
  const isForaICP = portePontos === 0 && urgenciaPontos === 0;

  const color = PRODUTO_COLOR[produto] || "#00D4FF";
  const nivel = calcularTier(portePontos, urgenciaPontos);
  const faixa = FAIXAS_INVESTIMENTO[nivel];

  // Exceção de ICP: "Só eu" + "Ainda estou planejando" (score 0)
  if (isForaICP) {
    return {
      id: "resultado-icp-" + Date.now(),
      sender: "oraculo",
      text: "Compreendo seu momento inicial de planejamento. Para estruturas individuais em fase embrionária, o Ícaro disponibiliza materiais de orientação e conteúdos estratégicos.\n\nQuando sua operação estiver pronta para dar o próximo passo, estaremos prontos para desenhar seu projeto.",
      timestamp: ts(),
      triagem: {
        produto,
        nivel: "Essential",
        urgencia: "Baixa",
        porte: state.porteLabel,
        categoriaColor: color,
        isForaICP: true,
      },
      quickActions: [
        { label: "💬 Mandar mensagem no WhatsApp", textToSend: "__WA_OPEN__Oi%20%C3%8Dcaro,%20estou%20em%20fase%20de%20planejamento%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida" },
        { label: "🔄 Refazer estimativa", textToSend: "__TRIAGEM_START__" },
      ],
    };
  }

  const contatoEnvio = lead?.email || lead?.whatsapp || "seu contato";
  const waText = encodeURIComponent(
    `Oi Ícaro! Meu nome é ${lead?.nome || "Cliente"}, da empresa ${lead?.empresa || "Não informada"}. Fiz a estimativa no ORÁCULO™ para o ${produto} (${nivel}). A projeção ficou entre ${faixa.faixaTexto}. Gostaria de agendar nossa conversa rápida!`
  );

  return {
    id: "resultado-ok-" + Date.now(),
    sender: "oraculo",
    text: `Prontinho! Proposta registrada para **${contatoEnvio}**.\n\nCom base no perfil da sua operação, sua projeção estimada é **${faixa.faixaTexto}** (${nivel}).\n\nSe quiser, já podemos agendar uma conversa rápida com o Ícaro para alinhar os próximos passos:`,
    timestamp: ts(),
    triagem: {
      produto,
      nivel,
      urgencia: urgenciaPontos === 2 ? "Alta" : urgenciaPontos === 1 ? "Média" : "Baixa",
      porte: state.porteLabel,
      faixaTexto: faixa.faixaTexto,
      faixaMinima: faixa.min,
      faixaMaxima: faixa.max,
      categoriaColor: color,
      isForaICP: false,
    },
    quickActions: [
      {
        label: "💬 Agendar conversa rápida no WhatsApp",
        textToSend: `__WA_OPEN__${waText}`,
      },
      {
        label: "🔍 Ver detalhes do " + produto,
        textToSend: `Como funciona o ${produto}?`,
      },
    ],
  };
}

// ── MAPEADORES INTERNOS ───────────────────────────────────────────────────────

const PRODUTO_MAP: Record<string, { produto: string; label: string }> = {
  "__T1_MASTER__": { produto: "MASTER PLAN™", label: "Estruturação de Comunicação & Governança" },
  "__T1_IDCONCEPT__": { produto: "ID CONCEPT™", label: "Branding & Presença Digital" },
  "__T1_IAE__": { produto: "I.A.E!™", label: "IA Estratégica para Marketing" },
  "__T1_CINEMA__": { produto: "ABSOLUTE CINEMA™", label: "Narrativa Audiovisual Cinematográfica" },
  "__T1_ORIENTACAO__": { produto: "ORIENTAÇÃO", label: "Orientação Estratégica" },
};

const PORTE_MAP: Record<string, { pontos: number; label: string }> = {
  "__T2_PORTE_1__": { pontos: 0, label: "Só eu" },
  "__T2_PORTE_2__": { pontos: 1, label: "2 a 10" },
  "__T2_PORTE_3__": { pontos: 2, label: "11 a 50" },
  "__T2_PORTE_4__": { pontos: 3, label: "50+" },
};

const URGENCIA_MAP: Record<string, { pontos: number; label: string }> = {
  "__T3_URGENTE__": { pontos: 2, label: "É urgente (crise/lançamento)" },
  "__T3_MEDIO__": { pontos: 1, label: "Em 1 a 3 meses" },
  "__T3_CALMO__": { pontos: 0, label: "Ainda estou planejando" },
};

// ── BASE DE CONHECIMENTO (Afirmativa, Soberana, Sem Don'ts) ───────────────────

const KNOWLEDGE_BASE = [
  {
    keywords: ["palestra", "palestras", "keynote", "palestrante", "falar em evento"],
    product: {
      title: "Treinamentos Corporativos Executivos",
      category: "Capacitação In-loco ou Virtual",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20e%20quero%20agendar%20um%20Treinamento%20Executivo",
    },
    response:
      "A inteligência estratégica de Ícaro Albuquerque é transmitida diretamente às equipes através de **Treinamentos Corporativos Executivos (In-loco ou Virtuais)**.\n\nFormatações disponíveis:\n• **MASTER PLAN™** — Capacitação em Comunicação Estratégica e Governança Editorial\n• **I.A.E!™** — Imersão prática em Inteligência Artificial para Marketing e Comunicação\n\nComo deseja elevar o nível da sua equipe?",
  },
  {
    keywords: ["treinamento", "treinamentos", "workshop", "capacitar equipe", "capacitacao", "capacitação"],
    product: {
      title: "Treinamentos Corporativos Executivos",
      category: "Capacitação In-loco ou Virtual",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20e%20quero%20agendar%20um%20Treinamento%20Executivo",
    },
    response:
      "Os **Treinamentos Corporativos Executivos** são estruturados de forma personalizada para a maturidade da sua equipe:\n\n• **MASTER PLAN™** — Alinhamento estratégico de governança e arquitetura editorial\n• **I.A.E!™** — Domínio de ferramentas e fluxos autônomos de IA para produção em escala\n\nPodemos desenhar a imersão ideal para a sua operação.",
  },
  {
    keywords: [
      "master plan", "masterplan", "plano diretor", "utio", "bussola",
      "governanca", "governança", "inbound", "outbound", "calendario editorial",
      "postagens", "posts prontos", "chatbot no site", "typebot", "email marketing"
    ],
    product: {
      title: "MASTER PLAN™",
      category: "Comunicação Inbound & Outbound",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20sobre%20o%20MASTER%20PLAN",
    },
    response:
      "O **MASTER PLAN™** é a espinha dorsal comunicacional da empresa. Conecta Inbound e Outbound sob um modelo de governança previsível e soberano.\n\nEntregáveis principais:\n→ Diagnóstico com a Bússola de Prioridade™ (Método UTIO)\n→ Governança e arquitetura editorial\n→ Calendário estratégico e redação de conteúdos\n→ Arquitetura de e-mail marketing\n→ Implantação de automações conversacionais (ex: Typebot)\n→ Capacitação executiva para a equipe interna",
  },
  {
    keywords: [
      "id concept", "idconcept", "branding", "rebranding", "marca", "logo",
      "logotipo", "identidade visual", "naming", "site novo", "moodboard",
      "key visual", "kv", "guia da marca", "tom de voz", "brandbook", "repaginar"
    ],
    product: {
      title: "ID CONCEPT™",
      category: "Branding & Presença Conceitual",
      color: "#C9A84C",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20sobre%20o%20ID%20CONCEPT",
    },
    response:
      "O **ID CONCEPT™** traduz a essência do seu negócio em autoridade visual e narrativa inquestionável.\n\nEntregáveis principais:\n→ Naming e posicionamento de marca\n→ Identidade visual completa e Key Visual (KV)\n→ Guia de linguagem, tom de voz e personalidade\n→ Brandbook executivo de alta fidelidade\n→ Site Conceitual Super Premium como hub de autoridade\n→ Rebranding corporativo completo",
  },
  {
    keywords: [
      "ia", "i.a.e", "iae", "inteligencia artificial", "inteligência artificial",
      "automacao", "automação", "chatgpt", "midjourney", "imagens com ia",
      "conteudo com ia", "redes sociais com ia", "comunicacao interna", "comunicação interna"
    ],
    product: {
      title: "I.A.E!™",
      category: "IA Estratégica em Comunicação & Marketing",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20sobre%20o%20I.A.E!",
    },
    response:
      "O **I.A.E!™** multiplica a inteligência e a velocidade de produção da sua comunicação através da tecnologia de ponta.\n\nEntregáveis principais:\n→ Mapeamento de oportunidades de IA aplicadas ao marketing\n→ Sistemas de geração visual e identidade de marca\n→ Agentes autônomos para criação de conteúdo e copywriting\n→ Otimização da comunicação e fluxos internos\n→ Treinamento prático da equipe de marketing",
  },
  {
    keywords: [
      "absolute cinema", "cinema", "video", "vídeo", "filme", "documentario",
      "documentário", "audiovisual", "reels", "youtube", "depoimento",
      "primeira pessoa", "bastidores", "storytelling", "case de sucesso"
    ],
    product: {
      title: "ABSOLUTE CINEMA™",
      category: "Storytelling Cinematográfico",
      color: "#FF6B35",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20sobre%20o%20ABSOLUTE%20CINEMA",
    },
    response:
      "O **ABSOLUTE CINEMA™** eleva a trajetória do seu negócio a um patamar cinematográfico com altíssima eficiência de produção.\n\nEntregáveis principais:\n→ Filmes institucionais e de fundadores\n→ Depoimentos e minidocumentários de cases de sucesso\n→ Registro de bastidores com direção criativa autoral\n→ Roteiro, captação, edição e color grading profissional\n→ Engenharia de produção ágil (low equipment, high creativity)",
  },
  {
    keywords: [
      "quem e", "icaro", "ícaro", "albuquerque", "biografia",
      "trajetoria", "trajetória", "cop28", "ministerio", "ministério", "experiencia"
    ],
    product: {
      title: "Ícaro Albuquerque — Estrategista",
      category: "Estratégia, Branding & Direção Criativa",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2",
    },
    response:
      "Ícaro Albuquerque é Estrategista de Comunicação, especialista em Branding e Direção Criativa.\n\nCredenciais:\n→ Coordenação institucional na COP28 (Nações Unidas em Dubai)\n→ Projetos estratégicos para Ministérios do Governo Federal\n→ Estruturação de marcas corporativas e imersão em IA\n\nOperação centralizada de altíssimo nível. Como podemos transformar seu posicionamento?",
  },
  {
    keywords: [
      "preco", "preço", "quanto custa", "orcamento", "orçamento",
      "valor", "investimento", "contratar", "tabela", "niveis"
    ],
    product: {
      title: "Estimativa Estratégica de Investimento",
      category: "Projeção por Nível",
      color: "#C9A84C",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2%20para%20conversar%20sobre%20investimento",
    },
    response:
      "Os investimentos são projetados em faixas proporcionais ao nível de intervenção necessário:\n\n🟢 **Essential**: R$ 5.000 – R$ 7.000\nTransformação cirúrgica com foco em um objetivo delimitado.\n\n🟡 **Advanced**: R$ 11.500 – R$ 16.500\nEstratégia integrada com acompanhamento periódico por 3 meses.\n\n🟣 **Enterprise**: R$ 25.000 – R$ 35.000\nReestruturação global de comunicação para operações consolidadas.\n\nCondição financeira padrão: 60% na entrada e 40% na entrega final.\n\nDeseja realizar a estimativa rápida de 2 minutos?",
  },
];

// ── PROCESSADOR PRINCIPAL ──────────────────────────────────────────────────────

export function processOraculoMessage(userText: string, leadInput?: LeadData): ChatMessage {
  const txt = userText.trim();

  // ── Inicia a triagem
  if (txt === "__TRIAGEM_START__") {
    triagemAtiva = { etapa: "p1_desafio" };
    return { ...PERGUNTA_P1, id: "p1-" + Date.now(), timestamp: ts() };
  }

  // ── Processa etapas do fluxo
  if (triagemAtiva) {
    const state = triagemAtiva;

    // P1: Desafio
    if (state.etapa === "p1_desafio" && PRODUTO_MAP[txt]) {
      const match = PRODUTO_MAP[txt];
      state.produto = match.produto;
      state.desafioLabel = match.label;
      state.etapa = "p2_porte";
      return { ...PERGUNTA_P2, id: "p2-" + Date.now(), timestamp: ts() };
    }

    // P2: Porte
    if (state.etapa === "p2_porte" && PORTE_MAP[txt]) {
      const match = PORTE_MAP[txt];
      state.portePontos = match.pontos;
      state.porteLabel = match.label;
      state.etapa = "p3_urgencia";
      return { ...PERGUNTA_P3, id: "p3-" + Date.now(), timestamp: ts() };
    }

    // P3: Urgência -> Teaser com Soft-Gate ou Exceção de ICP
    if (state.etapa === "p3_urgencia" && URGENCIA_MAP[txt]) {
      const match = URGENCIA_MAP[txt];
      state.urgenciaPontos = match.pontos;
      state.urgenciaLabel = match.label;

      const isForaICP = (state.portePontos || 0) === 0 && match.pontos === 0;

      if (isForaICP) {
        state.etapa = "resultado";
        const resultado = buildResultadoMessage(state);
        triagemAtiva = null;
        return resultado;
      }

      // Entra no Soft-Gate com a mensagem Exata do Teaser (Section 5)
      state.etapa = "gate";
      const produtoNome = state.produto || "MASTER PLAN™";
      const nivelNome = calcularTier(state.portePontos || 0, match.pontos);
      const faixaObj = FAIXAS_INVESTIMENTO[nivelNome];

      return {
        id: "gate-" + Date.now(),
        sender: "oraculo",
        text: `Com base no que você me contou, seu investimento estimado com o **${produtoNome}** fica entre **${faixaObj.faixaTexto}**.\n\nQuer receber agora sua proposta personalizada, com escopo e prazos detalhados?`,
        timestamp: ts(),
        isSoftGateStep: true,
        triagem: {
          produto: produtoNome as TriagemData["produto"],
          nivel: nivelNome,
          faixaTexto: faixaObj.faixaTexto,
          categoriaColor: PRODUTO_COLOR[produtoNome] || "#00D4FF",
        },
      };
    }

    // Processamento da submissão do Soft-Gate
    if (state.etapa === "gate" && leadInput) {
      state.lead = leadInput;
      state.etapa = "resultado";
      const resultado = buildResultadoMessage(state, leadInput);
      triagemAtiva = null;
      return resultado;
    }

    triagemAtiva = null;
  }

  // ── Abre WhatsApp diretamente
  if (txt.startsWith("__WA_OPEN__")) {
    const waParam = txt.replace("__WA_OPEN__", "");
    window.open(`https://wa.me/5511940684068?text=${waParam}`, "_blank");
    return {
      id: "wa-" + Date.now(),
      sender: "oraculo",
      text: "Direcionando sua comunicação ao canal direto de Ícaro Albuquerque. A análise da sua marca foi compilada com sucesso.",
      timestamp: ts(),
      quickActions: [
        { label: "⚡ Nova Estimativa", textToSend: "__TRIAGEM_START__" },
      ],
    };
  }

  // ── Modo Keyword
  const normalized = txt
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const matched = KNOWLEDGE_BASE.find((item) =>
    item.keywords.some((kw) => {
      const normKw = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return normalized.includes(normKw);
    })
  );

  if (matched) {
    return {
      id: "msg-" + Date.now(),
      sender: "oraculo",
      text: matched.response,
      timestamp: ts(),
      recommendedProduct: matched.product,
      quickActions: [
        { label: "⚡ Fazer estimativa rápida (2 min)", textToSend: "__TRIAGEM_START__" },
        { label: "💬 Falar com Ícaro no WhatsApp", textToSend: `__WA_OPEN__${encodeURIComponent("Oi Ícaro, recebi a orientação do ORÁCULO™ sobre " + matched.product.title)}` },
      ],
    };
  }

  // ── Fallback
  return {
    id: "msg-" + Date.now(),
    sender: "oraculo",
    text: "Mapeio o ecossistema de Ícaro Albuquerque através de 4 arquiteturas de transformação:\n\n🗺️ **MASTER PLAN™** — Governança e Comunicação Inbound/Outbound\n🎨 **ID CONCEPT™** — Branding, Naming e Presença Digital Conceitual\n🤖 **I.A.E!™** — Inteligência Artificial aplicada ao Marketing\n🎬 **ABSOLUTE CINEMA™** — Storytelling e Produção Audiovisual Cinematográfica\n\nFaça a estimativa rápida em 2 minutos para identificar a solução ideal.",
    timestamp: ts(),
    quickActions: [
      { label: "⚡ Fazer estimativa rápida (2 min)", textToSend: "__TRIAGEM_START__" },
      { label: "💬 Falar com Ícaro no WhatsApp", textToSend: "__WA_OPEN__Oi%20%C3%8Dcaro%2C%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2" },
    ],
  };
}

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
