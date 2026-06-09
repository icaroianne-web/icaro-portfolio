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
            Comunicação · Produção Multimídia · IA
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-4">
            {[
              { label: "LinkedIn", url: "https://www.linkedin.com/in/icaroalbuquerque/" },
              { label: "Vimeo", url: "https://vimeo.com/359831523" },
              { label: "WhatsApp", url: "https://wa.me/5511940684068" },
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
      </div>
    </footer>
  );
}
