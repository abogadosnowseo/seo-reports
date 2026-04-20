'use client'

import { Phone, PhoneCall, PhoneMissed, Voicemail } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { LeadsData, DateRange } from '@/lib/types'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'

interface Props { data: LeadsData; dateRange: DateRange }

function shortDate(iso: string) {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

const statusIcon = {
  answered:  { Icon: PhoneCall,   color: 'text-green-500',   bg: 'bg-green-50'  },
  missed:    { Icon: PhoneMissed, color: 'text-red-500',     bg: 'bg-red-50'    },
  voicemail: { Icon: Voicemail,   color: 'text-brand-orange',bg: 'bg-orange-50' },
}

export default function LeadsSection({ data, dateRange }: Props) {
  const chartData = data.history
    .filter((_, i) => i % 3 === 0)
    .map((d) => ({
      date: shortDate(d.date),
      Calls: d.calls,
      Forms: d.forms,
    }))

  return (
    <SectionWrapper
      title="Organic Leads"
      subtitle="Source: CallRail — Organic Channel"
      icon={<Phone size={15} className="text-green-600" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Leads Over Time</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Calls" fill="#EE7023" radius={[3, 3, 0, 0]} />
                <Bar dataKey="Forms" fill="#8A2685" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats + top keywords */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Stats</p>
            {[
              { label: 'Total Calls',   value: data.totalCalls },
              { label: 'Answer Rate',   value: `${data.answeredRate}%` },
              { label: 'Avg. Duration', value: data.avgDuration },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 text-xs">
                <span className="text-gray-500 font-medium">{label}</span>
                <span className="font-black text-brand-navy">{value}</span>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Keywords</p>
            {data.topKeywords.map((kw, i) => (
              <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0 text-xs">
                <span className="text-gray-600 truncate max-w-[140px] font-medium" title={kw.keyword}>
                  {kw.keyword}
                </span>
                <span className="font-black text-brand-navy shrink-0 ml-2">{kw.calls}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent calls */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Recent Calls</p>
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-xs data-table">
            <thead>
              <tr className="bg-gray-50">
                {['Status', 'Number', 'Duration', 'Keyword', 'Qualified'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.recentCalls.map((call, i) => {
                const { Icon, color, bg } = statusIcon[call.status]
                return (
                  <tr key={i} className="hover:bg-brand-orange/5 transition-colors">
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${bg} ${color}`}>
                        <Icon size={10} />
                        {call.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-medium text-gray-700">{call.callerNumber}</td>
                    <td className="px-3 py-2.5 font-medium text-gray-700">{call.duration}</td>
                    <td className="px-3 py-2.5 text-gray-500 max-w-[180px] truncate" title={call.keyword ?? ''}>
                      {call.keyword ?? <span className="text-gray-300 italic">not provided</span>}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold text-[11px] ${call.qualified ? 'text-green-600' : 'text-gray-400'}`}>
                        {call.qualified ? '✓ Yes' : '— No'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  )
}
