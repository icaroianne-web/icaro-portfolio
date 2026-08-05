/* ============================================================
   ORÁCULO™ — Engine de Triagem Conversacional com Estimativa
   Base de conhecimento: Consultoria OS Master — Bíblia do Negócio
   4 produtos · 3 níveis · modelo 60/40 · sem palestras
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
  // Dados do fluxo de triagem
  triagem?: TriagemData;
  isTriagemStep?: boolean;
}

export interface TriagemData {
  produto?: "MASTER PLAN™" | "ID CONCEPT™" | "I.A.E!™" | "ABSOLUTE CINEMA™";
  nivel?: "Essential" | "Advanced" | "Enterprise";
  urgencia?: "Alta" | "Média" | "Baixa";
  valorMinimo?: number;
  categoriaColor?: string;
}

// ── CONSTANTES ────────────────────────────────────────────────────────────────

export const WHATSAPP_BASE_URL =
  "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20fiz%20o%20diagn%C3%B3stico%20r%C3%A1pido%20do%20OR%C3%81CULO%E2%84%A2";

const PRECO = {
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

// ── MENSAGEM INICIAL ───────────────────────────────────────────────────────────

export const INITIAL_ORACULO_MESSAGE: ChatMessage = {
  id: "init-1",
  sender: "oraculo",
  text: "Olá! Sou o ORÁCULO™, o assistente inteligente do Ícaro Albuquerque. Faço o diagnóstico rápido do seu negócio e entrego uma estimativa de investimento em menos de 2 minutos — sem enrolação.",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  quickActions: [
    { label: "🎯 Fazer diagnóstico rápido (4 perguntas)", textToSend: "__TRIAGEM_START__" },
    { label: "🗺️ MASTER PLAN™ — Comunicação Estratégica", textToSend: "Como funciona o MASTER PLAN?" },
    { label: "🎨 ID CONCEPT™ — Marca & Branding", textToSend: "Preciso de rebranding e identidade visual" },
    { label: "🤖 I.A.E!™ — IA para Marketing", textToSend: "Como aplicar IA na comunicação da minha empresa?" },
    { label: "🎬 ABSOLUTE CINEMA™ — Filme Corporativo", textToSend: "Quero criar um filme corporativo" },
  ],
};

// ── PERGUNTAS DO FLUXO DE TRIAGEM ─────────────────────────────────────────────

const PERGUNTA_P1: ChatMessage = {
  id: "triagem-p1",
  sender: "oraculo",
  text: "Qual é o maior desafio de comunicação da sua empresa agora?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "🗺️ Minha comunicação está desorganizada, sem estratégia", textToSend: "__T1_MASTER__" },
    { label: "🎨 Minha marca está ultrapassada ou sem identidade clara", textToSend: "__T1_IDCONCEPT__" },
    { label: "🤖 Quero usar IA para produzir mais conteúdo com menos custo", textToSend: "__T1_IAE__" },
    { label: "🎬 Quero contar a história da minha empresa em vídeo", textToSend: "__T1_CINEMA__" },
  ],
};

const PERGUNTA_P2: ChatMessage = {
  id: "triagem-p2",
  sender: "oraculo",
  text: "Você tem algum prazo, evento ou lançamento se aproximando?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "🔴 Sim — preciso resolver em menos de 60 dias", textToSend: "__T2_URGENTE__" },
    { label: "🟡 Tenho 2 a 4 meses, posso me planejar", textToSend: "__T2_MEDIO__" },
    { label: "🟢 Sem prazo definido, quero fazer do jeito certo", textToSend: "__T2_CALMO__" },
  ],
};

const PERGUNTA_P3: ChatMessage = {
  id: "triagem-p3",
  sender: "oraculo",
  text: "Última pergunta: quantas pessoas trabalham na sua empresa?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  isTriagemStep: true,
  quickActions: [
    { label: "👤 Só eu ou até 3 pessoas", textToSend: "__T3_ESSENTIAL__" },
    { label: "👥 De 4 a 20 pessoas", textToSend: "__T3_ADVANCED__" },
    { label: "🏢 Mais de 20 pessoas", textToSend: "__T3_ENTERPRISE__" },
  ],
};

// ── CONSTRUTOR DA FICHA DE DIAGNÓSTICO ────────────────────────────────────────

function buildResultadoMessage(state: TriagemState): ChatMessage {
  const produto = state.produto || "MASTER PLAN™";
  const nivel = (state.nivel as "Essential" | "Advanced" | "Enterprise") || "Essential";
  const urgencia = state.urgencia || "Média";
  const valor = PRECO[nivel];
  const color = PRODUTO_COLOR[produto] || "#00D4FF";

  const urgenciaEmoji = urgencia === "Alta" ? "🔴" : urgencia === "Média" ? "🟡" : "🟢";

  const waText = encodeURIComponent(
    `Oi Ícaro, vim do ORÁCULO™ e fiz o diagnóstico rápido. Produto sugerido: ${produto} · Nível: ${nivel} · Urgência: ${urgencia}. Quero saber mais!`
  );

  return {
    id: "triagem-resultado-" + Date.now(),
    sender: "oraculo",
    text: `Diagnóstico concluído. Aqui está a sua estimativa:`,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    triagem: {
      produto: produto as TriagemData["produto"],
      nivel: nivel as TriagemData["nivel"],
      urgencia: urgencia as TriagemData["urgencia"],
      valorMinimo: valor,
      categoriaColor: color,
    },
    quickActions: [
      {
        label: "💬 Agendar conversa com Ícaro no WhatsApp",
        textToSend: `__WA_OPEN__${waText}`,
      },
      {
        label: "🔍 Ver o que está incluso em " + produto,
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

// ── BASE DE CONHECIMENTO (MODO KEYWORD) ───────────────────────────────────────

const KNOWLEDGE_BASE = [
  {
    keywords: ["palestra", "palestras", "keynote", "palestrante", "falar em evento"],
    product: {
      title: "Treinamentos Corporativos — MASTER PLAN™ & I.A.E!™",
      category: "Capacitação In-loco ou Virtual",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20saber%20sobre%20Treinamentos%20Corporativos",
    },
    response:
      "O Ícaro não atua como palestrante. O que ele oferece são **Treinamentos Corporativos (In-loco ou Virtuais)** para equipes internas, vinculados a dois produtos:\n\n• **MASTER PLAN™** — treinamento em Comunicação Estratégica e Governança Editorial\n• **I.A.E!™** — treinamento em Inteligência Artificial aplicada ao Marketing\n\nQuer saber mais sobre qual se encaixa melhor na sua necessidade?",
  },
  {
    keywords: ["treinamento", "treinamentos", "workshop", "capacitar equipe", "capacitacao", "capacitação"],
    product: {
      title: "Treinamentos Corporativos — MASTER PLAN™ & I.A.E!™",
      category: "Capacitação In-loco ou Virtual",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20agendar%20um%20Treinamento%20para%20minha%20equipe",
    },
    response:
      "Sim! Ícaro realiza **Treinamentos Corporativos (In-loco ou Virtuais)** focados na sua operação:\n\n• **MASTER PLAN™** — para equipes que precisam dominar comunicação estratégica e governança\n• **I.A.E!™** — para times que querem usar IA para produzir conteúdo de marketing com eficiência\n\nQuer montar o programa ideal para a sua equipe?",
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
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20conhecer%20o%20MASTER%20PLAN",
    },
    response:
      "O **MASTER PLAN™** estrutura toda a comunicação Inbound e Outbound da sua empresa. Inclui:\n\n→ Raio-X + Bússola de Prioridade™ (Método UTIO)\n→ Governança e arquitetura editorial\n→ Calendário de postagens + copy dos posts já prontos\n→ Estratégia de e-mail marketing\n→ Recomendação e implantação de chatbot (ex: Typebot)\n→ Treinamento in-loco ou virtual para sua equipe\n\nIdeal para empresas que estão \"apagando incêndio\" na comunicação.",
  },
  {
    keywords: [
      "id concept", "idconcept", "branding", "rebranding", "marca", "logo",
      "logotipo", "identidade visual", "naming", "site novo", "moodboard",
      "key visual", "kv", "guia da marca", "tom de voz", "brandbook", "repaginar"
    ],
    product: {
      title: "ID CONCEPT™",
      category: "Branding & Presença Digital",
      color: "#C9A84C",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20preciso%20de%20Branding/ID%20CONCEPT",
    },
    response:
      "O **ID CONCEPT™** é tudo relacionado à construção e reformulação da marca. Inclui:\n\n→ Naming estratégico\n→ Identidade visual completa\n→ Moodboard e Key Visual (KV)\n→ Guia da marca: tom, voz, personalidade\n→ Brandbook executivo\n→ Site Conceitual Super Premium (quando necessário)\n→ Rebranding corporativo\n\nPerfeito para marcas que querem ser vistas com extrema autoridade.",
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
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20implantar%20IA%20no%20meu%20marketing%20(I.A.E!)",
    },
    response:
      "O **I.A.E!™** implanta IA exclusivamente em **Comunicação e Marketing** (não em financeiro, contábil ou auditoria). Inclui:\n\n→ Raio-X de oportunidades de IA na comunicação\n→ Ferramentas de geração de imagem para redes sociais\n→ Agentes de geração de conteúdo escrito\n→ Soluções de IA para comunicação interna\n→ Plataformas de social media com IA\n→ Treinamento da equipe in-loco ou virtual\n\nSua equipe passa a produzir em dobro pelo mesmo custo.",
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
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20criar%20um%20filme%20com%20ABSOLUTE%20CINEMA",
    },
    response:
      "O **ABSOLUTE CINEMA™** é para empresas que querem contar sua história com padrão cinematográfico — sem precisar de uma fortuna para isso. Inclui:\n\n→ Filme em primeira pessoa (fundador/sócios)\n→ Vídeos de depoimentos cinematográficos\n→ Mini-documentário de marca ou case de sucesso\n→ Bastidores com direção criativa\n→ Roteiro + edição + color grading profissional\n→ Produção acessível: low equipment, high creativity\n\nSua história existe. Falta a câmera certa apontada para ela.",
  },
  {
    keywords: [
      "quem e", "icaro", "ícaro", "albuquerque", "biografia",
      "trajetoria", "trajetória", "cop28", "ministerio", "ministério", "experiencia"
    ],
    product: {
      title: "MASTER PLAN™ & ABSOLUTE CINEMA™",
      category: "Estratégia & Audiovisual",
      color: "#00D4FF",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20conversar",
    },
    response:
      "Ícaro Albuquerque é Estrategista de Comunicação, especialista em Branding e Direção Criativa.\n\nTrajetória:\n→ Coordenação institucional na COP28 (Nações Unidas em Dubai)\n→ Projetos para Ministérios do Governo Federal\n→ Gestão de crises e inovação com IA para comunicação corporativa\n\nÉ uma operação centralizada (\"Eu-presa\"), com padrão de excelência de consultoria global. Quer conversar sobre o seu projeto?",
  },
  {
    keywords: [
      "preco", "preço", "quanto custa", "orcamento", "orçamento",
      "valor", "investimento", "contratar", "tabela", "niveis"
    ],
    product: {
      title: "Diagnóstico Personalizado",
      category: "Estimativa de Investimento",
      color: "#C9A84C",
      waLink:
        "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20site%20e%20quero%20uma%20estimativa%20de%20investimento",
    },
    response:
      "Aqui vai uma visão geral dos níveis de investimento:\n\n🟢 **Essential** — A partir de R$ 6.000\nResolve 1 problema específico com escopo delimitado.\n\n🟡 **Advanced** — A partir de R$ 14.000\nResolve múltiplos problemas com estratégia e 3 meses de acompanhamento.\n\n🟣 **Enterprise** — A partir de R$ 30.000\nTransformação comunicacional completa, múltiplos departamentos.\n\nPagamento: modelo 60% na entrada / 40% na entrega (sem exceções).\n\nOu faça o diagnóstico rápido (4 perguntas) e receba uma estimativa personalizada!",
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
      triagemAtiva = null; // reseta após resultado
      return resultado;
    }

    // Se o usuário digitou fora do fluxo — abandona triagem, processa normalmente
    triagemAtiva = null;
  }

  // ── Abre WhatsApp diretamente
  if (txt.startsWith("__WA_OPEN__")) {
    const waParam = txt.replace("__WA_OPEN__", "");
    window.open(`https://wa.me/5511940684068?text=${waParam}`, "_blank");
    return {
      id: "wa-" + Date.now(),
      sender: "oraculo",
      text: "Ótimo! Abrindo o WhatsApp com um resumo do seu diagnóstico. O Ícaro já vai receber tudo organizado. 🚀",
      timestamp: ts(),
      quickActions: [
        { label: "🔄 Refazer diagnóstico", textToSend: "__TRIAGEM_START__" },
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
        { label: "🎯 Fazer diagnóstico rápido", textToSend: "__TRIAGEM_START__" },
        { label: "💬 Falar com Ícaro no WhatsApp", textToSend: `__WA_OPEN__${encodeURIComponent("Oi Ícaro, vim do site e quero conversar sobre " + matched.product.title)}` },
      ],
    };
  }

  // ── Fallback genérico
  return {
    id: "msg-" + Date.now(),
    sender: "oraculo",
    text: "O Ícaro Albuquerque atua em 4 frentes:\n\n🗺️ **MASTER PLAN™** — Comunicação Inbound & Outbound, Governança e Treinamentos\n🎨 **ID CONCEPT™** — Branding, Rebranding, Guia da Marca & Site Conceitual Super Premium\n🤖 **I.A.E!™** — IA Estratégica aplicada a Comunicação & Marketing\n🎬 **ABSOLUTE CINEMA™** — Filmes Corporativos, Depoimentos & Storytelling Ágil\n\nFaça o diagnóstico rápido e descubra por qual começar.",
    timestamp: ts(),
    quickActions: [
      { label: "🎯 Fazer diagnóstico rápido (4 perguntas)", textToSend: "__TRIAGEM_START__" },
      { label: "💬 Falar com Ícaro no WhatsApp", textToSend: "__WA_OPEN__Oi%20%C3%8Dcaro%2C%20vim%20do%20site%20e%20quero%20conversar" },
    ],
  };
}

// ── HELPER ────────────────────────────────────────────────────────────────────

function ts() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
