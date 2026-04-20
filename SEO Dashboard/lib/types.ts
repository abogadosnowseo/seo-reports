// ─── Client ───────────────────────────────────────────────────────────────────
export interface Client {
  id: string
  name: string
  domain: string
  ga4PropertyId: string
  ahrefsTarget: string
  callrailAccountId: string
  practiceArea: string
  location: string
}

// ─── Date Range ───────────────────────────────────────────────────────────────
export interface DateRange {
  from: string // YYYY-MM-DD
  to: string
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
export interface KPIData {
  label: string
  value: string | number
  change: number       // percentage vs prev period
  changeLabel?: string
  breakdownA?: { label: string; value: string | number }
  breakdownB?: { label: string | null; value: string | number | null }
  icon: string         // lucide icon name
  color: 'orange' | 'coral' | 'purple' | 'navy' | 'green'
  format?: 'number' | 'currency' | 'percent' | 'rank' | 'dr'
}

// ─── Executive Summary ────────────────────────────────────────────────────────
export interface ExecutiveSummaryData {
  clientName: string
  headline: string
  paragraphs: string[]
}

// ─── Traffic (GA4) ────────────────────────────────────────────────────────────
export interface TrafficPoint {
  date: string
  sessions: number
  users: number
}

export interface TopPage {
  url: string
  sessions: number
  users: number
  avgDuration: string
  bounceRate: number
  change: number
}

export interface TrafficData {
  history: TrafficPoint[]
  topPages: TopPage[]
  deviceSplit: { desktop: number; mobile: number; tablet: number }
  channelSplit: { organic: number; direct: number; referral: number; other: number }
}

// ─── Keywords (Ahrefs) ────────────────────────────────────────────────────────
export interface KeywordRow {
  keyword: string
  position: number
  prevPosition: number | null
  volume: number
  difficulty: number
  url: string
  intent: 'informational' | 'commercial' | 'transactional' | 'navigational'
}

export interface PositionBucket {
  label: string
  count: number
  color: string
}

export interface KeywordsData {
  tracked: KeywordRow[]
  positionBuckets: PositionBucket[]
  topMovers: KeywordRow[]
  topLosers: KeywordRow[]
  avgPosition: number
  prevAvgPosition: number
  visibilityScore: number
  prevVisibilityScore: number
}

// ─── Leads (CallRail) ─────────────────────────────────────────────────────────
export interface LeadPoint {
  date: string
  calls: number
  forms: number
}

export interface LeadRow {
  date: string
  callerNumber: string
  duration: string
  keyword: string | null
  source: string
  status: 'answered' | 'missed' | 'voicemail'
  qualified: boolean
}

export interface LeadsData {
  history: LeadPoint[]
  recentCalls: LeadRow[]
  totalCalls: number
  prevTotalCalls: number
  answeredRate: number
  avgDuration: string
  topKeywords: { keyword: string; calls: number }[]
}

// ─── Backlinks (Ahrefs) ───────────────────────────────────────────────────────
export interface DRPoint {
  date: string
  dr: number
  refDomains: number
}

export interface ReferringDomain {
  domain: string
  dr: number
  links: number
  firstSeen: string
  status: 'new' | 'active' | 'lost'
}

export interface BacklinksData {
  drHistory: DRPoint[]
  currentDR: number
  prevDR: number
  totalBacklinks: number
  prevTotalBacklinks: number
  refDomains: number
  prevRefDomains: number
  newRefDomains: number
  lostRefDomains: number
  topReferringDomains: ReferringDomain[]
}

// ─── Full Dashboard Data ──────────────────────────────────────────────────────
export interface DashboardData {
  client: Client
  dateRange: DateRange
  summary: ExecutiveSummaryData
  kpis: KPIData[]
  traffic: TrafficData
  keywords: KeywordsData
  leads: LeadsData
  backlinks: BacklinksData
}
