import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, MapPin, AlertTriangle, CheckSquare, BarChart3, HelpCircle } from "lucide-react";

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState("operador@scan.com");
  const [password, setPassword] = useState("investigar2026");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    
    setIsLoading(true);
    setError("");

    // Simulate authenticating for 1.2s to make it look professional
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1200);
  };

  return (
    <div id="login-container" className="flex flex-col md:flex-row min-h-screen bg-[#0A0B0D] font-sans text-[#E0E0E0]">
      
      {/* LEFT SIDE: Operations & Brand Showcase */}
      <div 
        id="login-brand-pane" 
        className="relative flex-1 flex flex-col justify-between p-8 md:p-12 overflow-hidden bg-[#0F1115] border-r border-[#2D3139]"
      >
        {/* Glowing Orange Grids & Overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,99,33,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,99,33,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-[circle_at_25%_25%] from-[#FF6321]/5 via-transparent to-transparent pointer-events-none" />
        
        {/* Subtle decorative trace of a cyber-radar pattern */}
        <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none select-none max-w-[50%] max-h-[50%]">
          <svg viewBox="0 0 800 800" className="w-full h-full text-[#FF6321]/10 stroke-current fill-none">
            <circle cx="400" cy="400" r="350" strokeWidth="1" strokeDasharray="10 5" />
            <circle cx="400" cy="400" r="280" strokeWidth="2" />
            <circle cx="400" cy="400" r="210" strokeWidth="1" strokeDasharray="5 5" />
            <circle cx="400" cy="400" r="140" strokeWidth="1" />
            <circle cx="400" cy="400" r="70" strokeWidth="2" />
            <line x1="50" y1="400" x2="750" y2="400" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="400" y1="50" x2="400" y2="750" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* LOGO */}
        <div id="brand-logo" className="flex items-center gap-3 z-10">
          <div className="relative w-9 h-9 flex items-center justify-center rounded bg-[#FF6321] shadow-lg shadow-[#FF6321]/25">
            {/* Styled "S" as scan icon */}
            <span className="text-black font-black text-lg tracking-tight">S</span>
            <div className="absolute inset-0 border border-white/20 rounded" />
          </div>
          <div>
            <h1 className="text-md font-bold tracking-tight text-white flex flex-col leading-none">
              scan
              <span className="text-[9px] tracking-[0.2em] font-bold text-[#FF6321] uppercase leading-none mt-0.5">investigativo</span>
            </h1>
          </div>
        </div>

        {/* MIDDLE SECTION - Title and Features */}
        <div id="brand-pitch" className="my-auto py-8 md:py-16 z-10 max-w-xl">
          <span className="text-[#FF6321] font-semibold tracking-[0.2em] text-[10px] uppercase block mb-3">
            — INTELIGÊNCIA CADASTRAL —
          </span>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white uppercase leading-none mb-4">
            SISTEMA DE SCAN<br />
            INVESTIGATIVO E<br />
            CRUZAMENTO DE DADOS.
          </h2>
          <p className="text-[#8E9299] text-xs leading-relaxed mb-8 font-light">
            Validação reputacional em tempo real — dados cadastrais, consulta de CPFs, titularidade
            telefônica e score do número na web reunidos em uma única tela.
          </p>

          {/* Icon bullet points in two columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[#E0E0E0]">
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] text-[#FF6321] mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase text-[#E0E0E0] tracking-wide">Endereços Associados</h4>
              </div>
            </div>
            
            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] text-[#FF6321] mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase text-[#E0E0E0] tracking-wide">Alertas de Fraude</h4>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] text-[#FF6321] mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase text-[#E0E0E0] tracking-wide">Web Phone Reputation</h4>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] text-[#FF6321] mt-0.5">
                <HelpCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase text-[#E0E0E0] tracking-wide">Dados de Operadora</h4>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] text-[#FF6321] mt-0.5">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase text-[#E0E0E0] tracking-wide">Score de Confiança</h4>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] text-[#FF6321] mt-0.5">
                <CheckSquare className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-[11px] font-semibold uppercase text-[#E0E0E0] tracking-wide">Parentesco e Vínculos</h4>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div id="brand-footer" className="text-[9px] tracking-[0.3em] font-medium text-[#8E9299] z-10 uppercase mt-4">
          — SEGURANÇA E INTELIGÊNCIA DE DADOS
        </div>
      </div>

      {/* RIGHT SIDE: Immersive Login Portal */}
      <div 
        id="login-form-pane" 
        className="flex-1 flex flex-col justify-center items-center p-8 md:p-12 bg-[#0A0B0D] text-[#E0E0E0]"
      >
        <div className="w-full max-w-sm">
          {/* Section Indicator */}
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-[2px] bg-[#FF6321] block" />
            <span className="text-[9px] tracking-[0.2em] font-bold text-[#FF6321] uppercase block">
              ACESSO RESTRITO
            </span>
          </div>

          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-1 uppercase">
            Acesse sua conta
          </h3>
          <p className="text-[#8E9299] text-xs mb-4">
            Bem-vindo de volta! Faça login para continuar.
          </p>

  
          

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/40 border-l-2 border-red-500 text-red-400 text-xs rounded">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite seu e-mail"
                  className="w-full pl-9 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-sans"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider block">
                  Senha
                </label>
                <a href="#forgot" className="text-[10px] text-[#FF6321] hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full pl-9 pr-9 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-sans"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#8E9299] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 text-[#FF6321] bg-[#1A1D23] border-[#2D3139] rounded focus:ring-0"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-[#8E9299] select-none">
                Lembrar-me por 30 dias
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-[#FF6321] hover:bg-[#e5591e] text-black font-bold rounded text-xs transition-colors focus:outline-none disabled:opacity-75 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Autenticando...</span>
                </div>
              ) : (
                <span>Entrar</span>
              )}
            </button>
          </form>

          {/* Foot Note */}
          <div className="mt-16 text-center">
            <span className="text-[9px] text-[#8E9299] tracking-wider font-light uppercase">
              Acesso restrito a operadores autorizados.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
