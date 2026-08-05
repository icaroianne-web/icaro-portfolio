export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: "Estratégia & Direção" | "Branding & Presença" | "Storytelling & Vídeo" | "IA & Inovação";
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  featuredImage: string;
  tags: string[];
  content: string;
  relatedProductId?: "plano-diretor" | "marca-viva" | "absolute-cinema";
}

export const BLOG_CATEGORIES = [
  "Todos",
  "Estratégia & Direção",
  "Branding & Presença",
  "Storytelling & Vídeo",
  "IA & Inovação",
] as const;

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "plano-diretor-de-comunicacao-metodo-utio",
    title: "MASTER PLAN™: Como parar de apagar incêndios e assumir o controle da sua narrativa",
    excerpt: "Conheça o Método UTIO (Bússola de Prioridade) no MASTER PLAN™ para separar o que é urgente, o que exige timing oportuno, o que é indispensável e o que é opcional na sua empresa.",
    category: "Estratégia & Direção",
    readTime: "6 min de leitura",
    publishedAt: "04 de Agosto, 2026",
    author: {
      name: "Ícaro Albuquerque",
      role: "Estrategista de Comunicação & Direção Criativa",
      avatar: "/icaro-avatar.jpg",
    },
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tags: ["MASTER PLAN™", "Método UTIO", "Estratégia", "Comunicação Corporativa"],
    relatedProductId: "plano-diretor",
    content: `
## O Dilema da Constância Sem Direção

Muitos empresários e líderes de comunicação caem na armadilha da constância vazia: publicam todos os dias nas redes sociais, gravam vídeos curtos, disparam e-mails, mas sentem que a mensagem da empresa continua dispersa e inconsistente.

O problema raramente é a falta de produção de conteúdo. **O verdadeiro gargalo é a falta de direção estratégica sobre o que comunicar primeiro.**

Sem um mapa claro, toda demanda parece urgente, toda novidade do mercado parece obrigatória e qualquer imprevisto vira uma crise interna.

---

## A Solução: O Método UTIO no MASTER PLAN™

Para resolver esse caos operacional, desenvolvemos o **Método UTIO** dentro do nosso **MASTER PLAN™ (Sistema Completo de Comunicação)**. Essa metodologia organiza suas decisões de comunicação em quatro direcionais bem definidos:

### 1. Urgente (U) — Resolver Agora
Se você não agir nos próximos 30 dias, algo piora, quebra ou vira uma crise de imagem/vendas. São as ações corretivas imediatas.

### 2. Timing (T) — Janela de Oportunidade
Existe um momento específico no mercado ou na agenda do seu setor que, se perdido, custará mais caro depois. Exige agilidade de execução.

### 3. Indispensável (I) — A Base Estrutural
Aquilo que sustenta toda a marca, independentemente da moda passageira: posicionamento cristalino, manual de comunicação, site funcional e matrizes de campanha.

### 4. Opcional (O) — Testes e Expansão
Ideias que seriam excelentes "ter no futuro", mas que não comprometem o crescimento do negócio caso fiquem para um segundo momento.

> "Quando tudo é prioridade, nada é prioridade. O Método UTIO no MASTER PLAN™ devolve a clareza estratégica ao líder."

---

## Como Implementar o MASTER PLAN™

O MASTER PLAN™ não é um PDF estático de 100 páginas que fica gavetado. É um sistema vivo de tomada de decisão que acompanha sua equipe ou agência parceira.

Se a sua empresa precisa de clareza imediata e de uma arquitetura editorial robusta, conheça os detalhes do nosso **MASTER PLAN™**.
    `,
  },
  {
    id: "2",
    slug: "marca-viva-branding-presenca-digital-pme",
    title: "ID CONCEPT™: Por que seu site e sua identidade visual precisam falar a mesma língua",
    excerpt: "Não adianta investir em um design moderno se a linguagem e a experiência do usuário não transmitem confiança em cada ponto de contato.",
    category: "Branding & Presença",
    readTime: "5 min de leitura",
    publishedAt: "01 de Agosto, 2026",
    author: {
      name: "Ícaro Albuquerque",
      role: "Estrategista de Comunicação & Direção Criativa",
      avatar: "/icaro-avatar.jpg",
    },
    featuredImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    tags: ["ID CONCEPT™", "Branding", "UX Design", "Presença Digital"],
    relatedProductId: "marca-viva",
    content: `
## Além do Logotipo

Um erro comum em médias empresas é tratar a criação do site como um serviço isolado do branding. O resultado? Uma marca visualmente bonita no Instagram, mas um site frio, desalinhado e com textos genéricos que não convertem.

O conceito do **ID CONCEPT™** nasce da premissa de que a sua identidade é um argumento comercial contínuo. Ela se desdobra desde o conceito institucional até os micro-textos (UX Writing) e botões de chamada no site.

---

## Os 3 Pilares do ID CONCEPT™

1. **Coerência Estética & Sensorial:** Cores, tipografia e ritmo de layout que comunicam autoridade e sofisticação imediata.
2. **Arquitetura da Informação Reativa:** Seu cliente deve encontrar o que precisa em menos de 3 cliques, compreendendo instantaneamente o valor do seu produto.
3. **SEO On-Page & Copywriting Integrado:** O Google e o seu cliente buscam a mesma coisa: respostas claras, estrutura semântica impecável e relevância real.

> "A presença digital é a consequência natural de um branding bem executado — nunca um remendo de última hora."

---

## Construindo a Sua Presença Premium

Se o seu site ou a sua marca visual parecem desalinhados do nível real do seu produto, o **ID CONCEPT™** reconstrói a sua autoridade do posicionamento à experiência web.
    `,
  },

  {
    id: "3",
    slug: "absolute-cinema-storytelling-audiovisual-corporativo",
    title: "Absolute Cinema™: Transformando histórias corporativas em documentários de alto impacto",
    excerpt: "Como utilizar a linguagem cinematográfica e o storytelling autêntico para conectar executivos, clientes e investidores.",
    category: "Storytelling & Vídeo",
    readTime: "7 min de leitura",
    publishedAt: "28 de Julho, 2026",
    author: {
      name: "Ícaro Albuquerque",
      role: "Coordenador de Comunicação & Produtor Multimídia",
      avatar: "/icaro-avatar.jpg",
    },
    featuredImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    tags: ["Absolute Cinema", "Audiovisual", "Storytelling", "COP28"],
    relatedProductId: "absolute-cinema",
    content: `
## O Fim dos Vídeos Institucionais Genéricos

Ninguém mais assiste a vídeos institucionais com trilhas de banco de áudio genéricas e textos engessados. A atenção do público moderno exige emoção, narrativa cinematográfica e estética apurada.

Na nossa trajetória — que vai de projetos governamentais até grandes palcos globais como a **COP28 em Dubai** —, comprovamos que a melhor forma de gerar autoridade é contar a história real por trás da marca.

---

## O Que Torna uma Produção "Absolute Cinema™"?

- **Roteirização com Arco Dramático Real:** Descobrimos o elemento humano e os bastidores marcantes da sua empresa.
- **Direção de Arte Cinematográfica:** Iluminação, enquadramento e color grading que rivalizan com grandes estúdios.
- **Distribuição Multiplataforma:** Do formato widescreen para salas de conselho aos vídeos verticais estratégicos para Reels e LinkedIn Premium.

---

## Eleve a Narrativa da Sua Empresa

Descubra como o **Absolute Cinema™** pode transformar a trajetória do seu negócio em um ativo audiovisual memorável.
    `,
  },
];
