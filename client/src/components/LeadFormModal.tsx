import { useState } from "react";
import { X, Send, CheckCircle } from "lucide-react";

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct: string;
}

export default function LeadFormModal({ isOpen, onClose, selectedProduct }: LeadFormModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    descricao: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // MÁSCARA DE TELEFONE (##) #####-####
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    if (value.length > 10) {
      value = `${value.slice(0, 10)}-${value.slice(10)}`;
    }
    
    setFormData({ ...formData, telefone: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSubmit = {
      ...formData,
      produto: selectedProduct,
      data_hora: new Date().toISOString(),
    };

    try {
      // ⚠️ IMPORTANTE: O usuário vai colar a URL do Google Apps Script aqui depois
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz3xD8vQwhhNA5aFSI0NAWhz2xAUIh4mR0DlVDHBEDrF0I6J0zRuYMdHCeoDGM29rcz/exec"; 
      
      if (GOOGLE_SCRIPT_URL === "SUA_URL_DO_APPS_SCRIPT_AQUI") {
        // Simulando sucesso se ainda não configurou a URL
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Simulação de Envio:", dataToSubmit);
      } else {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        });
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ nome: "", telefone: "", email: "", descricao: "" });
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar form:", error);
      alert("Houve um erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay com Blur */}
      <div 
        className="absolute inset-0 bg-[#080C14]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-[#0A101A] border border-[rgba(0,212,255,0.2)] rounded-xl p-8 shadow-[0_0_40px_rgba(0,212,255,0.1)] overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-50" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#FF6B35] to-transparent opacity-30" />

        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#00D4FF] transition-colors"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
            <CheckCircle size={64} className="text-[#00D4FF] mb-6" />
            <h3 className="font-display font-800 text-2xl text-[#F0F4FF] mb-2">Solicitação Enviada!</h3>
            <p className="text-gray-400">
              Recebemos seu interesse em <strong>{selectedProduct}</strong>.<br />
              Entraremos em contato em breve.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h3 className="font-display font-800 text-2xl text-[#F0F4FF] mb-2">
                Solicitar Orçamento
              </h3>
              <p className="text-gray-400 text-sm">
                Produto selecionado: <span className="text-[#00D4FF] font-semibold">{selectedProduct}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono-tech text-[#00D4FF] uppercase tracking-wider mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full bg-[#080C14] border border-gray-800 rounded-lg px-4 py-3 text-[#F0F4FF] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-mono-tech text-[#00D4FF] uppercase tracking-wider mb-2">
                    Telefone (DDD)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    className="w-full bg-[#080C14] border border-gray-800 rounded-lg px-4 py-3 text-[#F0F4FF] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-tech text-[#00D4FF] uppercase tracking-wider mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#080C14] border border-gray-800 rounded-lg px-4 py-3 text-[#F0F4FF] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono-tech text-[#00D4FF] uppercase tracking-wider mb-2">
                  Breve Descrição do Projeto
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  className="w-full bg-[#080C14] border border-gray-800 rounded-lg px-4 py-3 text-[#F0F4FF] focus:outline-none focus:border-[#00D4FF] focus:ring-1 focus:ring-[#00D4FF] transition-all resize-none"
                  placeholder="Conte-nos um pouco sobre a sua necessidade..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enviar Solicitação</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-[10px] text-gray-500 leading-tight">
                🔒 Seus dados estão seguros. Nós armazenamos suas informações com privacidade 
                e nunca as compartilhamos com terceiros.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
