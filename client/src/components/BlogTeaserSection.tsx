/* ============================================================
   DESIGN: "Deep Space Broadcast" — Blog Teaser Section (Home)
   Exibição dos artigos mais recentes da Central de Insights
   ============================================================ */

import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowRight, Clock, Sparkles, BookOpen } from "lucide-react";
import { INITIAL_POSTS } from "@/data/posts";

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

export default function BlogTeaserSection() {
  const { ref, inView } = useInView();
  const recentPosts = INITIAL_POSTS.slice(0, 3);

  return (
    <section id="blog-teaser" className="relative py-24 bg-[#080C14] overflow-hidden border-t border-[rgba(0,212,255,0.08)]">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[300px] bg-[#00D4FF]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[200px] bg-[#FF6B35]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10" ref={ref}>
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <div className="flex items-start gap-4 mb-4">
              <span className="section-number" style={{ position: "relative", fontSize: "clamp(4rem,10vw,8rem)" }}>04</span>
              <div>
                <div className="tech-badge mb-2">
                  <Sparkles size={12} />
                  <span>CENTRAL DE INSIGHTS</span>
                </div>
                <h2 className="font-display font-800 text-[clamp(2rem,5vw,3.5rem)] text-[#F0F4FF] leading-tight">
                  Artigos & <br />
                  <span className="gradient-text-cyan">Estratégia</span>
                </h2>
              </div>
            </div>
            <div className="line-accent max-w-xs ml-[calc(clamp(4rem,10vw,8rem)+1rem)]" />
            <p className="text-[#8892A4] mt-4 ml-[calc(clamp(4rem,10vw,8rem)+1rem)] max-w-lg text-base leading-relaxed">
              Leituras essenciais sobre comunicação corporativa, branding e inteligência artificial aplicada.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.2)] text-[#00D4FF] hover:bg-[rgba(0,212,255,0.12)] hover:border-[#00D4FF] font-mono-tech text-xs tracking-widest uppercase transition-all duration-300 self-start md:self-auto"
          >
            <span>Ver Todos os Artigos</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentPosts.map((post, i) => (
            <article
              key={post.id}
              className={`group flex flex-col bg-[#0F1623] border border-[rgba(0,212,255,0.1)] hover:border-[#00D4FF]/50 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {/* Card Header Image */}
              <div className="relative h-48 overflow-hidden bg-[#080C14]">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-[#080C14]/85 backdrop-blur-md border border-[rgba(0,212,255,0.3)] text-[#00D4FF] text-[10px] font-mono-tech uppercase font-semibold rounded-md">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8892A4] mb-3">
                    <Clock size={12} className="text-[#00D4FF]" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>

                  <h3 className="font-display font-700 text-lg text-[#F0F4FF] group-hover:text-[#00D4FF] transition-colors leading-snug line-clamp-2 mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>

                  <p className="text-[#8892A4] text-xs leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono-tech text-[#8892A4]">
                    #{post.tags[0]}
                  </span>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00D4FF] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Ler Artigo</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
