/* ============================================================
   DESIGN: "Deep Space Broadcast" — Blog Article Page (/blog/:slug)
   Leitura imersiva, SEO Schema.org & Conversão Contextual
   ============================================================ */

import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Share2,
  Check,
  Sparkles,
  ChevronRight,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "@/pages/NotFound";
import { INITIAL_POSTS, BlogPost as BlogPostType } from "@/data/posts";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug;

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const post: BlogPostType | undefined = INITIAL_POSTS.find((p) => p.slug === slug);

  // Scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return <NotFound />;
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Structured Data (JSON-LD) for Google SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [post.featuredImage],
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      url: "https://icaroalbuquerque.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Ícaro Albuquerque",
      logo: {
        "@type": "ImageObject",
        url: "https://icaroalbuquerque.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://icaroalbuquerque.com/blog/${post.slug}`,
    },
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-[#F0F4FF] selection:bg-[#00D4FF] selection:text-[#080C14]">
      {/* JSON-LD Schema.org script for Google SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Reading Progress Indicator */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00D4FF] via-[#FF6B35] to-[#C9A84C] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navbar />

      {/* Article Header & Hero */}
      <header className="relative pt-32 pb-16 border-b border-[rgba(0,212,255,0.1)]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00D4FF]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="container relative z-10 max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono-tech text-[#8892A4] mb-8">
            <Link href="/" className="hover:text-[#00D4FF] transition-colors">
              Início
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <Link href="/blog" className="hover:text-[#00D4FF] transition-colors">
              Blog & Insights
            </Link>
            <ChevronRight className="w-3 h-3 text-white/20" />
            <span className="text-[#00D4FF] truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] font-mono-tech text-xs tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{post.category}</span>
          </div>

          <h1 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-[#F0F4FF] tracking-tight leading-[1.15] mb-6">
            {post.title}
          </h1>

          <p className="font-sans text-lg text-[#8892A4] leading-relaxed mb-8">
            {post.excerpt}
          </p>

          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-6 py-6 border-y border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#00D4FF]/40 bg-[#0F1623] flex items-center justify-center font-display font-bold text-lg text-[#00D4FF]">
                ÍA
              </div>
              <div>
                <div className="font-display font-700 text-sm text-[#F0F4FF]">
                  {post.author.name}
                </div>
                <div className="text-xs text-[#8892A4]">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono-tech text-[#8892A4]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#00D4FF]" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FF6B35]" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="container max-w-4xl py-10">
        <div className="relative rounded-2xl overflow-hidden border border-[rgba(0,212,255,0.2)] shadow-[0_0_30px_rgba(0,212,255,0.05)]">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-[380px] sm:h-[480px] object-cover"
          />
        </div>
      </div>

      {/* Main Article Body */}
      <article className="py-8">
        <div className="container max-w-3xl">
          {/* Formatted Content */}
          <div className="prose prose-invert prose-cyan max-w-none font-sans text-base leading-relaxed text-[#D0D7E5] space-y-6">
            {post.content.split("\n\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();

              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    className="font-display font-800 text-2xl sm:text-3xl text-[#F0F4FF] pt-6 pb-2 border-b border-white/5"
                  >
                    {trimmed.replace("## ", "")}
                  </h2>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="font-display font-700 text-xl text-[#00D4FF] pt-4"
                  >
                    {trimmed.replace("### ", "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("> ")) {
                return (
                  <blockquote
                    key={index}
                    className="my-6 p-6 rounded-xl bg-[#0F1623] border-l-4 border-[#00D4FF] italic text-lg text-[#F0F4FF]"
                  >
                    {trimmed.replace("> ", "")}
                  </blockquote>
                );
              }

              if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
                const items = trimmed.split("\n");
                return (
                  <ul key={index} className="space-y-2 my-4 pl-4 border-l border-[#00D4FF]/20">
                    {items.map((item, i) => (
                      <li key={i} className="text-[#D0D7E5] text-sm sm:text-base">
                        {item.replace(/^[-1-9.]+\s*/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="text-[#D0D7E5] text-base leading-relaxed">
                  {trimmed}
                </p>
              );
            })}
          </div>

          {/* Social Share & Copy Link */}
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8892A4]">
              <Share2 className="w-4 h-4 text-[#00D4FF]" />
              <span>Compartilhe este artigo:</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${post.title} - https://icaroalbuquerque.com/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0F1623] border border-white/10 hover:border-[#00D4FF] rounded-lg text-xs font-mono-tech text-[#F0F4FF] transition-all"
              >
                WhatsApp
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  `https://icaroalbuquerque.com/blog/${post.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#0F1623] border border-white/10 hover:border-[#00D4FF] rounded-lg text-xs font-mono-tech text-[#F0F4FF] transition-all"
              >
                LinkedIn
              </a>
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-[#00D4FF]/10 border border-[#00D4FF]/30 text-[#00D4FF] rounded-lg text-xs font-mono-tech flex items-center gap-1.5 hover:bg-[#00D4FF] hover:text-[#080C14] transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <span>Copiar Link</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Contextual Service Lead Magnet */}
      <section className="py-16 bg-[#0F1623]/80 border-t border-b border-[rgba(0,212,255,0.15)] my-12">
        <div className="container max-w-4xl">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#080C14] border border-[#00D4FF]/30 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#00D4FF] uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Solução Relacionada</span>
              </div>
              <h3 className="font-display font-800 text-2xl text-[#F0F4FF]">
                {post.relatedProductId === "plano-diretor"
                  ? "MASTER PLAN™ (Método UTIO)"
                  : post.relatedProductId === "marca-viva"
                  ? "ID CONCEPT™: Branding & Presença Premium"
                  : "Absolute Cinema™: Storytelling Corporativo"}
              </h3>
              <p className="text-[#8892A4] text-sm max-w-xl">
                Quer aplicar este nível de clareza e autoridade na comunicação do seu negócio? Agende um diagnóstico exclusivo diretamente com Ícaro Albuquerque.
              </p>
            </div>

            <a
              href="https://wa.me/5511940684068"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary whitespace-nowrap py-3.5 px-6 text-xs flex items-center gap-2"
            >
              <span>Falar no WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Navigation back to Blog */}
      <div className="container max-w-4xl pb-20 flex justify-between items-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#00D4FF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Blog</span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
