/* ============================================================
   DESIGN: "Deep Space Broadcast" — Contact & Social Section
   Redes sociais com ícones e CTA de contato
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { MessageCircle, Linkedin, Mail, FolderOpen, Instagram, ExternalLink, Youtube } from "lucide-react";

const AI_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/ai-texture-GqDK6g7z5bCccMnSUKuQyC.webp";

const socialLinks = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    handle: "+55 11 94068-4068",
    url: "https://wa.me/5511940684068",
    color: "#25D366",
    desc: "Fale diretamente comigo",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "icaroia",
    url: "https://www.linkedin.com/in/icaroia/",
    color: "#0A66C2",
    desc: "Conecte-se profissionalmente",
  },
  {
    icon: Instagram,
    label: "Instagram",
    handle: "@icaroia",
    url: "https://instagram.com/icaroia",
    color: "#E1306C",
    desc: "Conteúdo e bastidores",
  },
  {
    icon: Youtube,
    label: "YouTube",
    handle: "@icaroiandj",
    url: "https://youtube.com/icaroiandj",
    color: "#FF0000",
    desc: "Showreel e produções",
  },
  {
    icon: Mail,
    label: "E-mail",
    handle: "icaroianne@outlook.com.br",
    url: "mailto:icaroianne@outlook.com.br",
    color: "#FF6B35",
    desc: "Para projetos e parcerias",
  },
  {
    icon: FolderOpen,
    label: "Portfólio",
    handle: "OneDrive — Materiais",
    url: "https://1drv.ms/f/c/88b902e4fc55726d/Em1yVfzkArkggIhqAAAAAAABfDhfVc5sa4ndKr5Rz9w1HQ?e=u4YjGX",
    color: "#C9A84C",
    desc: "Acesse materiais completos",
  },
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

export default function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section id="contato" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={AI_BG} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#080C14]/80 to-[#080C14]" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Section header */}
        <div className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-start gap-4 mb-4">
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>04</span>
            <div>
              <div className="tech-badge mb-2">Contato</div>
              <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                Vamos criar<br />
                <span className="gradient-text-cyan">algo juntos?</span>
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
          <p className="text-[#8892A4] mt-4 ml-[calc(clamp(4rem,10vw,8rem)+1rem)] max-w-lg text-lg">
            Estou disponível para projetos de comunicação, produção audiovisual e estratégia digital.
          </p>
        </div>

        {/* Main CTA */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative overflow-hidden border border-[rgba(0,212,255,0.15)] bg-[#0F1623] p-8 lg:p-12">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(0,212,255,0.06)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(255,107,53,0.06)_0%,transparent_70%)]" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00D4FF]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF6B35]" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="tech-badge mb-4">Disponível para projetos</div>
                <h3 className="font-display font-800 text-2xl lg:text-3xl text-[#F0F4FF] mb-4">
                  Transforme sua comunicação com narrativas que impactam.
                </h3>
                <p className="text-[#8892A4] leading-relaxed">
                  De vídeos institucionais a estratégias digitais com IA — entrego comunicação que conecta, engaja e gera resultados mensuráveis.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href="https://wa.me/5511940684068"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle size={16} />
                  Falar no WhatsApp
                </a>
                <a
                  href="mailto:icaroianne@outlook.com.br"
                  className="btn-outline"
                >
                  <Mail size={16} />
                  Enviar E-mail
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social links grid */}
        <div className={`transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="tech-badge mb-8">Redes Sociais & Contatos</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialLinks.map((social, i) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="case-card group flex items-center gap-4 p-5 no-underline"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 border transition-all duration-300"
                  style={{
                    borderColor: `${social.color}30`,
                    backgroundColor: `${social.color}0D`,
                  }}
                >
                  <social.icon
                    size={20}
                    style={{ color: social.color }}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-700 text-sm text-[#F0F4FF]">{social.label}</span>
                    <ExternalLink size={12} className="text-[#8892A4] group-hover:text-[#00D4FF] transition-colors duration-200 flex-shrink-0" />
                  </div>
                  <div className="font-mono-tech text-xs text-[#8892A4] truncate">{social.handle}</div>
                  <div className="text-xs text-[#8892A4] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {social.desc}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
