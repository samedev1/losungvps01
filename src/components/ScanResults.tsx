import React from "react";
import { motion } from "motion/react";
import { DriverProfile } from "../types.js";
import { 
  ShieldCheck, ShieldAlert, AlertTriangle, Phone, 
  MapPin, Users, Brain, Calendar, Hash, Globe, CheckCircle2, XCircle
} from "lucide-react";

interface ScanResultsProps {
  profile: DriverProfile | null;
  isScanning: boolean;
  scanProgress: string[];
}

export default function ScanResults({ profile, isScanning, scanProgress }: ScanResultsProps) {
  if (isScanning) {
    return (
      <div className="bg-[#0F1115] border border-[#2D3139] rounded p-5 shadow-xl h-full flex flex-col justify-between min-h-[450px]">
        <div>
          <h3 className="text-xs font-bold text-[#8E9299] uppercase tracking-widest mb-4 font-mono flex items-center justify-between">
            <span>[CONSOLE INVESTIGATIVO ATIVO]</span>
            <span className="flex items-center gap-1.5 text-[#FF6321]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6321] animate-pulse"></span>
              LIVE FEED
            </span>
          </h3>
          <div className="space-y-2 font-mono text-[10px] text-[#A0A0A0]">
            {scanProgress.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2 animate-fade-in">
                <span className="text-[#FF6321] font-bold select-none">&gt;</span>
                <span className="leading-relaxed">{step}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center py-6 text-center">
          <div className="relative w-12 h-12 mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-[#FF6321]/15 border-t-[#FF6321] animate-spin" />
            <div className="absolute inset-2 rounded-full border border-[#FF6321]/10 border-b-[#FF6321]/80 animate-spin animate-duration-1000" />
          </div>
          <span className="text-[10px] text-[#8E9299] font-mono animate-pulse">
            Efetuando varredura reputacional e rastreamento de índices públicos na web...
          </span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-[#0F1115] border border-[#2D3139] rounded p-8 shadow-xl h-full min-h-[450px] flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded bg-[#1A1D23] flex items-center justify-center text-[#8E9299] border border-[#2D3139] mb-4">
          <Globe className="w-7 h-7 text-[#FF6321]" />
        </div>
        <h4 className="text-white font-bold text-xs uppercase tracking-wide mb-1">
          Nenhum Dossiê Carregado
        </h4>
        <p className="text-[#8E9299] text-[11px] max-w-xs leading-relaxed">
          Preencha o formulário e inicie uma varredura para cruzar dados reputacionais e score telefônico na web.
        </p>
      </div>
    );
  }

  const getStatusStyle = (status: DriverProfile["status"]) => {
    switch (status) {
      case "APROVADO":
        return {
          bg: "bg-green-950/20 text-green-400 border-green-500/25",
          badge: "bg-green-500/20 text-green-400 border-green-500/30",
          icon: <ShieldCheck className="w-4 h-4 text-green-400" />,
          label: "Aprovado / Baixo Risco"
        };
      case "ANALISE":
        return {
          bg: "bg-yellow-950/20 text-yellow-500 border-yellow-500/25",
          badge: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
          icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />,
          label: "Em Análise / Alerta"
        };
      case "SUSPEITO":
        return {
          bg: "bg-red-950/20 text-red-400 border-red-500/25",
          badge: "bg-red-500/20 text-red-400 border-red-500/30",
          icon: <ShieldAlert className="w-4 h-4 text-red-400" />,
          label: "Bloqueado / Alto Risco"
        };
    }
  };

  const statusStyle = getStatusStyle(profile.status);

  return (
    <div className="bg-[#0F1115] border border-[#2D3139] rounded p-5 shadow-xl h-full flex flex-col justify-between">
      
      {/* DOSSIER HEADER */}
      <div className="border-b border-[#2D3139] pb-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <span className="text-[9px] font-mono text-[#8E9299] uppercase tracking-widest block mb-0.5">
              Dossiê Investigativo • ID: {profile.id.replace("drv_", "")}
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight uppercase">{profile.name}</h3>
          </div>
          
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[11px] font-medium uppercase tracking-wide ${statusStyle.bg}`}>
            {statusStyle.icon}
            <span>{statusStyle.label}</span>
          </div>
        </div>

        {/* TOP LEVEL METRICS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          {/* CPF */}
          <div className="bg-[#1A1D23] border border-[#2D3139] p-2.5 rounded flex items-center gap-2.5">
            <Hash className="w-4 h-4 text-[#FF6321] shrink-0" />
            <div>
              <span className="text-[9px] text-[#8E9299] uppercase block font-semibold">CPF</span>
              <span className="text-xs text-[#E0E0E0] font-mono font-medium">{profile.cpf}</span>
            </div>
          </div>

          {/* PHONE */}
          <div className="bg-[#1A1D23] border border-[#2D3139] p-2.5 rounded flex items-center gap-2.5">
            <Phone className="w-4 h-4 text-[#FF6321] shrink-0" />
            <div>
              <span className="text-[9px] text-[#8E9299] uppercase block font-semibold">Celular</span>
              <span className="text-xs text-[#E0E0E0] font-mono font-medium">{profile.phone}</span>
            </div>
          </div>

          {/* TELEPHONE WEB REPUTATION SCORE */}
          <div className="bg-[#1A1D23] border border-[#2D3139] p-2.5 rounded flex items-center gap-2.5">
            <Globe className="w-4 h-4 text-[#FF6321] shrink-0" />
            <div>
              <span className="text-[9px] text-[#8E9299] uppercase block font-semibold">Reputação Web</span>
              <span className="text-xs text-[#E0E0E0] font-mono font-medium">
                <span className={`font-bold ${profile.webScoreValue && profile.webScoreValue >= 80 ? 'text-green-500' : profile.webScoreValue && profile.webScoreValue >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {profile.webScoreValue}/100
                </span>
              </span>
            </div>
          </div>

          {/* TRUST SCORE OVERALL */}
          <div className="bg-[#1A1D23] border border-[#2D3139] p-2.5 rounded flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#FF6321] shrink-0" />
            <div>
              <span className="text-[9px] text-[#8E9299] uppercase block font-semibold">Score Confiança</span>
              <span className="text-xs text-[#E0E0E0] font-mono font-medium">
                <span className={`font-extrabold ${profile.trustScore >= 80 ? 'text-green-500' : profile.trustScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                  {profile.trustScore}%
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SCORE MANAGEMENT & SECURITY MARGINS PANEL */}
      <div className="mb-4 bg-[#14171D] border border-[#2D3139] rounded p-4 shadow-inner">
        <h4 className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-full animate-pulse" />
            <span>Painel Gerenciador de Score & Margens de Segurança</span>
          </div>
          <span className="text-[9px] font-mono text-[#FF6321] uppercase">OSINT Ativo</span>
        </h4>

        {/* Interactive animated gauge / bar */}
        <div className="relative pt-3 pb-5 px-1">
          {/* The multi-colored bracket bar */}
          <div className="h-3 w-full rounded-full bg-[#1A1D23] border border-[#2D3139]/80 flex overflow-hidden relative">
            {/* Range 1: 0 - 49% */}
            <div className="h-full w-[49%] bg-gradient-to-r from-red-600/60 to-red-500/70 border-r border-black/30" title="0% - 49%: Atenção Crítica para Pagamentos" />
            {/* Range 2: 50 - 60% */}
            <div className="h-full w-[11%] bg-gradient-to-r from-amber-500/60 to-amber-400/70 border-r border-black/30" title="50% - 60%: Atenção Intermediária" />
            {/* Range 3: 61 - 79% */}
            <div className="h-full w-[19%] bg-gradient-to-r from-yellow-400/60 to-yellow-300/70 border-r border-black/30" title="61% - 79%: Atenção / Possível Confiável" />
            {/* Range 4: 80 - 100% */}
            <div className="h-full w-[21%] bg-gradient-to-r from-emerald-500/60 to-emerald-400/70" title="80% - 100%: Altamente Confiável" />
          </div>

          {/* Animated marker/pointer */}
          <motion.div 
            className="absolute top-1"
            initial={{ left: "0%" }}
            animate={{ left: `${profile.trustScore}%` }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
            style={{ transform: "translateX(-50%)" }}
          >
            {/* The pointer pin */}
            <div className="flex flex-col items-center">
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[7px] border-t-white shadow-md animate-bounce" />
              <div className="mt-1.5 bg-white text-black font-mono font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-lg border border-[#2D3139] whitespace-nowrap">
                {profile.trustScore}%
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bracket Information / Guidelines GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mt-2">
          {/* Category 1: <50% */}
          <motion.div 
            className={`p-2 rounded border text-left transition-all ${
              profile.trustScore < 50 
                ? 'bg-red-950/20 border-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                : 'bg-[#1A1D23]/40 border-[#2D3139]/60 opacity-40'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold text-red-400 font-mono">0% - 49%</span>
              {profile.trustScore < 50 && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
            </div>
            <span className="text-[9px] font-extrabold text-[#E0E0E0] block uppercase leading-tight">ATENÇÃO PARA PAGAMENTOS</span>
            <span className="text-[8px] text-[#8E9299] block mt-1 leading-normal">
              Alerta crítico de segurança. Alto índice de risco cadastral. Pare ou confirme os dados.
            </span>
          </motion.div>

          {/* Category 2: 50% - 60% */}
          <motion.div 
            className={`p-2 rounded border text-left transition-all ${
              profile.trustScore >= 50 && profile.trustScore <= 60 
                ? 'bg-amber-950/20 border-amber-500/60 shadow-[0_0_10px_rgba(245,158,11,0.15)]' 
                : 'bg-[#1A1D23]/40 border-[#2D3139]/60 opacity-40'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold text-amber-400 font-mono">50% - 60%</span>
              {profile.trustScore >= 50 && profile.trustScore <= 60 && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />}
            </div>
            <span className="text-[9px] font-extrabold text-[#E0E0E0] block uppercase leading-tight">ATENÇÃO INTERMEDIÁRIA</span>
            <span className="text-[8px] text-[#8E9299] block mt-1 leading-normal">
              Faixa de alerta moderado. Recomendada cautela e validação manual de dados.
            </span>
          </motion.div>

          {/* Category 3: 61% - 79% */}
          <motion.div 
            className={`p-2 rounded border text-left transition-all ${
              profile.trustScore > 60 && profile.trustScore < 80 
                ? 'bg-yellow-950/20 border-yellow-500/60 shadow-[0_0_10px_rgba(234,179,8,0.15)]' 
                : 'bg-[#1A1D23]/40 border-[#2D3139]/60 opacity-40'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold text-yellow-400 font-mono">61% - 79%</span>
              {profile.trustScore > 60 && profile.trustScore < 80 && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />}
            </div>
            <span className="text-[9px] font-extrabold text-[#E0E0E0] block uppercase leading-tight">MERECE ATENÇÃO / POSSÍVEL CONFIÁVEL</span>
            <span className="text-[8px] text-[#8E9299] block mt-1 leading-normal">
              Acompanhe a transação por rotina. Apresenta boa chance de legitimidade.
            </span>
          </motion.div>

          {/* Category 4: 80% - 100% */}
          <motion.div 
            className={`p-2 rounded border text-left transition-all ${
              profile.trustScore >= 80 
                ? 'bg-emerald-950/20 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.15)]' 
                : 'bg-[#1A1D23]/40 border-[#2D3139]/60 opacity-40'
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold text-emerald-400 font-mono">80% - 100%</span>
              {profile.trustScore >= 80 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />}
            </div>
            <span className="text-[9px] font-extrabold text-[#E0E0E0] block uppercase leading-tight">CONFIÁVEL / ALTA SEGURANÇA</span>
            <span className="text-[8px] text-[#8E9299] block mt-1 leading-normal">
              Excelente histórico verificado na web regional. Baixo risco operacional.
            </span>
          </motion.div>
        </div>
      </div>

      {/* CORE TRACE INFORMATION */}
      <div className="space-y-4 flex-1">
        
        {/* PHONE CARRIER INVESTIGATION */}
        <div>
          <h4 className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-full" />
            <span>Varredura de Linha Telefônica</span>
          </h4>
          <div className="bg-[#1A1D23] border border-[#2D3139] rounded p-3 grid grid-cols-2 gap-3 text-xs font-sans">
            <div>
              <span className="text-[#8E9299] block text-[10px] uppercase mb-0.5">Operadora:</span>
              <span className="text-[#E0E0E0] font-medium">{profile.carrier}</span>
            </div>
            <div>
              <span className="text-[#8E9299] block text-[10px] uppercase mb-0.5">Tipo de Linha:</span>
              <span className="text-[#E0E0E0] font-medium">{profile.lineType}</span>
            </div>
            <div>
              <span className="text-[#8E9299] block text-[10px] uppercase mb-0.5">Status de Atividade:</span>
              <span className={`font-medium ${profile.phoneActiveStatus === 'Ativo' ? 'text-green-500' : 'text-red-500'}`}>
                {profile.phoneActiveStatus}
              </span>
            </div>
            <div>
              <span className="text-[#8E9299] block text-[10px] uppercase mb-0.5">WhatsApp Validado:</span>
              <span className={`font-semibold ${profile.whatsappActive ? 'text-green-500' : 'text-red-500'}`}>
                {profile.whatsappActive ? "SIM" : "NÃO / SUSPEITO"}
              </span>
            </div>
          </div>
        </div>

        {/* PIX RELIABILITY & WEB SCRAPING REPUTATION */}
        <div>
          <h4 className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#FF6321] rounded-full" />
            <span>Raspagem Web & Confiabilidade de Pagamento PIX</span>
          </h4>
          <div className="bg-[#1A1D23] border border-[#2D3139] rounded p-3.5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#2D3139]/80 text-xs">
              <div>
                <span className="text-[#8E9299] block text-[10px] uppercase mb-0.5">Rastros na Web (Scraping):</span>
                <span className="font-semibold flex items-center gap-1.5">
                  {(profile.webReputation === 'CONHECIDO' || !profile.webReputation) && (
                    <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20 uppercase tracking-wide text-[10px]">
                      CONHECIDO NA WEB
                    </span>
                  )}
                  {profile.webReputation === 'DESCONHECIDO' && (
                    <span className="text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded border border-yellow-500/20 uppercase tracking-wide text-[10px]">
                      DESCONHECIDO / SEM HISTÓRICO
                    </span>
                  )}
                  {profile.webReputation === 'SPAM' && (
                    <span className="text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20 uppercase tracking-wide text-[10px]">
                      SPAM RECORRENTE
                    </span>
                  )}
                  {profile.webReputation === 'FRAUDE' && (
                    <span className="text-red-500 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/25 uppercase tracking-wide text-[10px]">
                      FRAUDE / DENÚNCIAS ATIVAS
                    </span>
                  )}
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-[#8E9299] block text-[10px] uppercase mb-0.5">Reclamações Encontradas:</span>
                <span className={`font-mono font-bold text-[11px] ${profile.spamReportsCount && profile.spamReportsCount > 0 ? 'text-red-500 animate-pulse' : 'text-green-500'}`}>
                  {profile.spamReportsCount || 0} denúncias
                </span>
              </div>
            </div>

            {/* PIX Reliability banner */}
            <div className={`p-3 rounded border text-xs flex items-start gap-2.5 ${
              (profile.pixReliability === 'CONFIÁVEL' || !profile.pixReliability)
                ? 'bg-green-950/20 text-green-400 border-green-500/20' 
                : profile.pixReliability === 'ATENÇÃO'
                  ? 'bg-yellow-950/20 text-yellow-500 border-yellow-500/20'
                  : 'bg-red-950/20 text-red-500 border-red-500/25'
            }`}>
              <div className="mt-0.5 shrink-0">
                {(profile.pixReliability === 'CONFIÁVEL' || !profile.pixReliability) ? (
                  <ShieldCheck className="w-5 h-5 text-green-400" />
                ) : profile.pixReliability === 'ATENÇÃO' ? (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-red-500" />
                )}
              </div>
              <div className="space-y-1">
                <span className="font-bold uppercase tracking-wider block text-[11px]">
                  AVALIAÇÃO DE PIX: {profile.pixReliability || 'CONFIÁVEL'}
                </span>
                <p className="text-[#E0E0E0] text-[11px] leading-relaxed">
                  {profile.pixRecommendation || 'Varredura de segurança concluiu que a linha possui alta confiabilidade reputacional digital na web. Transação via PIX recomendada e segura.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESSES LOGS (SKIP TRACE) */}
        <div>
          <h4 className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Histórico de Endereços Localizados</span>
          </h4>
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {profile.addresses.map((addr, idx) => (
              <div key={idx} className="bg-[#1A1D23] border border-[#2D3139] p-2.5 rounded flex justify-between items-start text-xs">
                <div className="space-y-0.5">
                  <span className="text-[#E0E0E0] font-medium block leading-snug">{addr.street}</span>
                  <span className="text-[#8E9299] text-[10px] block">
                    {addr.city}, {addr.state} {addr.zip ? `| CEP ${addr.zip}` : ""}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] bg-[#0A0B0D] border border-[#2D3139] text-[#8E9299] px-1.5 py-0.5 rounded block font-mono mb-1">
                    {addr.period || "N/A"}
                  </span>
                  {addr.isVerified ? (
                    <span className="text-[9px] text-green-500 font-bold uppercase tracking-wide block">● Validado</span>
                  ) : (
                    <span className="text-[9px] text-yellow-500 font-bold uppercase tracking-wide block">● Pendente</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ASSOCIATED PERSONS / RELATIVES LINK */}
        <div>
          <h4 className="text-[10px] font-bold text-[#8E9299] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Vínculos de Parentesco Identificados</span>
          </h4>
          <div className="space-y-1.5">
            {profile.relatives.map((rel, idx) => (
              <div key={idx} className="bg-[#1A1D23] border border-[#2D3139] p-2.5 rounded flex items-center justify-between text-xs font-sans">
                <div>
                  <span className="text-[#E0E0E0] font-medium block">{rel.name}</span>
                  <span className="text-[9px] text-[#8E9299] uppercase font-bold tracking-wider block mt-0.5">
                    {rel.relationship}
                  </span>
                </div>
                {rel.cpf && (
                  <div className="text-right">
                    <span className="text-[9px] text-[#8E9299] block font-mono uppercase">CPF Associado:</span>
                    <span className="text-[#E0E0E0] font-mono text-[11px]">{rel.cpf}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AI SECURITY ANALYST PARECER (GEMINI ENRICHED) */}
        <div className="pt-1.5">
          <div className="bg-[#0A0B0D] border border-[#2D3139] rounded p-3.5 relative overflow-hidden">
            {/* AI icon label */}
            <div className="flex items-center gap-1.5 text-[10px] text-[#FF6321] font-bold uppercase tracking-wider mb-2.5">
              <Brain className="w-4 h-4 text-[#FF6321] shrink-0" />
              <span>Análise de Risco com Inteligência Artificial</span>
            </div>
            
            <p className="text-[#E0E0E0] text-[11px] leading-relaxed font-sans text-justify bg-[#1A1D23] p-2.5 rounded border border-[#2D3139]">
              {profile.aiRiskAssessment}
            </p>
          </div>
        </div>

      </div>

      {/* FOOTER METRIC */}
      <div className="border-t border-[#2D3139] pt-3 mt-4 text-right flex items-center justify-between text-[9px] text-[#8E9299] font-mono">
        <span className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>Sincronizado: {new Date(profile.searchedAt).toLocaleString("pt-BR")}</span>
        </span>
        <span>Consultas: {profile.scannedCount}</span>
      </div>

    </div>
  );
}
