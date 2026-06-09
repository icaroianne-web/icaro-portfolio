/* ============================================================
   DESIGN: "Deep Space Broadcast" — Showreel Section
   Carrossel parallax com vídeos do Vimeo/YouTube
   Tabs: Institucional | Reels | Apresentação
   ============================================================ */

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, ChevronLeft, ChevronRight, Film, Smartphone, User } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";

type VideoCategory = "institucional" | "reels" | "apresentacao";

interface VideoItem {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  year: string;
  embedUrl: string;
  thumbnail: string;
  category: VideoCategory;
}

const videos: VideoItem[] = [
  // Institucionais
  {
    id: "v1",
    title: "Showreel Institucional",
    subtitle: "Portfólio Audiovisual Completo",
    duration: "3:24",
    year: "2024",
    embedUrl: "https://player.vimeo.com/video/359831523?autoplay=0&color=00D4FF&title=0&byline=0&portrait=0",
    thumbnail: `https://vumbnail.com/359831523.jpg`,
    category: "institucional",
  },
  {
    id: "v2",
    title: "Produção Corporativa",
    subtitle: "Vídeo Institucional — Governo Federal",
    duration: "2:15",
    year: "2023",
    embedUrl: "https://player.vimeo.com/video/359831523?autoplay=0&color=00D4FF&title=0&byline=0&portrait=0",
    thumbnail: `https://vumbnail.com/359831523.jpg`,
    category: "institucional",
  },
  {
    id: "v3",
    title: "Cobertura COP28",
    subtitle: "Dubai — Conferência do Clima",
    duration: "4:10",
    year: "2023",
    embedUrl: "https://player.vimeo.com/video/359831523?autoplay=0&color=00D4FF&title=0&byline=0&portrait=0",
    thumbnail: `https://vumbnail.com/359831523.jpg`,
    category: "institucional",
  },
  // Reels
  {
    id: "v4",
    title: "Reel Social Media",
    subtitle: "Conteúdo para Instagram & TikTok",
    duration: "0:45",
    year: "2024",
    embedUrl: "https://player.vimeo.com/video/359831523?autoplay=0&color=00D4FF&title=0&byline=0&portrait=0",
    thumbnail: `https://vumbnail.com/359831523.jpg`,
    category: "reels",
  },
  {
    id: "v5",
    title: "Reel Campanha Digital",
    subtitle: "Estratégia com IA — Resultados Reais",
    duration: "1:00",
    year: "2024",
    embedUrl: "https://player.vimeo.com/video/359831523?autoplay=0&color=00D4FF&title=0&byline=0&portrait=0",
    thumbnail: `https://vumbnail.com/359831523.jpg`,
    category: "reels",
  },
  // Apresentação
  {
    id: "v6",
    title: "Vídeo de Apresentação",
    subtitle: "Quem é Ícaro Albuquerque",
    duration: "2:00",
    year: "2024",
    embedUrl: "https://player.vimeo.com/video/359831523?autoplay=0&color=00D4FF&title=0&byline=0&portrait=0",
    thumbnail: `https://vumbnail.com/359831523.jpg`,
    category: "apresentacao",
  },
];

const tabs: { id: VideoCategory; label: string; icon: typeof Film }[] = [
  { id: "institucional", label: "Institucionais", icon: Film },
  { id: "reels", label: "Reels", icon: Smartphone },
  { id: "apresentacao", label: "Apresentação", icon: User },
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

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#080C14]/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-[#8892A4] hover:text-[#F0F4FF] transition-colors font-mono-tech text-sm"
        >
          [ESC] Fechar
        </button>

        {/* Video embed */}
        <div className="relative aspect-video border border-[rgba(0,212,255,0.2)]">
          <iframe
            src={`${video.embedUrl}&autoplay=1`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={video.title}
          />
        </div>

        {/* Info */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-700 text-lg text-[#F0F4FF]">{video.title}</h3>
            <p className="text-[#8892A4] text-sm">{video.subtitle}</p>
          </div>
          <div className="text-right">
            <div className="font-mono-tech text-xs text-[#00D4FF]">{video.duration}</div>
            <div className="font-mono-tech text-xs text-[#8892A4]">{video.year}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShowreelSection() {
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState<VideoCategory>("institucional");
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredVideos = videos.filter((v) => v.category === activeTab);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollY(-rect.top * 0.3);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : filteredVideos.length - 1));
  }, [filteredVideos.length]);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i < filteredVideos.length - 1 ? i + 1 : 0));
  }, [filteredVideos.length]);

  return (
    <>
      <section id="showreel" ref={sectionRef} className="relative py-24 overflow-hidden">
        {/* Parallax background */}
        <div
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${scrollY}px)` }}
        >
          <img src={HERO_BG} alt="" className="w-full h-full object-cover scale-110 opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#080C14]/70 to-[#080C14]" />
        </div>

        {/* Animated scan lines */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.15)] to-transparent"
              style={{
                animation: `scan ${4 + i * 2}s linear infinite`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

        <div className="container relative z-10" ref={ref}>
          {/* Section header */}
          <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex items-start gap-4 mb-4">
              <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>03</span>
              <div>
                <div className="tech-badge mb-2">
                  <Play size={10} fill="currentColor" />
                  Vídeos
                </div>
                <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                  Showreel &<br />
                  <span className="gradient-text-cyan">Produções</span>
                </h2>
              </div>
            </div>
            <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
          </div>

          {/* Tabs */}
          <div className={`flex gap-1 mb-10 border-b border-[rgba(0,212,255,0.1)] transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 font-mono-tech text-xs uppercase tracking-widest transition-all duration-250 border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "text-[#00D4FF] border-[#00D4FF]"
                    : "text-[#8892A4] border-transparent hover:text-[#F0F4FF]"
                }`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel */}
          <div className={`relative transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Main featured video */}
            {filteredVideos.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Featured */}
                <div className="lg:col-span-7">
                  <div
                    className="video-card group cursor-pointer"
                    onClick={() => setActiveVideo(filteredVideos[currentIndex])}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={filteredVideos[currentIndex]?.thumbnail}
                        alt={filteredVideos[currentIndex]?.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = HERO_BG;
                        }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-[rgba(0,212,255,0.05)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 border-2 border-[rgba(255,255,255,0.6)] flex items-center justify-center group-hover:border-[#00D4FF] group-hover:scale-110 transition-all duration-300 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm">
                          <Play size={24} className="text-white group-hover:text-[#00D4FF] ml-1 transition-colors duration-300" fill="currentColor" />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute top-4 right-4 font-mono-tech text-xs text-[#F0F4FF] bg-[rgba(0,0,0,0.6)] px-2 py-1 backdrop-blur-sm">
                        {filteredVideos[currentIndex]?.duration}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-display font-700 text-lg text-[#F0F4FF]">
                            {filteredVideos[currentIndex]?.title}
                          </h3>
                          <p className="text-[#8892A4] text-sm">{filteredVideos[currentIndex]?.subtitle}</p>
                        </div>
                        <span className="font-mono-tech text-xs text-[#00D4FF]">
                          {filteredVideos[currentIndex]?.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar list */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredVideos.map((video, i) => (
                    <div
                      key={video.id}
                      className={`video-card group cursor-pointer flex gap-3 p-3 transition-all duration-250 ${
                        i === currentIndex ? "border-[rgba(0,212,255,0.4)] bg-[rgba(0,212,255,0.05)]" : ""
                      }`}
                      onClick={() => setCurrentIndex(i)}
                    >
                      <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = HERO_BG;
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)]">
                          <Play size={14} className="text-white" fill="currentColor" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-600 text-sm text-[#F0F4FF] truncate">{video.title}</h4>
                        <p className="text-[#8892A4] text-xs truncate">{video.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono-tech text-[0.6rem] text-[#00D4FF]">{video.duration}</span>
                          <span className="font-mono-tech text-[0.6rem] text-[#8892A4]">{video.year}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            {filteredVideos.length > 1 && (
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="w-10 h-10 border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] hover:border-[rgba(0,212,255,0.5)] transition-all duration-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 border border-[rgba(0,212,255,0.2)] flex items-center justify-center text-[#8892A4] hover:text-[#00D4FF] hover:border-[rgba(0,212,255,0.5)] transition-all duration-200"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Dots */}
                <div className="flex gap-2">
                  {filteredVideos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`transition-all duration-200 ${
                        i === currentIndex
                          ? "w-6 h-1.5 bg-[#00D4FF]"
                          : "w-1.5 h-1.5 bg-[rgba(0,212,255,0.3)] hover:bg-[rgba(0,212,255,0.6)]"
                      }`}
                    />
                  ))}
                </div>

                {/* Vimeo link */}
                <a
                  href="https://vimeo.com/359831523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-tech text-xs text-[#8892A4] hover:text-[#00D4FF] transition-colors duration-200 flex items-center gap-1"
                >
                  Ver no Vimeo →
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
