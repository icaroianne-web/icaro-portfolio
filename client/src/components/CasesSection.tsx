import { Globe, ShieldAlert, TrendingUp } from "lucide-react";

interface Evidence {
  type: "image" | "before_after";
  url?: string;
  before?: string;
  after?: string;
  caption: string;
}

export default function CasesSection() {
  const cases = [
    {
      id: 1,
      tag: "Gestão Pública & Crise",
      icon: ShieldAlert,
      title: "Prefeitura de Santa Fé do Sul",
      subtitle: "Estratégia Ágil, Contenção de Danos e Mobilização Comunitária",
      year: "2020-2024",
      location: "São Paulo, Brasil",
      desafio: "1. Orla do Sol: Apenas uma semana para criar a campanha audiovisual do maior projeto turístico da cidade. 2. Crise Hídrica: Iminência de pânico populacional devido à falta de água. 3. Saúde Pública (Covid-19): Alto volume de desinformação e sobrecarga nos canais de atendimento da prefeitura. 4. Engajamento: Necessidade de manter a população unida e culturalmente ativa durante o isolamento social.",
      execucao: "1. Orla: Roteirizei, captei (drone) e editei um material cinematográfico mesclando imagens reais e projetos 3D para buscar emendas parlamentares. 2. Crise Hídrica: Cobertura in loco das obras emergenciais (poço profundo) com boletins diários de transparência. 3. Saúde: Criação de um Chatbot no WhatsApp para envio automático de boletins, datas de vacinação e triagem de sintomas. 4. Cultura: Criei o canal da SECTUR no YouTube, produzi e editei quadros inéditos para a internet: o Quadro Memórias (sobre pessoas e instituições históricas, como a Profª Eneida e o Instituto Carlos Gomes), o Rolê da Estância (com influenciadores locais promovendo pontos turísticos) e o Biblioteca em Casa (contação de histórias para crianças direto do acervo da biblioteca pública).",
      impacto: "1. Orla do Sol (Aprovação Federal): A campanha audiovisual elevou a credibilidade da proposta, escalando da esfera estadual para a pauta federal. Hoje o projeto está em execução com recursos da União. 2. Aprovação Pública e Reeleição: A transparência em tempo real na crise hídrica consolidou a confiança na gestão. O acervo gerado serviu de combustível estratégico, resultando na reeleição do prefeito com aprovação histórica de 70%. 3. Combate à Pandemia: O Chatbot foi peça-chave na logística vacinal para a população de 36.288 habitantes. O município atingiu mais de 90% de cobertura vacinal entre adultos. 4. Legado Digital: O projeto deixou de herança o canal oficial de Turismo no YouTube, com vídeos orgânicos batendo quase 6 mil views locais.",
      results: ["Recursos Federais", "90% Cobertura Vacinal", "70% Aprovação Pública", "Canal SECTUR (YouTube)"],
      color: "#00D4FF",
      image: null,
      evidences: [
        { type: "image", url: "/assets/orla_1.jpg", caption: "Projeto Orla do Sol: Identidade e Aprovação Federal" },
        { type: "image", url: "/assets/crise_1.jpg", caption: "Gestão de Crise Hídrica: Transparência em Tempo Real" }
      ] as Evidence[]
    },
    {
      id: 2,
      tag: "Impacto Global",
      icon: Globe,
      title: "COP28 DUBAI — EDS",
      subtitle: "Comunicação de Impacto: Da Amazônia ao Palco Global da ONU",
      year: "2023",
      location: "Dubai, Emirados Árabes",
      desafio: "1. Desalinhamento Cultural: Agências parceiras não dominavam a complexidade do tema indígena, gerando propostas inadequadas e muito retrabalho. 2. O Showcase Histórico (COP28): A primeira ONG de saúde na história da conferência climática precisava transformar programas puramente técnicos em 'produtos' visuais robustos para atrair o alto escalão de investidores. 3. Tangibilizar o Impacto Climático: Como provar em números, para líderes mundiais do clima, que a saúde indígena é diretamente responsável pela preservação ambiental?",
      execucao: "1. Guia de Governança Indígena: Criei um manual focado em povos isolados que padronizou nomenclaturas e estabeleceu diretrizes éticas rigorosas para imagens e hierarquia de órgãos competentes. 2. Arsenal Transmídia & Pitch de Guerrilha: Empacotei a ONG em Cardápios de Investimento e Catálogos premium. Na COP28, armei a equipe com iPads contendo vídeos cinematográficos e dossiês compartilháveis instantaneamente via QR Code. 3. O Carbono como Moeda de Valor: Através de pesquisa, utilizamos o coeficiente de retenção de carbono das terras demarcadas como 'moeda'. A narrativa provou que o indígena saudável configura a maior barreira de preservação da Amazônia.",
      impacto: "1. Governança Ética: O alinhamento reduziu o retrabalho das agências a zero. A pertinência do Guia de Comunicação foi tão alta que ele passou a integrar o Manual de Conduta oficial dos médicos voluntários da ONG. 2. Reconhecimento Histórico: A apresentação transmídia institucional pavimentou a recepção da ONG pelo presidente da COP28 e coroou o prêmio de Inovação Tecnológica (Centro Cirúrgico Móvel). 3. Captação Global (+15%): A narrativa do carbono e o Cardápio de Investimentos cumpriram seu papel de forma avassaladora. Aumentamos em 15% a base de doadores internacionais e fechamos parcerias gigantescas com indústrias farmacêuticas para as próximas expedições.",
      results: ["Primeira ONG (COP28)", "+15% Doações Internacionais", "Coeficiente de Carbono", "Guia de Governança"],
      color: "#C9A84C",
      image: null,
      evidences: [
        { type: "image", url: "/assets/cop28_1.jpg", caption: "Apresentação COP28: Recepção Oficial e Showcase Tecnológico" },
        { type: "image", url: "/assets/cop28_2.jpg", caption: "Ecossistema Transmídia: Catálogos e Cardápio de Investimentos" }
      ] as Evidence[]
    },
    {
      id: 3,
      tag: "Rebranding & Growth",
      icon: TrendingUp,
      title: "Finamac Global",
      subtitle: "A Revolução 'Ice Tech' e a Construção de uma Máquina de Vendas",
      year: "2025/2026",
      location: "Brasil",
      desafio: "1. Comunicação Visual Defasada: Equipamentos de altíssima tecnologia e design arrojado não tinham a identidade premium que mereciam. 2. Conteúdo Estagnado: A marca sobrevivia de 'requentar' vídeos antigos, com qualidade baixa e ritmo ultrapassado. 3. Fosso de Leads: O time comercial estava afogado em uma base antiga, sem campanhas ativas. 4. Silos Internos: Engenharia, Marketing e Comercial não falavam a mesma língua, faltando processos e alinhamento.",
      execucao: "1. Conceito Ice Tech: Criei do zero uma identidade unindo a pureza do gelo à performance tecnológica. Inspirados na estética 'Tesla', transformamos as máquinas em objetos de desejo. 2. Choque Audiovisual: Lançamos o TikTok com receitas virais e criamos o quadro 'Pessoas que são Máquinas de Sucesso' no YouTube, pulverizando cortes nas redes. Passamos a transmitir workshops ao vivo direto do showroom e laboratório técnico. 3. Máquina de Aquisição: Estruturei campanhas (Meta/Google Ads) integradas ao HubSpot para atrair leads qualificados. 4. Governança: Criei fluxos ágeis entre Engenharia, Marketing e Comercial, com rituais de aprovação e uma arquitetura editorial robusta.",
      impacto: "A estética Ice Tech aliada à nova esteira de conteúdo gerou: crescimento de 19%* na audiência, +27%* de engajamento e salto de +31%* em novos leads. As metas de vendas foram batidas mesmo durante o 'tarifaço'. Culturalmente, o conceito gerou forte orgulho interno, consolidando a equipe como o BYB (Build Your Business) Dream Team. (*Valores estimados do período).",
      results: ["Conceito Ice Tech", "Estética Tesla", "TikTok & YouTube", "+31% Novos Leads", "HubSpot & Ads"],
      color: "#FF6B35",
      image: null,
      evidences: [
        { type: "before_after", before: "/assets/global_social_antes.jpg", after: "/assets/global_social_depois.jpg", caption: "Feed do Instagram: De Comum a Premium (Ice Tech)" },
        { type: "before_after", before: "/assets/global_site_antes.jpg", after: "/assets/global_site_depois.jpg", caption: "E-commerce Institucional: Antes x Depois" },
        { type: "before_after", before: "/assets/global_produto_antes.jpg", after: "/assets/global_produto_depois.jpg", caption: "Apresentação do Produto: O Conceito de Objeto de Desejo" }
      ] as Evidence[]
    }
  ];

  return (
    <section className="py-20">
      {/* Aqui você manteria o seu código de renderização do componente (o JSX) */}
      {/* Como você já tem o JSX funcionando, ele vai ler essa variável 'cases' e renderizar tudo automaticamente! */}
    </section>
  );
}