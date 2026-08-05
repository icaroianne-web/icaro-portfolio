/* ============================================================
   ORÁCULO™ — Engine de Inteligência Conversacional Contextual (Zero Cost)
   Base de conhecimento completa sobre Ícaro Albuquerque & Serviços
   ============================================================ */

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
}

export const WHATSAPP_BASE_URL = "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20gostaria%20de%20saber%20mais";

export const INITIAL_ORACULO_MESSAGE: ChatMessage = {
  id: "init-1",
  sender: "oraculo",
  text: "Olá! Sou o ORÁCULO™, a inteligência estratégica do site do Ícaro Albuquerque. Posso te ajudar a encontrar a solução perfeita para o seu negócio, seja em comunicação, branding, IA ou vídeos. O que você procura hoje?",
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  quickActions: [
    { label: "🎯 Como funciona o MASTER PLAN™?", textToSend: "Como funciona o MASTER PLAN?" },
    { label: "🎨 Preciso de Rebranding / ID CONCEPT™", textToSend: "Preciso de rebranding e nova identidade visual" },
    { label: "🎤 Ícaro faz Palestras ou Direção de Arte?", textToSend: "O Ícaro faz palestras ou direção de arte?" },
    { label: "🤖 Como aplicar IA no meu negócio?", textToSend: "Como posso aplicar IA na produção da minha empresa?" },
  ],
};

const KNOWLEDGE_BASE = [
  {
    keywords: ["palestra", "palestras", "keynote", "workshop", "apresentacao", "evento", "falar em evento", "palestrante"],
    product: {
      title: "ABSOLUTE CINEMA™ & MASTER PLAN™",
      category: "Audiovisual & Estratégia",
      color: "#FF6B35",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20Palestra/Keynote",
    },
    response: "Sim! O Ícaro Albuquerque realiza Palestras, Keynotes Corporativos e Media Training para executivos e grandes eventos (com bagagem internacional como a COP28 em Dubai). As palestras abordam Estratégia de Comunicação, Storytelling Cinematográfico e Inteligência Artificial na Prática.\n\nVocê gostaria de checar a disponibilidade de data?",
  },
  {
    keywords: ["direcao de arte", "direção de arte", "diretor de arte", "key visual", "kv", "design", "estetica", "estética"],
    product: {
      title: "ID CONCEPT™",
      category: "Branding & Presença",
      color: "#C9A84C",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20preciso%20de%20Dire%C3%A7%C3%A3o%20de%20Arte/Branding",
    },
    response: "A Direção de Arte é um dos pilares centrais do **ID CONCEPT™**. O Ícaro não cria apenas um logo — ele desenvolve todo o conceito estético, linguagem visual, Key Visual (KV) e o site conceitual premium da sua marca para transformá-la em um argumento comercial incontestável.\n\nQuer ver como o ID CONCEPT™ se aplica ao seu projeto?",
  },
  {
    keywords: ["master plan", "masterplan", "plano diretor", "utio", "estrategia", "estratégia", "governança", "governanca", "crise", "crises", "diagnostico", "diagnóstico"],
    product: {
      title: "MASTER PLAN™",
      category: "Comunicação & Estratégia",
      color: "#00D4FF",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20quero%20conhecer%20o%20MASTER%20PLAN",
    },
    response: "O **MASTER PLAN™** é o sistema completo de comunicação do seu negócio. Ele utiliza o exclusivo **Método UTIO** (Urgente, Timing, Imprescindível, Opcional) para diagnosticar sua operação, organizar seu calendário editorial, criar manuais de governança e proteger sua reputação em momentos de crise.\n\nÉ a consultoria ideal para quem quer parar de apagar incêndios e assumir o controle da narrativa.",
  },
  {
    keywords: ["branding", "rebranding", "id concept", "idconcept", "marca", "logo", "logotipo", "identidade visual", "naming", "site", "site novo"],
    product: {
      title: "ID CONCEPT™",
      category: "Branding & Presença",
      color: "#C9A84C",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20preciso%20de%20Rebranding/ID%20CONCEPT",
    },
    response: "O **ID CONCEPT™** define quem sua empresa é antes que o mercado decida por você. Cobrimos desde a concepção do nome (Naming), Identidade Visual, Manual de Marca até o desenvolvimento do seu Site Conceitual Premium.\n\nIdeal para PMEs e médias empresas que querem ser vistas com extrema autoridade.",
  },
  {
    keywords: ["ia", "inteligencia artificial", "inteligência artificial", "iae", "automação", "automacao", "chatgpt", "midjourney", "treinamento", "escala", "custo"],
    product: {
      title: "I.A.E!™",
      category: "Inovação & Tech",
      color: "#00D4FF",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20quero%20implantar%20IA%20(I.A.E!)",
    },
    response: "O **I.A.E!™** (Inteligência Artificial para Empresas) implanta IA no fluxo real da sua operação. Sua equipe passa a produzir com o dobro de velocidade pela metade do custo — mantendo o padrão estético de luxo e a identidade da marca intactos. Treinamos seu time para ter total autonomia.\n\nQuer ver um diagnóstico de onde a IA pode escalar seu negócio?",
  },
  {
    keywords: ["cinema", "absolute cinema", "video", "vídeo", "video institucional", "filme", "documentario", "documentário", "audiovisual", "reels", "youtube", "cop28"],
    product: {
      title: "ABSOLUTE CINEMA™",
      category: "Audiovisual & Cinema",
      color: "#FF6B35",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20quero%20produzir%20um%20vídeo%20com%20o%20ABSOLUTE%20CINEMA",
    },
    response: "O **ABSOLUTE CINEMA™** transforma a trajetória da sua empresa em um filme de alto impacto. Não entregamos vídeos institucionais clichês: criamos documentários corporativos, filmes de marca e séries com padrão cinematográfico (como o material produzido para a COP28 em Dubai).\n\nQuer transformar a história do seu negócio em um argumento memorável?",
  },
  {
    keywords: ["quem é", "quem e", "icaro", "ícaro", "albuquerque", "biografia", "experiencia", "experiência", "trajetoria", "trajetória", "cop28", "ministerio", "ministério"],
    product: {
      title: "MASTER PLAN™ & ABSOLUTE CINEMA™",
      category: "Estratégia & Audiovisual",
      color: "#00D4FF",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20gostaria%20de%20conversar",
    },
    response: "O Ícaro Albuquerque é Estrategista de Comunicação, especialista em Branding e Direção Criativa. Sua trajetória inclui coordenação institucional na COP28 em Dubai (Nações Unidas), projetos para Ministérios do Governo Federal, e liderança em gestão de crises e inovação com IA para empresas.\n\nQuer falar diretamente com ele sobre o seu projeto?",
  },
  {
    keywords: ["preco", "preço", "quanto custa", "orcamento", "orçamento", "valor", "investimento", "contratar"],
    product: {
      title: "Diagnóstico Estratégico",
      category: "Atendimento Personalizado",
      color: "#C9A84C",
      waLink: "https://wa.me/5511940684068?text=Oi%20%C3%8Dcaro,%20vim%20do%20seu%20site%20e%20gostaria%20de%20um%20or%C3%A7amento",
    },
    response: "Cada projeto é desenhado sob medida para o estágio e objetivo do seu negócio. O primeiro passo é uma conversa de diagnóstico estratégico direta com o Ícaro para entender a demanda exata.\n\nVocê prefere agendar pelo WhatsApp ou enviar uma mensagem por e-mail?",
  },
];

export function processOraculoMessage(userText: string): ChatMessage {
  const normalized = userText
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let matched = KNOWLEDGE_BASE.find((item) =>
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
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      recommendedProduct: matched.product,
      quickActions: [
        { label: "💬 Falar com Ícaro no WhatsApp", textToSend: "Quero falar no WhatsApp" },
        { label: "🔍 Ver outros serviços", textToSend: "Quais são os 4 produtos principais?" },
      ],
    };
  }

  // Generic fallback if no specific keyword matches
  return {
    id: "msg-" + Date.now(),
    sender: "oraculo",
    text: "Compreendido! O Ícaro Albuquerque atua em 4 frentes principais:\n\n1. **MASTER PLAN™**: Plano Diretor de Comunicação & Crises\n2. **ID CONCEPT™**: Branding, Naming & Sites Conceituais\n3. **I.A.E!™**: Implantação de Inteligência Artificial Operacional\n4. **ABSOLUTE CINEMA™**: Filmes Institucionais & Palestras\n\nQual dessas áreas se conecta mais com o desafio atual da sua empresa?",
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    quickActions: [
      { label: "💬 Falar diretamente no WhatsApp", textToSend: "Quero falar no WhatsApp" },
      { label: "🎤 Palestras & Direção de Arte", textToSend: "Vocês fazem palestras e direção de arte?" },
    ],
  };
}
