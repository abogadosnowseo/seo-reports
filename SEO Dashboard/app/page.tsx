'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import ExecutiveSummary from '@/components/ExecutiveSummary'
import OverallPerformance from '@/components/OverallPerformance'
import TrafficSection from '@/components/TrafficSection'
import KeywordsSection from '@/components/KeywordsSection'
import LeadsSection from '@/components/LeadsSection'
import BacklinksSection from '@/components/BacklinksSection'
import { CLIENTS } from '@/lib/clients'
import { generateMockData } from '@/lib/mockData'

const DEFAULT_CLIENT_ID = 'magendzo-law'
const DEFAULT_FROM      = '2026-03-01'
const DEFAULT_TO        = '2026-03-31'

export default function Dashboard() {
  const [clientId, setClientId] = useState(DEFAULT_CLIENT_ID)
  const [from, setFrom]         = useState(DEFAULT_FROM)
  const [to, setTo]             = useState(DEFAULT_TO)

  const client = CLIENTS.find((c) => c.id === clientId) ?? CLIENTS[0]

  const data = useMemo(
    () => generateMockData(client, from, to),
    [client, from, to]
  )

  return (
    <div className="flex h-screen overflow-hidden bg-brand-navy">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header
          clients={CLIENTS}
          selectedClientId={clientId}
          onClientChange={setClientId}
          from={from}
          to={to}
          onFromChange={setFrom}
          onToChange={setTo}
        />

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 fade-in">
          {/* Executive Summary + Overall KPIs */}
          <div className="section-card gradient-border-top">
            <div className="p-6 space-y-6">
              <ExecutiveSummary data={data.summary} />
              <hr className="border-gray-100" />
              <OverallPerformance kpis={data.kpis} />
            </div>
          </div>

          {/* Traffic */}
          <TrafficSection data={data.traffic} dateRange={data.dateRange} />

          {/* Keywords */}
          <KeywordsSection data={data.keywords} />

          {/* Leads */}
          <LeadsSection data={data.leads} dateRange={data.dateRange} />

          {/* Backlinks */}
          <BacklinksSection data={data.backlinks} />
        </main>
      </div>
    </div>
  )
}
