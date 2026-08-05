/* ============================================================
   DESIGN: "Deep Space Broadcast" — ORÁCULO™ Chatbot
   Assistente de Inteligência Conversacional Contextual (Zero Cost)
   ============================================================ */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, X, Send, ExternalLink, Bot, ArrowRight, CornerDownLeft, RefreshCw } from "lucide-react";
import { ChatMessage, INITIAL_ORACULO_MESSAGE, processOraculoMessage, WHATSAPP_BASE_URL } from "../data/oraculoEngine";

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

  const handleSend = (textOverride?: string) => {
    const textToProcess = textOverride || inputValue;
    if (!textToProcess.trim()) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToProcess.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textOverride) setInputValue("");
    setIsTyping(true);

    // Simulate natural AI thinking & typing effect
    setTimeout(() => {
      const oraculoReply = processOraculoMessage(textToProcess);
      setMessages((prev) => [...prev, oraculoReply]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 1. FLOATING MAGICAL TRIGGER BUTTON (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 select-none">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative group flex items-center gap-3 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-[#0F1623] border border-[#00D4FF]/40 text-[#F0F4FF] shadow-[0_0_30px_rgba(0,212,255,0.3)] backdrop-blur-xl"
        >
          {/* Outer Pulsing Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-[#00D4FF]/20 animate-ping opacity-75 blur-md pointer-events-none" />

          {/* Icon Badge */}
          <div className="relative z-10 w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#FF6B35] p-[1px] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#080C14] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#00D4FF] animate-pulse" />
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-start text-left z-10">
            <span className="font-display font-800 text-xs text-[#F0F4FF] tracking-wider uppercase">
              ORÁCULO™
            </span>
            <span className="font-mono-tech text-[0.6rem] text-[#00D4FF]">
              IA Conversacional
            </span>
          </div>

          {/* Unread indicator dot */}
          {hasUnread && !isOpen && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#FF6B35] rounded-full border-2 border-[#080C14] animate-bounce" />
          )}
        </motion.button>
      </div>

      {/* 2. CHATBOT MODAL / BOTTOM SHEET */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-0 right-0 sm:bottom-24 sm:right-6 z-50 w-full sm:w-[420px] h-[85vh] sm:h-[580px] max-h-[90vh] bg-[#0F1623]/95 border-t sm:border border-[rgba(0,212,255,0.25)] rounded-t-3xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col overflow-hidden"
          >
            {/* Header Bar */}
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
                    Inteligência Estratégica · Ícaro Albuquerque
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMessages([INITIAL_ORACULO_MESSAGE])}
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

            {/* Direct Instant WhatsApp Banner */}
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

            {/* Chat Body (Scrollable) */}
            <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-outfit text-sm">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                        isUser
                          ? "bg-gradient-to-r from-[#00D4FF] to-[#0099FF] text-[#080C14] font-medium rounded-tr-none shadow-md"
                          : "bg-[#080C14] text-[#F0F4FF] border border-white/10 rounded-tl-none"
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>

                      {/* Recommended Product Box inside AI message */}
                      {msg.recommendedProduct && (
                        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-[0.65rem] font-mono-tech uppercase tracking-wider font-bold"
                              style={{ color: msg.recommendedProduct.color }}
                            >
                              Solução Recomenda: {msg.recommendedProduct.title}
                            </span>
                          </div>
                          <a
                            href={msg.recommendedProduct.waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-between w-full py-2.5 px-3 rounded-lg bg-[#0F1623] border text-xs font-mono-tech text-white hover:bg-white/10 transition-colors"
                            style={{ borderColor: `${msg.recommendedProduct.color}50` }}
                          >
                            <span>Ir direto para o WhatsApp</span>
                            <ArrowRight size={14} style={{ color: msg.recommendedProduct.color }} />
                          </a>
                        </div>
                      )}
                    </div>

                    <span className="text-[0.6rem] font-mono-tech text-[#8892A4] mt-1 px-1">
                      {msg.timestamp}
                    </span>

                    {/* Quick Action Chips */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3 max-w-[90%]">
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

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 p-3 bg-[#080C14] border border-white/10 rounded-2xl rounded-tl-none w-20 text-[#00D4FF]">
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-bounce [animation-delay:0.4s]" />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-[#080C14] border-t border-white/10 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pergunte sobre serviços, palestras, IA..."
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
