/* ============================================================
   DESIGN: "Deep Space Broadcast" — Footer
   Minimal footer com copyright e links rápidos
   ============================================================ */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-[rgba(0,212,255,0.08)]">
      <div className="container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo/Name */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-6 h-6 border border-[rgba(0,212,255,0.3)] flex items-center justify-center">
                <div className="w-2 h-2 bg-[#00D4FF]" />
              </div>
            </div>
            <div>
              <span className="font-display font-700 text-sm text-[#F0F4FF]">Ícaro Albuquerque</span>
              <span className="font-mono-tech text-[0.6rem] text-[#8892A4] ml-2">© {currentYear}</span>
            </div>
          </div>

          {/* Center: tagline */}
          <div className="font-mono-tech text-[0.65rem] text-[#8892A4] text-center">
            MASTER PLAN™ · ID CONCEPT™ · I.A.E!™ · ABSOLUTE CINEMA™
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4">
            {[
              { label: "LinkedIn", url: "https://www.linkedin.com/in/icaroia/" },
              { label: "WhatsApp", url: "https://wa.me/5511940684068" },
              { label: "E-mail", url: "mailto:icaroianne@outlook.com.br" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono-tech text-[0.65rem] text-[#8892A4] hover:text-[#00D4FF] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Selo de Assinatura de Autor / Presença Digital */}
        <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.04)] flex flex-col sm:flex-row items-center justify-between text-[0.65rem] font-mono-tech text-[#8892A4] gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4FF] animate-pulse" />
            <span>Presença Digital Arquitetada por <strong className="text-[#F0F4FF] font-semibold">Ícaro Albuquerque</strong></span>
          </div>
          <span className="px-2 py-0.5 rounded bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.15)] text-[#00D4FF]">
            ID CONCEPT™ Studio
          </span>
        </div>
      </div>
    </footer>
  );
}
