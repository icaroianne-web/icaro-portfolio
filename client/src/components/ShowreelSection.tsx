import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663747808873/FfsF68pckBa2uV6MzkU5TV/hero-bg-E7HYZ4kGT8iWScT3p76AXn.webp";

const MAIN_VIDEO_COVER = "https://i.vimeocdn.com/video/813834300-1c49990ccfd743b81ccaa7094345f05c0b7babed61e11aef1df8d57e89d64e14-d_1280"; // Vimeo Thumbnail
const MAIN_VIDEO_URL = "https://player.vimeo.com/video/359831523";

const galleryVideos = [
  { id: 1, title: "Videocase Institucional", cover: "https://img.youtube.com/vi/Uiag0c5YMzY/maxresdefault.jpg", url: "https://www.youtube.com/embed/Uiag0c5YMzY" },
  { id: 2, title: "Produção Comercial", cover: "https://img.youtube.com/vi/CQ7KdJUsh6E/maxresdefault.jpg", url: "https://www.youtube.com/embed/CQ7KdJUsh6E" },
  { id: 3, title: "Documentário Social", cover: "https://img.youtube.com/vi/M-sFYi97Cr0/maxresdefault.jpg", url: "https://www.youtube.com/embed/M-sFYi97Cr0" },
  { id: 4, title: "Videocase Cultural", cover: "https://img.youtube.com/vi/iM87dnXKmug/maxresdefault.jpg", url: "https://www.youtube.com/embed/iM87dnXKmug" },
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

export default function ShowreelSection() {
  const { ref, inView } = useInView();
  const [playMain, setPlayMain] = useState(false);
  const [playingGalleryId, setPlayingGalleryId] = useState<number | null>(null);

  return (
    <section id="showreel" className="relative py-24 bg-[#080C14] overflow-hidden border-t border-[rgba(0,212,255,0.05)]">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <img src={HERO_BG} alt="" className="w-full h-full object-cover mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-transparent to-[#080C14]" />
      </div>

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number" style={{ position: "relative", fontSize: "clamp(3rem,6vw,5rem)" }}>02</span>
            <div>
              <div className="tech-badge mb-2">Showreel</div>
              <h2 className="font-display font-800 text-[clamp(2rem,4vw,3rem)] text-[#F0F4FF] leading-tight">
                Portfólio <span className="gradient-text-orange">Audiovisual</span>
              </h2>
            </div>
          </div>
          <div className="line-accent max-w-xs ml-[calc(clamp(3rem,6vw,5rem)+1rem)]" />
        </div>

        {/* Main Video Player */}
        <div className={`relative w-full aspect-video border border-[rgba(0,212,255,0.15)] bg-[#0F1623] overflow-hidden group transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#00D4FF] z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#FF6B35] z-20 pointer-events-none" />

          {!playMain ? (
            <div className="absolute inset-0 cursor-pointer flex items-center justify-center z-10" onClick={() => setPlayMain(true)}>
              <img src={MAIN_VIDEO_COVER} alt="Main Showreel Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Play Button */}
              <div className="relative w-20 h-20 bg-[rgba(0,212,255,0.1)] border border-[#00D4FF] rounded-full flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-300">
                <Play size={32} className="text-[#00D4FF] ml-1" fill="currentColor" />
              </div>
              
              {/* Ligue o Som Badge */}
              <div className="absolute bottom-6 right-6 animate-bounce bg-[#080C14]/80 backdrop-blur-md border border-[#00D4FF] px-4 py-2 rounded-full flex items-center gap-2 text-[#00D4FF] font-mono-tech text-xs tracking-widest uppercase">
                <span>Ligue o som</span>
                <Volume2 size={14} />
              </div>
            </div>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full z-10"
              src={`${MAIN_VIDEO_URL}?autoplay=1&rel=0&modestbranding=1`}
              title="Showreel Principal"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Video Gallery */}
        <div className={`mt-16 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="tech-badge mb-8">Vídeos de Destaque</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryVideos.map((video, idx) => (
              <div key={video.id} className="case-card group overflow-hidden" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="relative w-full aspect-video bg-[#080C14]">
                  {playingGalleryId === video.id ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`${video.url}?autoplay=1&rel=0&modestbranding=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setPlayingGalleryId(video.id)}>
                      <img src={video.cover} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 border border-[rgba(255,107,53,0.5)] rounded-full flex items-center justify-center bg-[rgba(255,107,53,0.1)] backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                          <Play size={20} className="text-[#FF6B35] ml-1" fill="currentColor" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-[rgba(0,212,255,0.08)]">
                  <h3 className="font-display font-700 text-sm text-[#F0F4FF] line-clamp-1">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}