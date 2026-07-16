/* ============================================================
   DESIGN: "Deep Space Broadcast" — About Section
   Asymmetric layout with AI skills and trajectory timeline
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Brain, Video, Globe, Mic, Zap, Award } from "lucide-react";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/about-accent-j3iZtYBgwsEowK8DPSX35e.webp";
const AI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/ai-texture-GqDK6g7z5bCccMnSUKuQyC.webp";

const skills = [
  { icon: Video, label: "Produção Audiovisual", desc: "Direção, edição e pós-produção de vídeos institucionais, reels e documentários." },
  { icon: Brain, label: "IA para Comunicação", desc: "Uso avançado de ferramentas de IA para criação de conteúdo, automação e estratégia digital." },
  { icon: Globe, label: "Comunicação Institucional", desc: "Estratégia e execução de comunicação para órgãos públicos, ONGs e empresas de grande porte." },
  { icon: Mic, label: "Apresentação & Locução", desc: "Apresentação em eventos, entrevistas e produção de conteúdo para múltiplas plataformas." },
  { icon: Zap, label: "Redes Sociais", desc: "Gestão estratégica de redes sociais com foco em engajamento, alcance e conversão." },
  { icon: Award, label: "Cases Premiados", desc: "Projetos reconhecidos em âmbito nacional e internacional, incluindo a COP28 em Dubai." },
];

const trajectory = [
  { year: "2023", event: "COP28 — Dubai", desc: "Cobertura e produção audiovisual da 28ª Conferência das Nações Unidas sobre Mudanças Climáticas.", highlight: true },
  { year: "2022", event: "Ministério Federal", desc: "Coordenação de comunicação e produção multimídia para órgão do governo federal.", highlight: false },
  { year: "2020", event: "Expansão Digital", desc: "Implementação de estratégias de IA e automação para gestão de redes sociais.", highlight: false },
  { year: "2018", event: "Produção Executiva", desc: "Produção de vídeos institucionais e showreels para clientes corporativos.", highlight: false },
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

export default function AboutSection() {
  const { ref, inView } = useInView();

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
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>01</span>
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
              Sou <span className="text-[#F0F4FF] font-medium">Ícaro Albuquerque</span>, Coordenador de Comunicação e Produtor Multimídia com trajetória que une criatividade, estratégia e tecnologia.
            </p>
            <p className="text-[#8892A4] leading-relaxed">
              Minha experiência abrange desde a produção de vídeos institucionais para <span className="text-[#C9A84C]">Ministérios do Governo Federal</span> até a cobertura da <span className="text-[#C9A84C]">COP28 em Dubai</span> — um percurso que reflete meu compromisso com comunicação de alto impacto.
            </p>
            <p className="text-[#8892A4] leading-relaxed">
              Domino ferramentas de <span className="text-[#00D4FF]">Inteligência Artificial</span> aplicadas à comunicação e redes sociais, integrando tecnologia de ponta à narrativa humana para criar conteúdo que engaja, informa e transforma.
            </p>

            {/* AI tools */}
            <div className="pt-4">
              <div className="tech-badge mb-4">
                <Brain size={10} />
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
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF] via-[rgba(0,212,255,0.3)] to-transparent" />

            <div className="space-y-8 pl-8">
              {trajectory.map((item, i) => (
                <div key={item.year} className="relative group" style={{ transitionDelay: `${i * 100}ms` }}>
                  {/* Dot */}
                  <div className={`absolute -left-[2.125rem] top-1 w-3 h-3 border-2 ${item.highlight ? "border-[#00D4FF] bg-[#00D4FF]" : "border-[rgba(0,212,255,0.4)] bg-[#080C14]"} transition-all duration-300 group-hover:border-[#00D4FF] group-hover:bg-[#00D4FF]`} />

                  <div className="flex items-start gap-4">
                    <span className="font-mono-tech text-xs text-[#00D4FF] flex-shrink-0 mt-1">{item.year}</span>
                    <div>
                      <h4 className={`font-display font-700 text-base ${item.highlight ? "text-[#C9A84C]" : "text-[#F0F4FF]"}`}>
                        {item.event}
                      </h4>
                      <p className="text-[#8892A4] text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
