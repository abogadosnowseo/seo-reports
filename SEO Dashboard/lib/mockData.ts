import { DashboardData, Client } from './types'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function datesBetween(from: string, to: string): string[] {
  const dates: string[] = []
  const start = new Date(from)
  const end = new Date(to)
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

function randomBetween(min: number, max: number, decimals = 0): number {
  const val = Math.random() * (max - min) + min
  return parseFloat(val.toFixed(decimals))
}

// ─── Mock Data Generator ─────────────────────────────────────────────────────
export function generateMockData(client: Client, from: string, to: string): DashboardData {
  const dates = datesBetween(from, to)

  // ── Traffic ──
  const trafficHistory = dates.map((date) => ({
    date,
    sessions: randomBetween(180, 520),
    users: randomBetween(140, 420),
  }))

  const totalSessions = trafficHistory.reduce((s, d) => s + d.sessions, 0)
  const totalUsers = trafficHistory.reduce((s, d) => s + d.users, 0)
  const prevSessions = Math.round(totalSessions * randomBetween(0.82, 1.18, 2))

  const topPages = [
    { url: `/${client.domain.split('.')[0]}-abogado-lesiones-personales`, sessions: randomBetween(900, 1800), users: randomBetween(700, 1400), avgDuration: '2:34', bounceRate: 42.1, change: 12.4 },
    { url: '/abogado-accidentes-auto', sessions: randomBetween(600, 1200), users: randomBetween(500, 1000), avgDuration: '1:58', bounceRate: 51.3, change: -3.2 },
    { url: '/consulta-gratis', sessions: randomBetween(400, 800), users: randomBetween(350, 700), avgDuration: '3:12', bounceRate: 28.7, change: 23.1 },
    { url: '/accidente-trabajo-compensacion', sessions: randomBetween(300, 600), users: randomBetween(250, 500), avgDuration: '2:05', bounceRate: 46.8, change: 8.9 },
    { url: '/blog/como-reclamar-seguro-accidente', sessions: randomBetween(200, 450), users: randomBetween(180, 400), avgDuration: '4:21', bounceRate: 34.2, change: 56.7 },
    { url: '/abogado-inmigracion-estados-unidos', sessions: randomBetween(150, 350), users: randomBetween(130, 300), avgDuration: '2:48', bounceRate: 38.5, change: -12.3 },
  ]

  // ── Keywords ──
  const keywords = [
    { keyword: 'abogado lesiones personales', position: 3, prevPosition: 6, volume: 1900, difficulty: 48, url: '/', intent: 'commercial' as const },
    { keyword: 'abogado accidente auto', position: 5, prevPosition: 4, volume: 2400, difficulty: 52, url: '/abogado-accidentes-auto', intent: 'commercial' as const },
    { keyword: 'abogados de accidentes cerca de mi', position: 8, prevPosition: 14, volume: 1600, difficulty: 39, url: '/abogado-accidentes-auto', intent: 'transactional' as const },
    { keyword: 'consulta gratis abogado accidente', position: 2, prevPosition: 3, volume: 880, difficulty: 31, url: '/consulta-gratis', intent: 'transactional' as const },
    { keyword: 'compensacion accidente trabajo', position: 11, prevPosition: 9, volume: 1200, difficulty: 44, url: '/accidente-trabajo-compensacion', intent: 'informational' as const },
    { keyword: 'abogado heridas trabajo', position: 14, prevPosition: 22, volume: 720, difficulty: 36, url: '/accidente-trabajo-compensacion', intent: 'commercial' as const },
    { keyword: 'cuanto cobra abogado lesiones', position: 18, prevPosition: 15, volume: 590, difficulty: 28, url: '/blog/como-reclamar-seguro-accidente', intent: 'informational' as const },
    { keyword: 'abogado hispano accidente', position: 4, prevPosition: 5, volume: 480, difficulty: 22, url: '/', intent: 'commercial' as const },
    { keyword: 'abogado de inmigracion', position: 23, prevPosition: 31, volume: 3200, difficulty: 67, url: '/abogado-inmigracion-estados-unidos', intent: 'commercial' as const },
    { keyword: 'demanda por accidente de trafico', position: 9, prevPosition: 12, volume: 760, difficulty: 41, url: '/abogado-accidentes-auto', intent: 'informational' as const },
    { keyword: 'abogado negligencia medica espanol', position: 16, prevPosition: 16, volume: 320, difficulty: 35, url: '/', intent: 'commercial' as const },
    { keyword: 'mejor abogado personal injury español', position: 6, prevPosition: 8, volume: 410, difficulty: 29, url: '/', intent: 'transactional' as const },
  ]

  const positionBuckets = [
    { label: '1–3', count: keywords.filter((k) => k.position <= 3).length, color: '#10B981' },
    { label: '4–10', count: keywords.filter((k) => k.position >= 4 && k.position <= 10).length, color: '#EE7023' },
    { label: '11–20', count: keywords.filter((k) => k.position >= 11 && k.position <= 20).length, color: '#E83F58' },
    { label: '21–50', count: keywords.filter((k) => k.position >= 21 && k.position <= 50).length, color: '#8A2685' },
  ]

  const avgPos = parseFloat((keywords.reduce((s, k) => s + k.position, 0) / keywords.length).toFixed(1))

  // ── Leads ──
  const leadsHistory = dates.map((date) => ({
    date,
    calls: randomBetween(2, 9),
    forms: randomBetween(0, 3),
  }))

  const totalCalls = leadsHistory.reduce((s, d) => s + d.calls, 0)
  const recentCalls = [
    { date: to, callerNumber: '+1 (323) 555-0142', duration: '4:23', keyword: 'abogado lesiones personales', source: 'Organic', status: 'answered' as const, qualified: true },
    { date: to, callerNumber: '+1 (305) 555-0189', duration: '1:12', keyword: 'consulta gratis abogado', source: 'Organic', status: 'answered' as const, qualified: false },
    { date: to, callerNumber: '+1 (713) 555-0234', duration: '0:00', keyword: null, source: 'Organic', status: 'missed' as const, qualified: false },
    { date: to, callerNumber: '+1 (323) 555-0067', duration: '6:45', keyword: 'abogado accidente auto', source: 'Organic', status: 'answered' as const, qualified: true },
    { date: to, callerNumber: '+1 (305) 555-0318', duration: '2:31', keyword: 'abogado hispano accidente', source: 'Organic', status: 'answered' as const, qualified: true },
    { date: to, callerNumber: '+1 (214) 555-0092', duration: '0:47', keyword: null, source: 'Organic', status: 'voicemail' as const, qualified: false },
  ]

  // ── Backlinks ──
  const drHistory = dates
    .filter((_, i) => i % 7 === 0)
    .map((date, i) => ({
      date,
      dr: Math.min(45 + i + randomBetween(-1, 2), 58),
      refDomains: Math.min(180 + i * 3 + randomBetween(-3, 5), 230),
    }))

  const currentDR = drHistory[drHistory.length - 1]?.dr ?? 45
  const prevDR = drHistory[0]?.dr ?? 43

  const topReferringDomains = [
    { domain: 'avvo.com', dr: 74, links: 3, firstSeen: '2024-02-14', status: 'active' as const },
    { domain: 'justia.com', dr: 70, links: 2, firstSeen: '2024-01-08', status: 'active' as const },
    { domain: 'findlaw.com', dr: 66, links: 1, firstSeen: '2025-11-20', status: 'new' as const },
    { domain: 'lawyers.com', dr: 63, links: 4, firstSeen: '2024-06-03', status: 'active' as const },
    { domain: 'hispanicbar.org', dr: 48, links: 2, firstSeen: '2026-01-15', status: 'new' as const },
    { domain: 'yelp.com', dr: 93, links: 1, firstSeen: '2023-09-12', status: 'active' as const },
    { domain: 'laopinion.com', dr: 51, links: 1, firstSeen: '2025-10-04', status: 'new' as const },
    { domain: 'old-legal-directory.net', dr: 22, links: 5, firstSeen: '2022-03-01', status: 'lost' as const },
  ]

  // ── KPIs ──
  const sessionChange = parseFloat((((totalSessions - prevSessions) / prevSessions) * 100).toFixed(1))
  const prevUsers = Math.round(totalUsers * randomBetween(0.85, 1.15, 2))
  const userChange = parseFloat((((totalUsers - prevUsers) / prevUsers) * 100).toFixed(1))
  const prevAvgPos = parseFloat((avgPos * randomBetween(1.05, 1.25, 2)).toFixed(1))
  const top10Count = keywords.filter((k) => k.position <= 10).length
  const prevTop10 = Math.round(top10Count * randomBetween(0.8, 1.1))
  const top10Change = parseFloat((((top10Count - prevTop10) / prevTop10) * 100).toFixed(1))
  const prevTotalCalls = Math.round(totalCalls * randomBetween(0.8, 1.2))
  const callChange = parseFloat((((totalCalls - prevTotalCalls) / prevTotalCalls) * 100).toFixed(1))
  const refDomains = drHistory[drHistory.length - 1]?.refDomains ?? 200
  const prevRefDomains = drHistory[0]?.refDomains ?? 185
  const refChange = parseFloat((((refDomains - prevRefDomains) / prevRefDomains) * 100).toFixed(1))
  const totalBacklinks = refDomains * randomBetween(1.8, 2.5, 0)
  const drChange = parseFloat((((currentDR - prevDR) / prevDR) * 100).toFixed(1))

  const kpis = [
    {
      label: 'Organic Sessions',
      value: totalSessions.toLocaleString(),
      change: sessionChange,
      breakdownA: { label: 'Desktop', value: Math.round(totalSessions * 0.38).toLocaleString() },
      breakdownB: { label: 'Mobile', value: Math.round(totalSessions * 0.57).toLocaleString() },
      icon: 'TrendingUp',
      color: 'orange' as const,
      format: 'number' as const,
    },
    {
      label: 'Organic Users',
      value: totalUsers.toLocaleString(),
      change: userChange,
      breakdownA: { label: 'New', value: Math.round(totalUsers * 0.71).toLocaleString() },
      breakdownB: { label: 'Return', value: Math.round(totalUsers * 0.29).toLocaleString() },
      icon: 'Users',
      color: 'coral' as const,
      format: 'number' as const,
    },
    {
      label: 'Avg. Position',
      value: avgPos,
      change: parseFloat((((prevAvgPos - avgPos) / prevAvgPos) * 100).toFixed(1)),
      changeLabel: 'improved',
      breakdownA: { label: 'Best', value: '#2' },
      breakdownB: { label: 'Worst', value: '#23' },
      icon: 'Award',
      color: 'purple' as const,
      format: 'rank' as const,
    },
    {
      label: 'Keywords Top 10',
      value: top10Count,
      change: top10Change,
      breakdownA: { label: 'Top 3', value: keywords.filter((k) => k.position <= 3).length },
      breakdownB: { label: 'Pos 4-10', value: keywords.filter((k) => k.position >= 4 && k.position <= 10).length },
      icon: 'Search',
      color: 'navy' as const,
      format: 'number' as const,
    },
    {
      label: 'Organic Leads',
      value: totalCalls,
      change: callChange,
      breakdownA: { label: 'Calls', value: totalCalls },
      breakdownB: { label: 'Forms', value: leadsHistory.reduce((s, d) => s + d.forms, 0) },
      icon: 'Phone',
      color: 'green' as const,
      format: 'number' as const,
    },
    {
      label: 'Domain Rating',
      value: currentDR,
      change: drChange,
      breakdownA: { label: 'Prev DR', value: prevDR },
      breakdownB: { label: 'Target', value: 60 },
      icon: 'Shield',
      color: 'orange' as const,
      format: 'dr' as const,
    },
    {
      label: 'Referring Domains',
      value: refDomains,
      change: refChange,
      breakdownA: { label: 'New', value: `+${topReferringDomains.filter((d) => d.status === 'new').length}` },
      breakdownB: { label: 'Lost', value: `-${topReferringDomains.filter((d) => d.status === 'lost').length}` },
      icon: 'Link',
      color: 'coral' as const,
      format: 'number' as const,
    },
  ]

  // ── Executive Summary ──
  const sessionTrend = sessionChange > 0 ? 'up' : 'down'
  const bestKeyword = keywords.sort((a, b) => a.position - b.position)[0]

  const summary = {
    clientName: client.name,
    headline: `Your SEO is ${sessionChange > 5 ? 'gaining momentum' : sessionChange < -5 ? 'facing headwinds' : 'holding steady'} this period.`,
    paragraphs: [
      `Your website received <strong>${totalSessions.toLocaleString()} organic sessions</strong> between ${from} and ${to} — ${sessionChange > 0 ? `a <strong style="color:#10B981">+${sessionChange}% increase</strong> vs. the previous period` : `a <strong style="color:#EF4444">${sessionChange}% decrease</strong> vs. the previous period`}. Mobile accounts for the majority of that traffic, which is typical for Spanish-speaking audiences searching on their phones.`,
      `On the keyword side, you're ranking in the <strong>Top 10 for ${top10Count} keywords</strong> — including "<strong>${bestKeyword.keyword}</strong>" at position #${bestKeyword.position}. Your average position across all tracked keywords is <strong>#${avgPos}</strong>, ${avgPos < prevAvgPos ? 'an improvement' : 'a slight regression'} from the previous period.`,
      `CallRail tracked <strong>${totalCalls} organic calls</strong> during this window${callChange > 0 ? `, up <strong style="color:#10B981">+${callChange}%</strong> from the prior period` : `, down <strong style="color:#EF4444">${callChange}%</strong> from the prior period`}. Your Domain Rating is currently <strong>DR ${currentDR}</strong>, with <strong>${refDomains} referring domains</strong> pointing to your site. We added ${topReferringDomains.filter((d) => d.status === 'new').length} new referring domains this period.`,
    ],
  }

  return {
    client,
    dateRange: { from, to },
    summary,
    kpis,
    traffic: {
      history: trafficHistory,
      topPages,
      deviceSplit: { desktop: 38, mobile: 57, tablet: 5 },
      channelSplit: { organic: 68, direct: 18, referral: 9, other: 5 },
    },
    keywords: {
      tracked: keywords,
      positionBuckets,
      topMovers: keywords.filter((k) => k.prevPosition !== null && k.prevPosition - k.position >= 3),
      topLosers: keywords.filter((k) => k.prevPosition !== null && k.position - k.prevPosition >= 2),
      avgPosition: avgPos,
      prevAvgPosition: prevAvgPos,
      visibilityScore: 34,
      prevVisibilityScore: 29,
    },
    leads: {
      history: leadsHistory,
      recentCalls,
      totalCalls,
      prevTotalCalls,
      answeredRate: 78,
      avgDuration: '3:14',
      topKeywords: [
        { keyword: 'abogado lesiones personales', calls: Math.round(totalCalls * 0.28) },
        { keyword: 'abogado accidente auto', calls: Math.round(totalCalls * 0.21) },
        { keyword: 'consulta gratis abogado', calls: Math.round(totalCalls * 0.15) },
        { keyword: 'abogado hispano accidente', calls: Math.round(totalCalls * 0.12) },
        { keyword: '(not provided)', calls: Math.round(totalCalls * 0.24) },
      ],
    },
    backlinks: {
      drHistory,
      currentDR,
      prevDR,
      totalBacklinks: Math.round(totalBacklinks),
      prevTotalBacklinks: Math.round(totalBacklinks * 0.91),
      refDomains,
      prevRefDomains,
      newRefDomains: topReferringDomains.filter((d) => d.status === 'new').length,
      lostRefDomains: topReferringDomains.filter((d) => d.status === 'lost').length,
      topReferringDomains,
    },
  }
}
