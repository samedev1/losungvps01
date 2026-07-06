import React, { useState } from "react";
import { DriverProfile } from "../types.js";
import { Search, Trash2, History, AlertCircle, RefreshCw, FileSpreadsheet } from "lucide-react";

interface RecentScansTableProps {
  scans: DriverProfile[];
  onSelect: (profile: DriverProfile) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  selectedId?: string;
}

export default function RecentScansTable({ 
  scans, 
  onSelect, 
  onDelete, 
  onClearAll,
  selectedId 
}: RecentScansTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredScans = scans.filter(scan => {
    const term = searchTerm.toLowerCase();
    return (
      scan.name.toLowerCase().includes(term) ||
      scan.cpf.includes(term) ||
      scan.phone.includes(term) ||
      scan.status.toLowerCase().includes(term)
    );
  });

  const getStatusBadge = (status: DriverProfile["status"]) => {
    switch (status) {
      case "APROVADO":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-green-900/10 text-green-500 border border-green-500/20">
            Aprovado
          </span>
        );
      case "ANALISE":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-yellow-900/10 text-yellow-500 border border-yellow-500/20">
            Em Análise
          </span>
        );
      case "SUSPEITO":
        return (
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-red-900/10 text-red-500 border border-red-500/20">
            Suspeito
          </span>
        );
    }
  };

  return (
    <div className="bg-[#0F1115] border border-[#2D3139] rounded p-5 shadow-xl relative overflow-hidden">
      
      {/* Header section with title and global actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <History className="w-4 h-4 text-[#FF6321]" />
          <span>Histórico de Scans e Cruzamento de Dados</span>
        </h3>
        
        {scans.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-[9px] font-bold uppercase tracking-wider text-red-400 hover:text-red-300 bg-[#1A1D23] hover:bg-red-950/20 border border-[#2D3139] hover:border-red-900 px-2.5 py-1 rounded transition-all cursor-pointer text-right self-end sm:self-auto"
          >
            Limpar Todo Histórico
          </button>
        )}
      </div>

      {/* SEARCH AND CONTROL LINE */}
      <div className="relative mb-4">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#8E9299] pointer-events-none">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filtrar histórico por nome, CPF, telefone ou status..."
          className="w-full pl-9 pr-4 py-2 bg-[#1A1D23] border border-[#2D3139] rounded text-xs text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#FF6321] transition-all font-sans"
        />
      </div>

      {/* DATA TABLE CONTAINER */}
      <div className="overflow-x-auto border border-[#2D3139] rounded">
        {filteredScans.length === 0 ? (
          <div className="py-10 text-center text-[#8E9299]">
            <AlertCircle className="w-8 h-8 mx-auto text-[#2D3139] mb-2" />
            <p className="text-[10px] font-bold uppercase tracking-wider">Nenhum registro encontrado</p>
            <p className="text-[9px] text-[#8E9299] mt-1">Refine seus filtros ou realize uma nova varredura.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#1A1D23] border-b border-[#2D3139] text-[9px] text-[#8E9299] uppercase font-bold tracking-wider select-none">
                <th className="py-2.5 px-3">Investigado / Nome</th>
                <th className="py-2.5 px-3">CPF / Documento</th>
                <th className="py-2.5 px-3">Telefone / Web Score</th>
                <th className="py-2.5 px-3">Confiança</th>
                <th className="py-2.5 px-3">Veredito</th>
                <th className="py-2.5 px-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D3139]/60">
              {filteredScans.map((scan) => {
                const isSelected = scan.id === selectedId;
                return (
                  <tr 
                    key={scan.id}
                    onClick={() => onSelect(scan)}
                    className={`cursor-pointer transition-all hover:bg-[#1C1F26] ${isSelected ? 'bg-[#FF6321]/5 hover:bg-[#FF6321]/10' : ''}`}
                  >
                    {/* Name & Timestamp */}
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-[#E0E0E0]">{scan.name}</div>
                      <div className="text-[9px] text-[#8E9299] font-mono mt-0.5">
                        {new Date(scan.searchedAt).toLocaleDateString("pt-BR")} às {new Date(scan.searchedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>

                    {/* CPF */}
                    <td className="py-2.5 px-3 font-mono font-medium text-[#E0E0E0]">
                      {scan.cpf}
                    </td>

                    {/* Phone & Carrier Score */}
                    <td className="py-2.5 px-3">
                      <div className="font-mono text-[#E0E0E0]">{scan.phone}</div>
                      <div className="text-[9px] text-[#8E9299] font-sans mt-0.5 flex items-center gap-1">
                        <span>{scan.carrier}</span>
                        <span>•</span>
                        <span className={`font-bold ${scan.webScoreValue && scan.webScoreValue >= 80 ? 'text-green-500' : scan.webScoreValue && scan.webScoreValue >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                          Web: {scan.webScoreValue}/100
                        </span>
                      </div>
                    </td>

                    {/* Trust Score Percentage */}
                    <td className="py-2.5 px-3 font-mono font-bold">
                      <span className={`${scan.trustScore >= 80 ? 'text-green-500' : scan.trustScore >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
                        {scan.trustScore}%
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-2.5 px-3">
                      {getStatusBadge(scan.status)}
                    </td>

                    {/* Row Deletion Action */}
                    <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => onDelete(scan.id)}
                        className="p-1 rounded bg-[#1A1D23] border border-[#2D3139] hover:border-red-900 text-[#8E9299] hover:text-red-400 hover:bg-red-950/10 transition-all cursor-pointer"
                        title="Excluir do histórico"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Historical statistics footer */}
      <div className="mt-4 flex items-center justify-between text-[9px] text-[#8E9299] select-none">
        <span className="flex items-center gap-1">
          <FileSpreadsheet className="w-3.5 h-3.5 text-[#2D3139]" />
          <span>Registros salvos: {filteredScans.length} de {scans.length}</span>
        </span>
        <span>Sistema de Prevenção a Fraudes e Cruzamento v3.5</span>
      </div>

    </div>
  );
}
