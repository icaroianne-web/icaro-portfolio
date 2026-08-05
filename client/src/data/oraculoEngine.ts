/* ============================================================
   ORÁCULO™ — Engine de Triagem Conversacional com Estimativa
   Persona: Ser Superior, Etéreo, Confiante, Elegante & Moderno
   Regras: Estimativas em faixa (±R$ 1.000) · Sem "don'ts" · Tom soberano
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
}

export interface TriagemData {
  produto?: "MASTER PLAN™" | "ID CONCEPT™" | "I.A.E!™" | "ABSOLUTE CINEMA™";
  nivel?: "Essential" | "Advanced" | "Enterprise";
  urgencia?: "Alta" | "Média" | "Baixa";
  valorMinimo?: number;
  valorMaximo?: number;
  categoriaColor?: string;
}

// ── CONSTANTES ────────────────────────────────────────────────────────────────

export const WHATSAPP_BASE_URL =
  "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2";

// Tabela base de valores para o cálculo da faixa ±R$ 1.000
const BASE_NIVEL_PRECO = {
  Essential: 6000,
  Advanced: 14000,
  Enterprise: 30000,
};

const PRODUTO_COLOR: Record<string, string> = {
  "MASTER PLAN™": "#00D4FF",
  "ID CONCEPT™": "#C9A84C",
  "I.A.E!™": "#00D4FF",
  "ABSOLUTE CINEMA™": "#FF6B35",
};

// Helper para formatar faixa de preço (ex: 6000 -> "Entre R$ 5.000 e R$ 7.000")
export function formatFaixaPreco(baseVal: number): string {
  const min = baseVal - 1000;
  const max = baseVal + 1000;
  return `Entre R$ ${min.toLocaleString("pt-BR")} e R$ ${max.toLocaleString("pt-BR")}`;
}

// ── ESTADO DO FLUXO DE TRIAGEM ────────────────────────────────────────────────

type TriagemEtapa = "inicio" | "p1_produto" | "p2_urgencia" | "p3_tamanho" | "resultado";

export interface TriagemState {
  etapa: TriagemEtapa;
  produto?: string;
  urgencia?: string;
  nivel?: string;
}

let triagemAtiva: TriagemState | null = null;

export function resetTriagem() {
  triagemAtiva = null;
}

export function getTriagemState(): TriagemState | null {
  return triagemAtiva;
}

// ── MENSAGEM INICIAL (Tom Etéreo, Soberano & Elegante) ───────────────────────

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

// ── PERGUNTAS DO FLUXO DE TRIAGEM ─────────────────────────────────────────────

const PERGUNTA_P1: ChatMessage = {
  id: "triagem-p1",
  sender: "oraculo",
  text: "Onde reside a principal fricção da sua marca neste momento?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "🗺️ Comunicação desarticulada e sem governança", textToSend: "__T1_MASTER__" },
    { label: "🎨 Marca desatualizada ou sem presença de autoridade", textToSend: "__T1_IDCONCEPT__" },
    { label: "🤖 Necessidade de escala criativa e processos com IA", textToSend: "__T1_IAE__" },
    { label: "🎬 Falta de uma narrativa cinematográfica forte", textToSend: "__T1_CINEMA__" },
  ],
};

const PERGUNTA_P2: ChatMessage = {
  id: "triagem-p2",
  sender: "oraculo",
  text: "Qual o horizonte temporal desejado para esta transformação?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "🔴 Imediato — Janela crítica de até 60 dias", textToSend: "__T2_URGENTE__" },
    { label: "🟡 Planejado — Horizonte de 2 a 4 meses", textToSend: "__T2_MEDIO__" },
    { label: "🟢 Evolutivo — Construção contínua e sem urgência", textToSend: "__T2_CALMO__" },
  ],
};

const PERGUNTA_P3: ChatMessage = {
  id: "triagem-p3",
  sender: "oraculo",
  text: "Qual a dimensão da sua estrutura operacional atual?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "👤 Operação enxuta (1 a 3 integrantes)", textToSend: "__T3_ESSENTIAL__" },
    { label: "👥 Operação em expansão (4 a 20 integrantes)", textToSend: "__T3_ADVANCED__" },
    { label: "🏢 Operação consolidada (mais de 20 integrantes)", textToSend: "__T3_ENTERPRISE__" },
  ],
};

// ── CONSTRUTOR DA FICHA DE DIAGNÓSTICO ────────────────────────────────────────

function buildResultadoMessage(state: TriagemState): ChatMessage {
  const produto = state.produto || "MASTER PLAN™";
  const nivel = (state.nivel as "Essential" | "Advanced" | "Enterprise") || "Essential";
  const urgencia = state.urgencia || "Média";
  const baseVal = BASE_NIVEL_PRECO[nivel];
  const valorMinimo = baseVal - 1000;
  const valorMaximo = baseVal + 1000;
  const color = PRODUTO_COLOR[produto] || "#00D4FF";

  const waText = encodeURIComponent(
    `Oi Ícaro, recebi a orientação do ORÁCULO™. Produto: ${produto} · Nível: ${nivel} · Estimativa: Entre R$ ${valorMinimo.toLocaleString("pt-BR")} e R$ ${valorMaximo.toLocaleString("pt-BR")}. Vamos alinhar?`
  );

  return {
    id: "triagem-resultado-" + Date.now(),
    sender: "oraculo",
    text: "A análise do seu momento está concluída. Esta é a projeção estratégica desenhada para o seu negócio:",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    triagem: {
      produto: produto as TriagemData["produto"],
      nivel: nivel as TriagemData["nivel"],
      urgencia: urgencia as TriagemData["urgencia"],
      valorMinimo,
      valorMaximo,
      categoriaColor: color,
    },
    quickActions: [
      {
        label: "💬 Iniciar alinhamento com Ícaro no WhatsApp",
        textToSend: `__WA_OPEN__${waText}`,
      },
      {
        label: "🔍 Detalhes do " + produto,
        textToSend: `Como funciona o ${produto}?`,
      },
    ],
  };
}

// ── MAPEADORES INTERNOS ───────────────────────────────────────────────────────

const PRODUTO_MAP: Record<string, string> = {
  "__T1_MASTER__": "MASTER PLAN™",
  "__T1_IDCONCEPT__": "ID CONCEPT™",
  "__T1_IAE__": "I.A.E!™",
  "__T1_CINEMA__": "ABSOLUTE CINEMA™",
};

const URGENCIA_MAP: Record<string, string> = {
  "__T2_URGENTE__": "Alta",
  "__T2_MEDIO__": "Média",
  "__T2_CALMO__": "Baixa",
};

const NIVEL_MAP: Record<string, string> = {
  "__T3_ESSENTIAL__": "Essential",
  "__T3_ADVANCED__": "Advanced",
  "__T3_ENTERPRISE__": "Enterprise",
};

// ── BASE DE CONHECIMENTO (Sem don'ts, Tom Etéreo e Afirmativo) ───────────────

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
      "A inteligência estratégica de Ícaro Albuquerque é transmitida diretamente às equipes através de **Treinamentos Corporativos Executivos (In-loco ou Virtuais)**.\n\nFormatações disponíveis:\n• **MASTER PLAN™** — Capacitação em Comunicação Estratégica e Governança Editorial\n• **I.A.E!™** — Imersão prática em Inteligência Artificial para Marketing e Comunicação\n\nComo deseja elevar o nível do seu time?",
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
      "Os investimentos são projetados em faixas precisas conforme o nível de intervenção necessário:\n\n🟢 **Essential**: Entre R$ 5.000 e R$ 7.000\nTransformação cirúrgica com foco em um objetivo delimitado.\n\n🟡 **Advanced**: Entre R$ 13.000 e R$ 15.000\nEstratégia integrada com acompanhamento periódico por 3 meses.\n\n🟣 **Enterprise**: Entre R$ 29.000 e R$ 31.000\nReestruturação global de comunicação para operações consolidadas.\n\nCondição financeira padrão: 60% na entrada e 40% na entrega final.\n\nDeseja realizar o diagnóstico guiado para identificar sua faixa exata?",
  },
];

// ── PROCESSADOR PRINCIPAL ──────────────────────────────────────────────────────

export function processOraculoMessage(userText: string): ChatMessage {
  const txt = userText.trim();

  // ── Inicia o fluxo de triagem
  if (txt === "__TRIAGEM_START__") {
    triagemAtiva = { etapa: "p1_produto" };
    return { ...PERGUNTA_P1, id: "p1-" + Date.now(), timestamp: ts() };
  }

  // ── Processa etapas do fluxo de triagem
  if (triagemAtiva) {
    const state = triagemAtiva;

    // Etapa P1 — Produto
    if (state.etapa === "p1_produto" && PRODUTO_MAP[txt]) {
      state.produto = PRODUTO_MAP[txt];
      state.etapa = "p2_urgencia";
      return { ...PERGUNTA_P2, id: "p2-" + Date.now(), timestamp: ts() };
    }

    // Etapa P2 — Urgência
    if (state.etapa === "p2_urgencia" && URGENCIA_MAP[txt]) {
      state.urgencia = URGENCIA_MAP[txt];
      state.etapa = "p3_tamanho";
      return { ...PERGUNTA_P3, id: "p3-" + Date.now(), timestamp: ts() };
    }

    // Etapa P3 — Tamanho → gera resultado
    if (state.etapa === "p3_tamanho" && NIVEL_MAP[txt]) {
      state.nivel = NIVEL_MAP[txt];
      state.etapa = "resultado";
      const resultado = buildResultadoMessage(state);
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
      text: "Direcionando sua comunicação ao canal de Ícaro Albuquerque. Os dados da sua análise foram compilados com precisão.",
      timestamp: ts(),
      quickActions: [
        { label: "✨ Novo Diagnóstico", textToSend: "__TRIAGEM_START__" },
      ],
    };
  }

  // ── Modo keyword (passivo)
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
        { label: "✨ Iniciar Diagnóstico Estratégico", textToSend: "__TRIAGEM_START__" },
        { label: "💬 Falar com Ícaro no WhatsApp", textToSend: `__WA_OPEN__${encodeURIComponent("Oi Ícaro, recebi a orientação do ORÁCULO™ sobre " + matched.product.title)}` },
      ],
    };
  }

  // ── Fallback soberano
  return {
    id: "msg-" + Date.now(),
    sender: "oraculo",
    text: "Mapeio o ecossistema de Ícaro Albuquerque através de 4 arquiteturas de transformação:\n\n🗺️ **MASTER PLAN™** — Governança e Comunicação Inbound/Outbound\n🎨 **ID CONCEPT™** — Branding, Naming e Presença Digital Conceitual\n🤖 **I.A.E!™** — Inteligência Artificial aplicada ao Marketing\n🎬 **ABSOLUTE CINEMA™** — Storytelling e Produção Audiovisual Cinematográfica\n\nInicie o diagnóstico rápido para identificar a solução exata para o seu momento.",
    timestamp: ts(),
    quickActions: [
      { label: "✨ Iniciar Diagnóstico Estratégico", textToSend: "__TRIAGEM_START__" },
      { label: "💬 Falar com Ícaro no WhatsApp", textToSend: "__WA_OPEN__Oi%20%C3%8Dcaro%2C%20vim%20pela%20orienta%C3%A7%C3%A3o%20do%20OR%C3%81CULO%E2%84%A2" },
    ],
  };
}

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
