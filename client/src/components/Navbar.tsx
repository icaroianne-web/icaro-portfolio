/* ============================================================
   DESIGN: "Deep Space Broadcast" — Navbar
   Fixed top nav with blur backdrop, cyan accent on scroll
   ============================================================ */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Início", href: "#hero", external: false },
  { label: "Sobre", href: "#sobre", external: false },
  { label: "Cases", href: "#cases", external: false },
  { label: "Showreel", href: "#showreel", external: false },
  { label: "Contato", href: "#contato", external: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, external?: boolean) => {
    if (external) {
      setMobileOpen(false);
      return; // Deixe o link abrir normalmente na nova aba (target="_blank")
    }
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#080C14]/90 backdrop-blur-xl border-b border-[rgba(0,212,255,0.1)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleLinkClick(e as any, "#hero")}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-8 h-8 border border-[rgba(0,212,255,0.4)] flex items-center justify-center group-hover:border-[#00D4FF] transition-colors duration-300">
                <div className="w-3 h-3 bg-[#00D4FF] group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6B35] rounded-full" />
            </div>
            <div>
              <div className="font-display font-800 text-sm text-[#F0F4FF] leading-none tracking-wide">
                ÍCARO
              </div>
              <div className="font-mono-tech text-[0.6rem] text-[#00D4FF] leading-none tracking-widest uppercase">
                Albuquerque
              </div>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e as any, link.href, link.external)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://wa.me/5511940684068"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-5"
            >
              Fale Comigo
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-[#F0F4FF] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#080C14]/98 backdrop-blur-xl flex flex-col items-center justify-center transition-all duration-400 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e as any, link.href, link.external)}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="font-display font-700 text-3xl text-[#F0F4FF] hover:text-[#00D4FF] transition-colors duration-200"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5511940684068"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
          >
            Fale Comigo
          </a>
        </div>
      </div>
    </>
  );
}
