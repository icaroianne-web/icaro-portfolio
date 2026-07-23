/* ============================================================
   DESIGN: "Deep Space Broadcast" — About Section
   Asymmetric layout with AI skills and trajectory timeline
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Zap, Network, Crown, BrainCircuit, PlaySquare, Briefcase } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/about-accent-j3iZtYBgwsEowK8DPSX35e.webp";
const AI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/ai-texture-GqDK6g7z5bCccMnSUKuQyC.webp";

const skills = [
  { icon: Crown, label: "Estratégia Corporativa", desc: "Posicionamento B2B, governança e gestão de crises para grandes organizações e mercado público." },
  { icon: Network, label: "Branding & Rebranding", desc: "Arquitetura de marca, identidade visual e direção criativa para elevar a autoridade do seu negócio." },
  { icon: BrainCircuit, label: "IA para Negócios", desc: "Automação de workflows e uso de IA Generativa para dar escala à produção e reduzir custos." },
  { icon: Briefcase, label: "Liderança Criativa", desc: "Gestão de times multidisciplinares e orquestração de agências parceiras em projetos de alto impacto." },
  { icon: Zap, label: "Conteúdo Premium", desc: "Arquitetura editorial e produção de campanhas transmídia focadas em engajamento e conversão." },
  { icon: PlaySquare, label: "Storytelling Audiovisual", desc: "Do roteiro à pós-produção: criação de documentários, vídeos institucionais e coberturas internacionais." },
];

const trajectory = [
  {
    year: "2025/2026",
    event: "Liderança & Rebranding Global",
    desc: "Finamac Brasil: Gestão de portfólio e-commerce (Shopify), criação da estética \"Ice Tech\" e fomento à cultura orientada a dados (Data-driven).",
    highlight: true
  },
  {
    year: "2023/2025",
    event: "Inovação Tech & Impacto Social",
    desc: "Conveniência Adulta: Sócio-Gerente responsável pela integração de IA Conversacional (UX) e liderança de campanhas transmídia focadas em diversidade e saúde.",
    highlight: false
  },
  {
    year: "2022/2023",
    event: "Projeção Internacional",
    desc: "Expedicionários da Saúde (EDS): Coordenação institucional na COP28 Dubai, produção audiovisual premium e criação do Guia de Comunicação para Povos Indígenas.",
    highlight: false
  },
  {
    year: "2020/2021",
    event: "Gestão Pública & Crise",
    desc: "Prefeitura de Santa Fé do Sul: Produção audiovisual ágil (Programa Rolê da Estância) e gerenciamento estratégico de comunicação durante as crises da Covid-19 e hídrica.",
    highlight: false
  },
  {
    year: "2015/2020",
    event: "A Base Multimídia",
    desc: "Kroton / Ag. Multinegócios: Início focado em videografismo, motion graphics e posicionamento de marca para conversão digital, consolidando base técnica audiovisual.",
    highlight: false
  }
];

function useInView(threshold = 0.15) {
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

function TimelineItem({ item, i, smoothProgress }: any) {
  const startPoint = i * (1 / trajectory.length);
  const scale = useTransform(smoothProgress, [startPoint - 0.1, startPoint], [1, 1.3]);
  const color = useTransform(smoothProgress, [startPoint - 0.1, startPoint], ["rgba(0,212,255,0.2)", "#00D4FF"]);
  const shadow = useTransform(smoothProgress, [startPoint - 0.1, startPoint], ["none", "0 0 10px rgba(0,212,255,0.8)"]);
  const bgColor = useTransform(smoothProgress, [startPoint - 0.1, startPoint], ["#080C14", "#00D4FF"]);

  return (
    <motion.div 
      className="relative group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
    >
      <motion.div 
        className="absolute -left-[2.125rem] top-1.5 w-3 h-3 rounded-full border-2 z-20"
        style={{
          borderColor: color,
          backgroundColor: bgColor,
          boxShadow: shadow,
          scale: scale
        }}
      />
      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 w-full">
        <span className="font-mono-tech text-xs text-[#00D4FF] flex-shrink-0 mt-1 opacity-80 group-hover:opacity-100 transition-opacity sm:w-20">{item.year}</span>
        <div className="flex-1 bg-[#0F1623]/40 border border-[rgba(255,255,255,0.02)] p-5 rounded-lg group-hover:bg-[#0F1623]/80 group-hover:border-[rgba(0,212,255,0.1)] transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,212,255,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <h4 className={`font-display font-700 text-lg mb-2 relative z-10 ${item.highlight ? "text-[#C9A84C]" : "text-[#F0F4FF]"}`}>
            {item.event}
          </h4>
          <p className="text-[#8892A4] text-sm leading-relaxed relative z-10">{item.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const { ref, inView } = useInView();
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 50%"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="sobre" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#080C14]" />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-10">
          <img src={ABOUT_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#080C14]" />
        </div>
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: '0ms' }}>
          <div className="flex items-start gap-4 mb-4">
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>02</span>
            <div>
              <div className="tech-badge mb-2">Sobre</div>
              <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                Multimídia.<br />
                <span className="gradient-text-cyan">Multitask.</span><br />
                Multifacetado.
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Bio text */}
          <div className={`lg:col-span-5 space-y-6 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`} style={{ transitionDelay: '200ms' }}>
            <p className="text-[#8892A4] text-lg leading-relaxed">
              Sou <span className="text-[#F0F4FF] font-medium">Ícaro Albuquerque</span>, Líder de Comunicação, Branding & Direção Criativa. Meu trabalho conecta visão estratégica de negócios à tecnologia de ponta para entregar comunicação de alto impacto.
            </p>
            <p className="text-[#8892A4] leading-relaxed">
              Acredito que marcas fortes se constroem através do equilíbrio entre criatividade ousada e execução impecável. Minha experiência abrange a gestão de comunicação para <span className="text-[#C9A84C]">Ministérios do Governo Federal</span> e captação de recursos na <span className="text-[#C9A84C]">COP28 em Dubai</span>.
            </p>
            <p className="text-[#8892A4] leading-relaxed">
              Sou pioneiro na integração de <span className="text-[#00D4FF]">Inteligência Artificial</span> para melhoria de processos, liderando equipes criativas e arquitetando narrativas corporativas que geram autoridade e resultados financeiros reais, sem abrir mão do padrão estético.
            </p>

            {/* AI tools */}
            <div className="pt-4">
              <div className="tech-badge mb-4">
                <BrainCircuit size={10} />
                Ferramentas de IA no Workflow
              </div>
              <div className="flex flex-wrap gap-2">
                {["ChatGPT", "Midjourney", "Runway ML", "ElevenLabs", "Sora", "Adobe Firefly", "CapCut AI", "Canva AI"].map((tool) => (
                  <span key={tool} className="px-2 py-1 text-xs font-mono-tech text-[#00D4FF] bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.15)]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Skills grid */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`} style={{ transitionDelay: '300ms' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, i) => (
                <div
                  key={skill.label}
                  className="case-card p-5 group"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 border border-[rgba(0,212,255,0.2)] flex items-center justify-center flex-shrink-0 group-hover:border-[rgba(0,212,255,0.5)] transition-colors duration-300">
                      <skill.icon size={18} className="text-[#00D4FF]" />
                    </div>
                    <div>
                      <h3 className="font-display font-700 text-sm text-[#F0F4FF] mb-1">{skill.label}</h3>
                      <p className="text-[#8892A4] text-xs leading-relaxed">{skill.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trajectory timeline */}
        <div className={`transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="tech-badge mb-8">Trajetória</div>
          <div ref={timelineRef} className="relative pb-8">
            {/* Base faded line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[rgba(0,212,255,0.1)]" />
            
            {/* Animated neon line */}
            <motion.div 
              className="absolute left-0 top-0 w-px bg-gradient-to-b from-transparent via-[#00D4FF] to-[#00D4FF] shadow-[0_0_10px_#00D4FF] z-10" 
              style={{ height: lineHeight }} 
            />

            <div className="space-y-12 pl-8 pt-2">
              {trajectory.map((item, i) => (
                <TimelineItem key={item.year} item={item} i={i} smoothProgress={smoothProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
