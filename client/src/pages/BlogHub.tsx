/* ============================================================
   DESIGN: "Deep Space Broadcast" — Blog Hub (/blog)
   Central de Insights, Estratégias & Artigos
   ============================================================ */

import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, ArrowRight, Clock, Tag, Sparkles, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { INITIAL_POSTS, BLOG_CATEGORIES } from "@/data/posts";

export default function BlogHub() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const filteredPosts = useMemo(() => {
    return INITIAL_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "Todos" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        post.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F0F4FF] selection:bg-[#00D4FF] selection:text-[#080C14]">
      <Navbar />

      {/* Header / Hero Blog Section */}
      <section className="relative pt-32 pb-16 overflow-hidden border-b border-[rgba(0,212,255,0.1)]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00D4FF]/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[250px] bg-[#FF6B35]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Tag Badges */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] font-mono-tech text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Central de Insights & SEO</span>
            </div>

            <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-[#F0F4FF] tracking-tight leading-[1.1] mb-6">
              Estratégia, Branding & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#F0F4FF] to-[#FF6B35]">Inteligência Audiovisual</span>
            </h1>

            <p className="font-sans text-lg text-[#8892A4] leading-relaxed mb-8">
              Artigos, diagnósticos e visões de mercado para empresários e líderes que buscam comunicação com direção clara, autoridade de marca e impacto memorável.
            </p>

            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8892A4]" />
                <input
                  type="text"
                  placeholder="Buscar artigos por tema ou palavra-chave..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#0F1623] border border-[rgba(0,212,255,0.2)] rounded-lg text-sm text-[#F0F4FF] placeholder-[#8892A4] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-white/5">
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-mono-tech uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#00D4FF] text-[#080C14] font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]"
                    : "bg-[#0F1623] text-[#8892A4] hover:text-[#F0F4FF] hover:border-[rgba(0,212,255,0.3)] border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="py-16">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-[#0F1623] border border-white/5 rounded-2xl">
              <BookOpen className="w-12 h-12 text-[#8892A4] mx-auto mb-4" />
              <h3 className="text-xl font-display font-700 text-[#F0F4FF]">Nenhum artigo encontrado</h3>
              <p className="text-[#8892A4] mt-2 text-sm">Tente buscar por outros termos ou selecionar outra categoria.</p>
            </div>
          ) : (
            <>
              {/* Featured Post Card */}
              {featuredPost && (
                <div className="mb-12">
                  <div className="group relative rounded-2xl bg-[#0F1623] border border-[rgba(0,212,255,0.15)] hover:border-[#00D4FF] transition-all duration-500 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                      <img
                        src={featuredPost.featuredImage}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0F1623] via-[#0F1623]/40 to-transparent" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-[#00D4FF] text-[#080C14] text-xs font-mono-tech font-bold uppercase rounded">
                        Destaque
                      </div>
                    </div>

                    <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs font-mono-tech text-[#00D4FF] mb-4">
                          <span>{featuredPost.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-[#8892A4]">
                            <Clock className="w-3.5 h-3.5" />
                            {featuredPost.readTime}
                          </span>
                        </div>

                        <h2 className="font-display font-700 text-2xl lg:text-3xl text-[#F0F4FF] group-hover:text-[#00D4FF] transition-colors leading-snug mb-4">
                          <Link href={`/blog/${featuredPost.slug}`}>
                            {featuredPost.title}
                          </Link>
                        </h2>

                        <p className="text-[#8892A4] text-sm leading-relaxed mb-6">
                          {featuredPost.excerpt}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredPost.tags.map((t) => (
                            <span key={t} className="px-2.5 py-1 bg-white/5 text-[#8892A4] text-[11px] font-mono-tech rounded">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/blog/${featuredPost.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-bold text-[#00D4FF] hover:text-[#F0F4FF] transition-colors group/link"
                        >
                          <span>Ler artigo completo</span>
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of Other Articles */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post) => (
                    <article
                      key={post.id}
                      className="group flex flex-col bg-[#0F1623] border border-[rgba(0,212,255,0.1)] hover:border-[#00D4FF]/50 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1623] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#080C14]/80 backdrop-blur-md border border-[rgba(0,212,255,0.3)] text-[#00D4FF] text-[10px] font-mono-tech uppercase rounded">
                          {post.category}
                        </div>
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8892A4] mb-3">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readTime}</span>
                            <span>•</span>
                            <span>{post.publishedAt}</span>
                          </div>

                          <h3 className="font-display font-700 text-lg text-[#F0F4FF] group-hover:text-[#00D4FF] transition-colors line-clamp-2 mb-3">
                            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>

                          <p className="text-[#8892A4] text-xs leading-relaxed line-clamp-3 mb-4">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] font-mono-tech text-[#8892A4]">
                            <Tag className="w-3 h-3 text-[#00D4FF]" />
                            <span>{post.tags[0]}</span>
                          </div>

                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-xs font-bold text-[#00D4FF] hover:underline flex items-center gap-1"
                          >
                            <span>Ler</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 border-t border-[rgba(0,212,255,0.1)] bg-gradient-to-b from-[#080C14] via-[#0F1623] to-[#080C14]">
        <div className="container">
          <div className="relative p-10 lg:p-14 rounded-2xl bg-[#080C14] border border-[#00D4FF]/30 overflow-hidden text-center max-w-4xl mx-auto shadow-[0_0_50px_rgba(0,212,255,0.1)]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4FF]/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF6B35]/10 blur-[80px] rounded-full pointer-events-none" />

            <h3 className="font-display font-800 text-3xl sm:text-4xl text-[#F0F4FF] mb-4">
              Precisa de um diagnóstico estratégico para a sua marca?
            </h3>
            <p className="text-[#8892A4] text-base max-w-2xl mx-auto mb-8">
              Desenvolva o seu MASTER PLAN™ de Comunicação ou construa o seu ID CONCEPT™ com acompanhamento sênior e exclusivo.
            </p>

            <a
              href="https://wa.me/5511940684068"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 py-4 px-8 text-sm"
            >
              <span>Solicitar Consultoria no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
