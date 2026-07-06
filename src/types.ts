export interface AddressInfo {
  street: string;
  city: string;
  state: string;
  zip: string;
  period?: string;
  isVerified?: boolean;
}

export interface RelativeInfo {
  name: string;
  relationship: string;
  phone?: string;
  cpf?: string;
}

export interface DriverProfile {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email: string;
  trustScore: number; // 0 - 100, higher is better
  status: 'APROVADO' | 'ANALISE' | 'SUSPEITO';
  carrier: string;
  lineType: string;
  phoneActiveStatus: string; // 'Ativo', 'Inativo', 'Suspeito'
  whatsappActive: boolean;
  addresses: AddressInfo[];
  relatives: RelativeInfo[];
  searchedAt: string;
  scannedCount: number;
  aiRiskAssessment?: string;
  webScoreValue?: number; // 0-100 score of phone on web
  pixReliability?: 'CONFIÁVEL' | 'ATENÇÃO' | 'BLOQUEADO';
  spamFlag?: boolean;
  webReputation?: 'CONHECIDO' | 'DESCONHECIDO' | 'SPAM' | 'FRAUDE';
  spamReportsCount?: number;
  pixRecommendation?: string;
}

export interface ScanInput {
  phone: string;
  cpf: string;
  name: string;
  street: string;
  email: string;
}

export interface ScanHistoryItem {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  trustScore: number;
  status: 'APROVADO' | 'ANALISE' | 'SUSPEITO';
  scannedAt: string;
}

export interface DashboardStats {
  totalScans: number;
  approvedCount: number;
  analysisCount: number;
  suspiciousCount: number;
  averageTrustScore: number;
}
