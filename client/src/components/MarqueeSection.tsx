/* ============================================================
   DESIGN: "Deep Space Broadcast" — Marquee/Ticker Section
   Faixa animada com clientes, conquistas e palavras-chave
   ============================================================ */

const items = [
  "COP28 — Dubai",
  "Ministério Federal",
  "Produção Audiovisual",
  "IA para Comunicação",
  "Estratégia Digital",
  "Showreel",
  "Vídeos Institucionais",
  "Redes Sociais",
  "Comunicação de Impacto",
  "Narrativas Audiovisuais",
  "Reels & Conteúdo",
  "Cobertura Internacional",
];

export default function MarqueeSection() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-4 overflow-hidden border-y border-[rgba(0,212,255,0.08)] bg-[#0A0F1A]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0F1A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0F1A] to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
          width: "max-content",
        }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-mono-tech text-xs text-[#8892A4] uppercase tracking-widest">
              {item}
            </span>
            <span className="w-1 h-1 bg-[#00D4FF] rounded-full flex-shrink-0" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
