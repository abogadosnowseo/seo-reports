'use client'

import dynamic from 'next/dynamic'
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { TrafficData, DateRange } from '@/lib/types'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from 'recharts'

interface Props { data: TrafficData; dateRange: DateRange }

function shortDate(iso: string) {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

export default function TrafficSection({ data, dateRange }: Props) {
  const chartData = data.history.map((d) => ({
    date: shortDate(d.date),
    Sessions: d.sessions,
    Users: d.users,
  }))

  return (
    <SectionWrapper
      title="Organic Traffic"
      subtitle="Source: Google Analytics 4"
      icon={<TrendingUp size={15} className="text-brand-orange" />}
    >
      {/* Chart */}
      <div className="h-56 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="gSessions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#EE7023" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EE7023" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#8A2685" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#8A2685" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} interval={6} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              labelStyle={{ fontWeight: 700, color: '#1E2344' }}
            />
            <Area type="monotone" dataKey="Sessions" stroke="#EE7023" strokeWidth={2} fill="url(#gSessions)" dot={false} />
            <Area type="monotone" dataKey="Users"    stroke="#8A2685" strokeWidth={2} fill="url(#gUsers)"    dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device split */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Traffic by Device</p>
          <div className="space-y-2">
            {[
              { label: 'Mobile',  pct: data.deviceSplit.mobile,  color: 'bg-brand-orange' },
              { label: 'Desktop', pct: data.deviceSplit.desktop, color: 'bg-brand-purple' },
              { label: 'Tablet',  pct: data.deviceSplit.tablet,  color: 'bg-gray-300'     },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{label}</span>
                  <span className="font-bold text-brand-navy">{pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel split */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">By Channel</p>
          <div className="space-y-2">
            {[
              { label: 'Organic Search', pct: data.channelSplit.organic,  color: 'bg-brand-orange' },
              { label: 'Direct',         pct: data.channelSplit.direct,   color: 'bg-brand-coral'  },
              { label: 'Referral',       pct: data.channelSplit.referral, color: 'bg-brand-purple' },
              { label: 'Other',          pct: data.channelSplit.other,    color: 'bg-gray-300'     },
            ].map(({ label, pct, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{label}</span>
                  <span className="font-bold text-brand-navy">{pct}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="lg:col-span-1 col-span-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Pages</p>
          <div className="space-y-2">
            {data.topPages.slice(0, 5).map((page, i) => (
              <div key={i} className="flex items-center justify-between gap-2 text-xs py-1 border-b border-gray-50 last:border-0">
                <span className="text-gray-600 truncate font-medium" title={page.url}>
                  {page.url}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-bold text-brand-navy">{page.sessions.toLocaleString()}</span>
                  <span className={`flex items-center gap-0.5 font-bold ${page.change >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                    {page.change >= 0
                      ? <ArrowUpRight size={11} />
                      : <ArrowDownRight size={11} />}
                    {Math.abs(page.change)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
