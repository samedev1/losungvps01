import React, { useState } from "react";
import { Search, ShieldAlert, Phone, FileText, MapPin, Mail, Sparkles } from "lucide-react";
import { ScanInput } from "../types.js";

interface ScannerFormProps {
  onScan: (input: ScanInput) => void;
  isScanning: boolean;
}

export default function ScannerForm({ onScan, isScanning }: ScannerFormProps) {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan({
      name,
      cpf,
      phone,
      street,
      email
    });
  };

  const loadSample = (sampleType: "approved" | "warning" | "risk") => {
    if (sampleType === "approved") {
      setName("Julio Cesar Ramos");
      setCpf("32219143890");
      setPhone("11982345511");
      setStreet("Rua Bela Cintra, 450 - Consolação, São Paulo SP");
      setEmail("julio.ramos82@gmail.com");
    } else if (sampleType === "warning") {
      setName("Alexandre de Souza");
      setCpf("10244198205");
      setPhone("21971213455");
      setStreet("Rua Dias da Cruz, 204 - Meier, Rio de Janeiro RJ");
      setEmail("alexandre.souza@yahoo.com.br");
    } else {
      setName("Carlos Teste Fraude");
      setCpf("00000000000");
      setPhone("112345678");
      setStreet("Avenida Principal, 9999");
      setEmail("golpe_urgente@tempmail.com");
    }
  };

  return (
    <div className="bg-[#0F1115] border border-[#2D3139] rounded p-5 shadow-xl relative overflow-hidden">
      {/* Subtle top brand orange glow */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF6321] to-transparent" />
      
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide">
          <ShieldAlert className="w-4 h-4 text-[#FF6321]" />
          <span>Painel de Investigação e Cruzamento</span>
        </h3>
        <div className="text-[9px] bg-[#1A1D23] text-[#8E9299] border border-[#2D3139] px-2 py-0.5 rounded font-mono uppercase tracking-tight">
          SISTEMA: Varredura Web & OSINT Reputacional
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
            Nome Completo do Investigado
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
              <FileText className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Roberto Silva Santos"
              className="w-full pl-9 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-sans"
            />
          </div>
        </div>

        {/* CPF & Phone in two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
              CPF (Apenas números)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none font-mono text-xs font-bold">
                CPF
              </span>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="Ex: 24891043288"
                className="w-full pl-11 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
              Telefone Celular (DDD + Número)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
                <Phone className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex: 11981224432"
                className="w-full pl-9 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-mono"
                required
              />
            </div>
          </div>
        </div>

        {/* Address Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
            Endereço Residencial (Rua, Número, Cidade/Estado)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Ex: Av Paulista, 1200 - São Paulo, SP"
              className="w-full pl-9 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-sans"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
            E-mail
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
              <Mail className="w-4 h-4" />
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: contato@provedor.com"
              className="w-full pl-9 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-sans"
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FF6321] hover:bg-[#e5591e] text-black font-bold rounded text-xs transition-colors focus:outline-none disabled:opacity-50 cursor-pointer text-center"
        >
          {isScanning ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="font-mono tracking-wide text-black font-bold">BUSCANDO REGISTROS NA WEB...</span>
            </div>
          ) : (
            <>
              <Search className="w-4 h-4 text-black font-bold" />
              <span className="uppercase tracking-wide">RODAR SCAN INVESTIGATIVO</span>
            </>
          )}
        </button>
      </form>

      {/* Quick Load Samples */}
      <div className="mt-4 pt-3.5 border-t border-[#2D3139]">
        <span className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6321]" />
          <span>Simulação de Casos de Investigação (Dados de Teste)</span>
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadSample("approved")}
            className="text-[10px] px-2 py-1 bg-emerald-950/30 hover:bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 rounded transition-all cursor-pointer font-medium uppercase tracking-wider"
          >
            Aprovado
          </button>
          <button
            type="button"
            onClick={() => loadSample("warning")}
            className="text-[10px] px-2 py-1 bg-amber-950/30 hover:bg-amber-950/60 text-amber-400 border border-amber-900/40 rounded transition-all cursor-pointer font-medium uppercase tracking-wider"
          >
            Divergente
          </button>
          <button
            type="button"
            onClick={() => loadSample("risk")}
            className="text-[10px] px-2 py-1 bg-red-950/30 hover:bg-red-950/60 text-red-400 border border-red-900/40 rounded transition-all cursor-pointer font-medium uppercase tracking-wider"
          >
            Alto Risco
          </button>
        </div>
      </div>
    </div>
  );
}
