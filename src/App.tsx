import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, ShieldAlert, AlertTriangle, Users, BarChart3, 
  Clock, LogOut, RefreshCw, Radio, HardDrive, FileSpreadsheet, Lock
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

import { DriverProfile, ScanInput, DashboardStats } from "./types.js";
import LoginScreen from "./components/LoginScreen.js";
import ScannerForm from "./components/ScannerForm.js";
import ScanResults from "./components/ScanResults.js";
import RecentScansTable from "./components/RecentScansTable.js";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scans, setScans] = useState<DriverProfile[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalScans: 0,
    approvedCount: 0,
    analysisCount: 0,
    suspiciousCount: 0,
    averageTrustScore: 0
  });
  
  const [selectedProfile, setSelectedProfile] = useState<DriverProfile | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState("");
  const [isRefreshingStats, setIsRefreshingStats] = useState(false);

  // Sync clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch scans and stats from server
  const loadData = async () => {
    setIsRefreshingStats(true);
    try {
      const [scansRes, statsRes] = await Promise.all([
        fetch("/api/scans"),
        fetch("/api/stats")
      ]);

      if (scansRes.ok && statsRes.ok) {
        const scansData = await scansRes.json() as DriverProfile[];
        const statsData = await statsRes.json() as DashboardStats;
        setScans(scansData);
        setStats(statsData);
        
        // Select newest scan as default if none selected
        if (scansData.length > 0 && !selectedProfile) {
          setSelectedProfile(scansData[0]);
        }
      }
    } catch (err) {
      console.error("Erro ao sincronizar dados com o servidor:", err);
    } finally {
      setIsRefreshingStats(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn]);

  // Handle New Scan
  const handleScan = async (input: ScanInput) => {
    setIsScanning(true);
    setScanProgress([]);

    const steps = [
      "[INIT] Estabelecendo conexão segura com a Central de Varredura...",
      "[OSINT] Inicializando raspagem ativa em diretórios telefônicos públicos...",
      "[SCRAPE] Escaneando fóruns de segurança e portais contra golpes (Ex: Quem Perturba)...",
      "[REPUTATION] Classificando número: CONHECIDO vs DESCONHECIDO vs SPAM / FRAUDE...",
      "[PIX EVAL] Calculando score de risco e integridade de pagamento via PIX...",
      "[VALID] Verificando se o celular ativo possui chave PIX associada de longa data...",
      "[AI] Enviando parecer técnico para homologação de IA com o analista virtual...",
      "[SUCCESS] Raspagem finalizada. Índice de confiabilidade PIX registrado no dossiê."
    ];

    // Animate terminal logs sequentially for high-tech feeling
    for (let i = 0; i < steps.length; i++) {
      setScanProgress(prev => [...prev, steps[i]]);
      await new Promise(resolve => setTimeout(resolve, i === 3 ? 2000 : 1000));
    }

    try {
      const response = await fetch("/api/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input)
      });

      if (response.ok) {
        const newProfile = await response.json() as DriverProfile;
        setSelectedProfile(newProfile);
        await loadData(); // Reload scans list & statistics
      } else {
        const errorData = await response.json();
        alert(`Erro na investigação: ${errorData.error || "Tente novamente."}`);
      }
    } catch (err) {
      console.error("Erro ao realizar scan:", err);
      alert("Erro de comunicação com o servidor Lösung Express.");
    } finally {
      setIsScanning(false);
    }
  };

  // Delete Individual Scan
  const handleDeleteScan = async (id: string) => {
    if (confirm("Tem certeza que deseja remover este dossiê do histórico?")) {
      try {
        const res = await fetch(`/api/scans/${id}`, { method: "DELETE" });
        if (res.ok) {
          if (selectedProfile?.id === id) {
            setSelectedProfile(null);
          }
          await loadData();
        }
      } catch (err) {
        console.error("Erro ao deletar scan:", err);
      }
    }
  };

  // Clear All History
  const handleClearAllHistory = async () => {
    if (confirm("ATENÇÃO: Deseja apagar permanentemente todas as investigações salvas? Esta ação é irreversível.")) {
      try {
        const res = await fetch("/api/scans/clear", { method: "POST" });
        if (res.ok) {
          setSelectedProfile(null);
          await loadData();
        }
      } catch (err) {
        console.error("Erro ao limpar histórico:", err);
      }
    }
  };

  // Render Login Gate
  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // Visual Chart Data formatting
  const chartData = scans.slice(-7).map(d => ({
    name: d.name.split(" ")[0],
    score: d.trustScore,
    status: d.status
  }));

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#E0E0E0] font-sans flex flex-col justify-between">
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,99,33,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,99,33,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#FF6321]/5 rounded-full blur-3xl pointer-events-none z-0" />
      
      {/* HEADER BAR */}
      <header className="relative bg-[#0F1115] border-b border-[#2D3139] px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 z-10 shadow-lg shadow-[#0A0B0D]/50">
        <div className="flex items-center gap-4">
          {/* Small brand representation */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center rounded bg-[#FF6321] font-black text-black text-sm uppercase">
              S
            </div>
            <div>
              <h2 className="text-xs font-black tracking-wider text-white uppercase leading-none">
                SCAN INVESTIGATIVO
              </h2>
              <span className="text-[9px] tracking-widest text-[#FF6321] font-bold uppercase font-mono block mt-1">
                ● CRUZAMENTO DE TELEFONE E CPF
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1D23] rounded border border-[#2D3139] text-[9px] text-[#8E9299] font-mono">
            <Radio className="w-3.5 h-3.5 text-[#FF6321] animate-pulse" />
            <span>SISTEMA INVESTIGATIVO ATIVO</span>
          </div>
        </div>

        {/* Operational Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2 bg-[#1A1D23] px-2.5 py-1 rounded border border-[#2D3139] font-mono text-[11px]">
            <Clock className="w-3.5 h-3.5 text-[#FF6321]" />
            <span className="text-[#E0E0E0]">{currentTime} UTC-3</span>
          </div>

          <div className="flex items-center gap-2 bg-[#1A1D23] px-2.5 py-1 rounded border border-[#2D3139] text-[11px]">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-semibold text-[#8E9299]">Painel Investigativo</span>
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1D23] hover:bg-red-950/20 text-[#8E9299] hover:text-red-400 border border-[#2D3139] hover:border-red-900/40 rounded transition-all cursor-pointer text-[11px] uppercase tracking-wider font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sair</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <main className="relative flex-1 p-4 md:p-5 space-y-5 z-10 max-w-7xl mx-auto w-full">
        
        {/* STATS OVERVIEW CARDS & RECHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* LEFT PANELS: Standard metrics card grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* CARD 1: Total scans */}
            <div className="bg-[#0F1115] border border-[#2D3139] rounded p-4 flex flex-col justify-between hover:border-[#FF6321]/30 transition-all shadow-md">
              <div className="flex items-center justify-between text-[#8E9299]">
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Varreduras</span>
                <Users className="w-4 h-4 text-[#FF6321]" />
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-white font-mono">{stats.totalScans}</span>
                <span className="text-[9px] text-[#8E9299] block mt-1 uppercase">Banco Local Sincronizado</span>
              </div>
            </div>

            {/* CARD 2: Approved */}
            <div className="bg-[#0F1115] border border-[#2D3139] rounded p-4 flex flex-col justify-between hover:border-[#FF6321]/30 transition-all shadow-md">
              <div className="flex items-center justify-between text-[#8E9299]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-green-500">Aprovados</span>
                <ShieldCheck className="w-4 h-4 text-green-500" />
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-green-500 font-mono">{stats.approvedCount}</span>
                <span className="text-[9px] text-[#8E9299] block mt-1 uppercase">
                  {stats.totalScans > 0 ? `${Math.round((stats.approvedCount / stats.totalScans) * 100)}%` : "0%"} dos motoristas
                </span>
              </div>
            </div>

            {/* CARD 3: Under Analysis */}
            <div className="bg-[#0F1115] border border-[#2D3139] rounded p-4 flex flex-col justify-between hover:border-[#FF6321]/30 transition-all shadow-md">
              <div className="flex items-center justify-between text-[#8E9299]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500">Em Análise</span>
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-yellow-500 font-mono">{stats.analysisCount}</span>
                <span className="text-[9px] text-[#8E9299] block mt-1 uppercase">
                  {stats.totalScans > 0 ? `${Math.round((stats.analysisCount / stats.totalScans) * 100)}%` : "0%"} pendências
                </span>
              </div>
            </div>

            {/* CARD 4: Suspicious */}
            <div className="bg-[#0F1115] border border-[#2D3139] rounded p-4 flex flex-col justify-between hover:border-[#FF6321]/30 transition-all shadow-md">
              <div className="flex items-center justify-between text-[#8E9299]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-500">Alto Risco</span>
                <ShieldAlert className="w-4 h-4 text-red-500" />
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-red-500 font-mono">{stats.suspiciousCount}</span>
                <span className="text-[9px] text-[#8E9299] block mt-1 uppercase">Bloqueios de segurança</span>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Recharts volume score indicator */}
          <div className="bg-[#0F1115] border border-[#2D3139] rounded p-4 flex flex-col justify-between shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider block">
                Histórico de Confiança das Varreduras Recentes
              </span>
              <BarChart3 className="w-4 h-4 text-[#FF6321]" />
            </div>

            {chartData.length === 0 ? (
              <div className="h-24 flex items-center justify-center text-[#8E9299] text-[10px] font-mono">
                [AGUARDANDO DADOS DE CONSULTA]
              </div>
            ) : (
              <div className="h-24 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="#8E9299" fontSize={8} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#8E9299" fontSize={8} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0F1115", borderColor: "#2D3139", borderRadius: "2px" }}
                      labelStyle={{ color: "#E0E0E0", fontSize: "9px", fontWeight: "bold" }}
                      itemStyle={{ color: "#FF6321", fontSize: "9px" }}
                    />
                    <Bar dataKey="score" radius={[2, 2, 0, 0]}>
                      {chartData.map((entry, index) => {
                        const color = entry.status === "APROVADO" ? "#22c55e" : entry.status === "ANALISE" ? "#eab308" : "#ef4444";
                        return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>

        {/* WORKSTAGE CONTAINER: Scanner and Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* LEFT: SCANNER MODULE */}
          <div className="lg:col-span-5 flex flex-col">
            <ScannerForm onScan={handleScan} isScanning={isScanning} />
          </div>

          {/* RIGHT: DOSSIER RESULTS VIEWER */}
          <div className="lg:col-span-7 flex flex-col">
            <ScanResults 
              profile={selectedProfile} 
              isScanning={isScanning} 
              scanProgress={scanProgress} 
            />
          </div>

        </div>

        {/* BOTTOM: DATA TABLE DIRECTORY */}
        <div id="historical-directory">
          <RecentScansTable 
            scans={scans} 
            onSelect={(p) => setSelectedProfile(p)} 
            onDelete={handleDeleteScan} 
            onClearAll={handleClearAllHistory}
            selectedId={selectedProfile?.id}
          />
        </div>

      </main>

      {/* FOOTER BAR */}
      <footer className="relative bg-[#0F1115] border-t border-[#2D3139] px-6 py-4 mt-8 z-10 text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8E9299]">
        <span className="font-mono text-[10px]">
          © 2026 SCAN INVESTIGATIVO • Todos os direitos reservados.
        </span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-[9px] uppercase font-bold text-[#FF6321]">
            <HardDrive className="w-3.5 h-3.5 shrink-0" />
            <span>Banco de Dados Ativo</span>
          </span>
          <span className="text-[9px] uppercase tracking-widest font-semibold text-[#8E9299]">
            Prevenção a Fraudes e Inteligência de Dados
          </span>
        </div>
      </footer>

    </div>
  );
}
