/* ============================================================
   DESIGN: "Deep Space Broadcast" — ORÁCULO™ Chatbot
   Modo Triagem com Ficha de Diagnóstico + Estimativa de Investimento
   ============================================================ */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, Send, ExternalLink, Bot,
  ArrowRight, RefreshCw, ChevronRight, Zap,
} from "lucide-react";
import {
  ChatMessage,
  INITIAL_ORACULO_MESSAGE,
  processOraculoMessage,
  WHATSAPP_BASE_URL,
  resetTriagem,
} from "../data/oraculoEngine";

// ── Ficha de Diagnóstico (card visual embutido na mensagem) ──────────────────

function FichaDiagnostico({ triagem }: { triagem: NonNullable<ChatMessage["triagem"]> }) {
  const { produto, nivel, urgencia, valorMinimo, categoriaColor } = triagem;

  const nivelColors: Record<string, string> = {
    Essential: "#10b981",
    Advanced: "#f59e0b",
    Enterprise: "#a855f7",
  };
  const nivelColor = nivelColors[nivel || "Essential"] || "#10b981";
  const urgEmoji = urgencia === "Alta" ? "🔴" : urgencia === "Média" ? "🟡" : "🟢";

  return (
    <div
      className="mt-4 rounded-xl overflow-hidden border"
      style={{ borderColor: `${categoriaColor}30` }}
    >
      {/* Header da ficha */}
      <div
        className="px-4 py-2.5 flex items-center gap-2"
        style={{ background: `${categoriaColor}15` }}
      >
        <Zap size={13} style={{ color: categoriaColor }} />
        <span
          className="text-[0.65rem] font-mono-tech uppercase tracking-widest font-bold"
          style={{ color: categoriaColor }}
        >
          Diagnóstico Rápido — ORÁCULO™
        </span>
      </div>

      {/* Body da ficha */}
      <div className="bg-[#060A10] px-4 py-4 space-y-3">
        {/* Produto */}
        <div>
          <div className="text-[0.6rem] font-mono-tech text-[#8892A4] uppercase tracking-wider mb-0.5">
            Produto sugerido
          </div>
          <div
            className="font-display font-800 text-base text-[#F0F4FF]"
          >
            {produto}
          </div>
        </div>

        {/* Nível & Urgência */}
        <div className="grid grid-cols-2 gap-2">
          <div
            className="rounded-lg p-2.5 border"
            style={{ borderColor: `${nivelColor}30`, background: `${nivelColor}10` }}
          >
            <div className="text-[0.55rem] font-mono-tech uppercase tracking-wider mb-0.5" style={{ color: nivelColor }}>
              Nível
            </div>
            <div className="text-xs font-bold text-[#F0F4FF]">{nivel}</div>
          </div>
          <div className="rounded-lg p-2.5 border border-white/10 bg-white/5">
            <div className="text-[0.55rem] font-mono-tech uppercase tracking-wider text-[#8892A4] mb-0.5">
              Urgência
            </div>
            <div className="text-xs font-bold text-[#F0F4FF]">
              {urgEmoji} {urgencia}
            </div>
          </div>
        </div>

        {/* Estimativa */}
        <div
          className="rounded-xl p-3.5 border"
          style={{
            borderColor: `${categoriaColor}30`,
            background: `linear-gradient(135deg, ${categoriaColor}12, transparent)`,
          }}
        >
          <div className="text-[0.6rem] font-mono-tech text-[#8892A4] uppercase tracking-wider mb-1">
            💰 Estimativa de investimento
          </div>
          <div className="font-display font-800 text-xl" style={{ color: categoriaColor }}>
            A partir de R$ {valorMinimo?.toLocaleString("pt-BR")}
          </div>
          <div className="text-[0.6rem] text-[#8892A4] mt-1 leading-relaxed">
            Estimativa preliminar baseada no seu perfil. O valor real é definido após a conversa de diagnóstico com o Ícaro — pode ser menor ou maior conforme o escopo.
          </div>
        </div>

        {/* Modelo de pagamento */}
        <div className="flex items-center gap-2 text-[0.6rem] font-mono-tech text-[#8892A4]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8892A4]" />
          Pagamento: 60% entrada · 40% entrega
        </div>
      </div>
    </div>
  );
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function OraculoChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_ORACULO_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleReset = () => {
    resetTriagem();
    setMessages([INITIAL_ORACULO_MESSAGE]);
    setInputValue("");
  };

  const handleSend = (textOverride?: string) => {
    const textToProcess = textOverride || inputValue;
    if (!textToProcess.trim()) return;

    // Tokens internos não aparecem como mensagem do usuário
    const isInternalToken = textToProcess.startsWith("__");

    if (!isInternalToken) {
      const userMsg: ChatMessage = {
        id: "user-" + Date.now(),
        sender: "user",
        text: textToProcess.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, userMsg]);
    }

    if (!textOverride) setInputValue("");
    setIsTyping(true);

    // Tokens de WA abrem imediatamente, sem delay
    if (textToProcess.startsWith("__WA_OPEN__")) {
      const oraculoReply = processOraculoMessage(textToProcess);
      setMessages((prev) => [...prev, oraculoReply]);
      setIsTyping(false);
      return;
    }

    setTimeout(() => {
      const oraculoReply = processOraculoMessage(textToProcess);
      setMessages((prev) => [...prev, oraculoReply]);
      setIsTyping(false);
    }, 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 1. BOTÃO FLUTUANTE — ORÁCULO™ com texto arqueado e 1 única bolinha orbitando */}
      <div className="fixed bottom-6 right-6 z-50 select-none flex flex-col items-center">
        {/* Efeito Efeito Genie Burst Light Aura no click */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 1, scale: 0.4 }}
              animate={{ opacity: 0, scale: 3.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-[#00D4FF]/50 to-[#FF6B35]/30 blur-xl pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Container do Botão Completo */}
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          className="relative flex flex-col items-center cursor-pointer group"
        >
          {/* Texto ORÁCULO™ Arqueado no Topo (SVG amplo sem cortar nenhuma letra) */}
          <div className="w-[140px] h-[36px] mb-[-4px] pointer-events-none z-10">
            <svg
              viewBox="0 0 140 36"
              className="w-full h-full overflow-visible"
              aria-hidden="true"
            >
              <defs>
                {/* Arco amplo suave centralizado */}
                <path id="oraculoTopArcClean" d="M 10 32 A 60 60 0 0 1 130 32" />
              </defs>
              <text
                fill="#FFFFFF"
                fontSize="13"
                fontWeight="800"
                fontFamily="'Syne', 'Outfit', sans-serif"
                letterSpacing="2.5"
              >
                <textPath href="#oraculoTopArcClean" startOffset="50%" textAnchor="middle">
                  ORÁCULO™
                </textPath>
              </text>
            </svg>
          </div>

          {/* Círculo Principal com Anel Orbitante */}
          <div className="relative w-[64px] h-[64px] rounded-full bg-[#080C14] border border-[#00D4FF]/50 shadow-[0_0_24px_rgba(0,212,255,0.25)] backdrop-blur-xl flex items-center justify-center">
            {/* Anel Interno com Ícone Sparkles */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00D4FF]/20 to-[#FF6B35]/15 border border-[#00D4FF]/50 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#00D4FF]" />
            </div>

            {/* ÚNICA Bolinha Laranja Orbitando Continuamente no Anel Externo */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ animation: "spin 5s linear infinite" }}
            >
              <span
                className="absolute w-[10px] h-[10px] rounded-full bg-[#FF6B35] shadow-[0_0_10px_#FF6B35] border border-[#080C14]"
                style={{ top: "2px", right: "2px" }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 2. PAINEL DO CHAT — Efeito Genie de Abertura (macOS / Spatial Morphing) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.05,
              y: 120,
              x: 80,
              scaleY: 0.15,
              scaleX: 0.3,
              borderRadius: "500px",
              filter: "blur(12px) brightness(2)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
              scaleY: 1,
              scaleX: 1,
              borderRadius: "24px",
              filter: "blur(0px) brightness(1)",
            }}
            exit={{
              opacity: 0,
              scale: 0.05,
              y: 100,
              x: 60,
              scaleY: 0.15,
              scaleX: 0.3,
              borderRadius: "500px",
              filter: "blur(10px) brightness(1.5)",
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 24,
              mass: 0.7,
            }}
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 z-50 w-full sm:w-[420px] h-[85vh] sm:h-[600px] max-h-[90vh] bg-[#0F1623]/95 border-t sm:border border-[rgba(0,212,255,0.3)] rounded-t-3xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-[#080C14] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 to-[#FF6B35]/20 border border-[#00D4FF]/40 flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-[#00D4FF]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-800 text-sm text-[#F0F4FF] uppercase tracking-wider">
                      ORÁCULO™
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
                  </div>
                  <p className="font-mono-tech text-[0.65rem] text-[#8892A4]">
                    Diagnóstico Rápido · Ícaro Albuquerque
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  title="Reiniciar conversa"
                  className="p-2 text-[#8892A4] hover:text-[#00D4FF] transition-colors rounded-lg hover:bg-white/5"
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-[#8892A4] hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* WhatsApp direto */}
            <div className="px-4 py-2.5 bg-gradient-to-r from-[#00D4FF]/10 to-[#25D366]/10 border-b border-white/5 flex items-center justify-between shrink-0">
              <span className="text-[0.7rem] font-mono-tech text-[#8892A4]">
                Prefere atendimento direto?
              </span>
              <a
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono-tech font-bold text-[#25D366] hover:underline"
              >
                <span>Falar no WhatsApp</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-outfit text-sm">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl p-4 leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#080C14] font-medium rounded-tr-none shadow-md"
                          : "bg-[#080C14] text-[#F0F4FF] border border-white/10 rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>

                      {/* Ficha de diagnóstico */}
                      {msg.triagem && <FichaDiagnostico triagem={msg.triagem} />}

                      {/* Produto recomendado (modo keyword) */}
                      {msg.recommendedProduct && !msg.triagem && (
                        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                          <div className="flex items-center gap-1.5">
                            <ChevronRight size={12} style={{ color: msg.recommendedProduct.color }} />
                            <span
                              className="text-[0.65rem] font-mono-tech uppercase tracking-wider font-bold"
                              style={{ color: msg.recommendedProduct.color }}
                            >
                              {msg.recommendedProduct.title}
                            </span>
                          </div>
                          <a
                            href={msg.recommendedProduct.waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-[#0F1623] border text-xs font-mono-tech text-white hover:bg-white/10 transition-colors"
                            style={{ borderColor: `${msg.recommendedProduct.color}50` }}
                          >
                            <span>Falar sobre este produto no WhatsApp</span>
                            <ArrowRight size={14} style={{ color: msg.recommendedProduct.color }} />
                          </a>
                        </div>
                      )}
                    </div>

                    <span className="text-[0.6rem] font-mono-tech text-[#8892A4] mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick actions */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                        {msg.quickActions.map((action, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSend(action.textToSend)}
                            className="px-3 py-1.5 rounded-full bg-[#080C14] border border-[#00D4FF]/30 text-[0.7rem] font-mono-tech text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors text-left"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Typing */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-[#080C14] border border-white/10 rounded-2xl rounded-tl-none w-20 text-[#00D4FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 sm:p-4 bg-[#080C14] border-t border-white/10 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Digite ou use as opções acima..."
                className="flex-1 bg-[#0F1623] border border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#F0F4FF] placeholder-[#8892A4] focus:outline-none focus:border-[#00D4FF]/60 transition-colors font-outfit"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                className="p-2.5 rounded-xl bg-[#00D4FF] text-[#080C14] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#00D4FF]/80 transition-colors font-bold flex items-center justify-center"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
