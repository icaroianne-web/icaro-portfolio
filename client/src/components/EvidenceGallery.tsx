/* ============================================================
   EvidenceGallery — módulo reutilizável de evidências de case
   Suporta: image | video | before_after | press
   Renderiza apenas as abas correspondentes ao conteúdo existente
   em cada case (nem todo case precisa ter todos os tipos).
   ============================================================ */

import { useState, useRef, useCallback } from "react";
import { Image as ImageIcon, PlayCircle, SlidersHorizontal, Newspaper, Eye, X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

export type ImageEvidence = { type: "image"; url: string; caption: string };
export type VideoEvidence = {
  type: "video";
  url: string; // watch URL (YouTube/Vimeo) ou caminho de arquivo .mp4
  caption: string;
  provider?: "youtube" | "vimeo" | "file";
  thumbnail?: string; // opcional, poster para vídeo em arquivo
};
export type BeforeAfterEvidence = {
  type: "before_after";
  before: string;
  after: string;
  caption: string;
};
export type PressEvidence = {
  type: "press";
  url: string;
  source: string; // ex: "G1", "Folha de S.Paulo"
  headline: string;
  date?: string;
};

export type Evidence = ImageEvidence | VideoEvidence | BeforeAfterEvidence | PressEvidence;

const TAB_META: Record<Evidence["type"], { label: string; icon: typeof ImageIcon }> = {
  image: { label: "Materiais Visuais", icon: ImageIcon },
  video: { label: "Vídeos", icon: PlayCircle },
  before_after: { label: "Antes / Depois", icon: SlidersHorizontal },
  press: { label: "Imprensa", icon: Newspaper },
};

// Ordem de exibição das abas quando presentes
const TAB_ORDER: Evidence["type"][] = ["before_after", "image", "video", "press"];

function toEmbedUrl(url: string, provider?: "youtube" | "vimeo" | "file") {
  if (provider === "vimeo") {
    const id = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  // default: youtube
  const ytId =
    url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)?.[1];
  return ytId ? `https://www.youtube.com/embed/${ytId}` : url;
}

function BeforeAfterSlider({ item, color }: { item: BeforeAfterEvidence; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50); // % da posição do divisor

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    updateFromClientX(e.clientX);
  };

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden select-none cursor-ew-resize border border-[rgba(0,212,255,0.1)]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
      >
        {/* Depois (base) */}
        <img src={item.after} alt="Depois" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        {/* Antes (recortado pelo clip-path) */}
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={item.before} alt="Antes" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
        </div>
        {/* Divisor */}
        <div className="absolute top-0 bottom-0 w-[2px]" style={{ left: `${pos}%`, backgroundColor: color }}>
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center border-2"
            style={{ borderColor: color, backgroundColor: "#0F1623" }}
          >
            <SlidersHorizontal size={12} style={{ color }} />
          </div>
        </div>
        {/* Labels */}
        <span className="absolute top-2 left-2 font-mono-tech text-[0.6rem] uppercase tracking-widest px-2 py-0.5 bg-black/60 text-[#F0F4FF]">Antes</span>
        <span className="absolute top-2 right-2 font-mono-tech text-[0.6rem] uppercase tracking-widest px-2 py-0.5 bg-black/60 text-[#F0F4FF]">Depois</span>
      </div>
      <p className="text-[0.65rem] text-[#8892A4] font-outfit">{item.caption}</p>
    </div>
  );
}

export default function EvidenceGallery({ evidences, color }: { evidences: Evidence[]; color: string }) {
  const availableTypes = TAB_ORDER.filter((t) => evidences.some((e) => e.type === t));
  const [activeTab, setActiveTab] = useState<Evidence["type"] | null>(availableTypes[0] ?? null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  if (evidences.length === 0 || !activeTab) return null;

  const currentItems = evidences.filter((e) => e.type === activeTab);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : currentItems.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev !== null && prev < currentItems.length - 1 ? prev + 1 : 0));
  };

  const currentLightboxItem = lightboxIndex !== null ? currentItems[lightboxIndex] : null;

  return (
    <div className="mt-6 pt-4 border-t border-[rgba(0,212,255,0.05)]">
      {/* Abas — só as que têm conteúdo */}
      {availableTypes.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {availableTypes.map((t) => {
            const Meta = TAB_META[t];
            const Icon = Meta.icon;
            const active = activeTab === t;
            return (
              <button
                key={t}
                onClick={() => {
                  setActiveTab(t);
                  setLightboxIndex(null);
                }}
                className="inline-flex items-center gap-1.5 font-mono-tech text-[0.6rem] tracking-widest uppercase px-2.5 py-1 border transition-all duration-200"
                style={
                  active
                    ? { color, borderColor: `${color}60`, backgroundColor: `${color}0D` }
                    : { color: "#8892A4", borderColor: "rgba(0,212,255,0.1)", backgroundColor: "transparent" }
                }
              >
                <Icon size={12} />
                {Meta.label}
              </button>
            );
          })}
        </div>
      )}

      {availableTypes.length === 1 && (
        <strong className="text-[#F0F4FF] block mb-3 font-display tracking-wide uppercase text-[0.7rem]">
          {TAB_META[activeTab].label}
        </strong>
      )}

      {/* Conteúdo: IMAGE */}
      {activeTab === "image" && (
        <div className="relative group/carousel">
          {/* Scroll Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin snap-x overflow-y-hidden scroll-smooth"
          >
            {(currentItems as ImageEvidence[]).map((mat, idx) => (
              <div
                key={idx}
                className="relative flex-none w-[240px] aspect-video bg-[#0F1623] border border-[rgba(0,212,255,0.1)] group/img cursor-zoom-in snap-start overflow-hidden rounded"
                onClick={() => setLightboxIndex(idx)}
              >
                <img
                  src={mat.url}
                  alt={mat.caption}
                  className="w-full h-full object-cover opacity-85 group-hover/img:opacity-100 group-hover/img:scale-105 transition-all duration-300"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-black/40 opacity-100 group-hover/img:opacity-0 transition-opacity duration-200 flex items-center justify-center">
                  <Eye size={18} className="text-[#00D4FF] opacity-80 group-hover/img:opacity-100" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/75 px-2 py-1 text-[0.55rem] text-[#F0F4FF] font-mono-tech truncate border-t border-[rgba(0,212,255,0.05)]">
                  {mat.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo: BEFORE / AFTER */}
      {activeTab === "before_after" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(currentItems as BeforeAfterEvidence[]).map((item, idx) => (
            <BeforeAfterSlider key={idx} item={item} color={color} />
          ))}
        </div>
      )}

      {/* Conteúdo: VIDEO */}
      {activeTab === "video" && (
        <div className="relative group/carousel">
          {/* Scroll Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/80 border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-3 overflow-x-auto pb-3 scrollbar-thin snap-x overflow-y-hidden scroll-smooth"
          >
            {(currentItems as VideoEvidence[]).map((vid, idx) => (
              <div
                key={idx}
                className="relative flex-none w-[280px] aspect-video bg-[#0F1623] border border-[rgba(0,212,255,0.1)] group/vid cursor-pointer snap-start overflow-hidden flex items-center justify-center rounded"
                onClick={() => setLightboxIndex(idx)}
              >
                {vid.thumbnail ? (
                  <img
                    src={vid.thumbnail}
                    alt={vid.caption}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/vid:opacity-90 transition-opacity"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0F1623] to-[#080C14]" />
                )}
                <PlayCircle
                  size={36}
                  className="relative z-10 text-[#00D4FF] opacity-90 group-hover/vid:scale-110 transition-transform"
                />
                <span className="absolute bottom-0 left-0 right-0 text-[0.55rem] text-[#F0F4FF] font-mono-tech truncate bg-black/75 px-2 py-1 border-t border-[rgba(0,212,255,0.05)]">
                  {vid.caption}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conteúdo: PRESS */}
      {activeTab === "press" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(currentItems as PressEvidence[]).map((p, idx) => (
            <a
              key={idx}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 border border-[rgba(0,212,255,0.1)] bg-[#0F1623] hover:border-[rgba(0,212,255,0.3)] transition-colors group/press rounded"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-mono-tech text-[0.6rem] uppercase tracking-widest text-[#00D4FF]">
                  {p.source}
                </span>
                <ExternalLink size={11} className="text-[#8892A4] group-hover/press:text-[#00D4FF]" />
              </div>
              <p className="text-[0.72rem] text-[#F0F4FF] font-outfit leading-snug">{p.headline}</p>
              {p.date && <span className="text-[0.6rem] text-[#8892A4] font-mono-tech">{p.date}</span>}
            </a>
          ))}
        </div>
      )}

      {/* Lightbox Gigante e Unificado (Imagens e Vídeos) */}
      {lightboxIndex !== null && currentLightboxItem && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-[#8892A4] hover:text-[#00D4FF] bg-[#0F1623]/80 p-2 rounded-full border border-[rgba(0,212,255,0.1)] transition-colors z-50"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={24} />
          </button>

          {/* Media Container */}
          <div
            className="relative w-full max-w-5xl aspect-video flex items-center justify-center rounded overflow-hidden border border-[rgba(0,212,255,0.2)] shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Direct Side Navigation for Desktop */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 border border-[rgba(0,212,255,0.1)] hidden md:flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] hover:bg-[#0F1623] transition-all"
            >
              <ChevronLeft size={24} />
            </button>

            {currentLightboxItem.type === "image" ? (
              <img
                src={currentLightboxItem.url}
                alt={currentLightboxItem.caption}
                className="max-w-full max-h-full object-contain w-auto h-auto"
                crossOrigin="anonymous"
              />
            ) : currentLightboxItem.type === "video" ? (
              <div className="w-full h-full aspect-video bg-black flex items-center justify-center">
                {currentLightboxItem.provider === "file" ? (
                  <video src={currentLightboxItem.url} controls autoPlay className="w-full h-full object-contain" />
                ) : (
                  <iframe
                    src={toEmbedUrl(currentLightboxItem.url, currentLightboxItem.provider)}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ) : null}

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 border border-[rgba(0,212,255,0.1)] hidden md:flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] hover:bg-[#0F1623] transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Bar: Seta Mobile + Caption */}
          <div
            className="flex items-center justify-between gap-4 mt-4 w-full max-w-5xl bg-[#0F1623] border border-[rgba(0,212,255,0.1)] px-4 py-2 text-xs rounded"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 border border-[rgba(0,212,255,0.15)] text-[#8892A4] hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all font-mono-tech uppercase text-[0.65rem] tracking-wider"
            >
              &lt; Anterior
            </button>
            <p className="text-[#F0F4FF] font-mono-tech tracking-wider uppercase truncate text-center flex-1 mx-2 text-[0.7rem]">
              📂 {currentLightboxItem.caption} ({lightboxIndex + 1}/{currentItems.length})
            </p>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 border border-[rgba(0,212,255,0.15)] text-[#8892A4] hover:text-[#00D4FF] hover:border-[#00D4FF]/30 transition-all font-mono-tech uppercase text-[0.65rem] tracking-wider"
            >
              Próximo &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
