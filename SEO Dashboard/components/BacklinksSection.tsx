'use client'

import { Link, ArrowUpRight } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { BacklinksData } from '@/lib/types'
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend,
} from 'recharts'

interface Props { data: BacklinksData }

function shortDate(iso: string) {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

function drColor(dr: number) {
  if (dr >= 70) return 'text-green-600 bg-green-50'
  if (dr >= 40) return 'text-brand-orange bg-orange-50'
  return 'text-gray-500 bg-gray-100'
}

const statusBadge: Record<string, string> = {
  new:    'bg-green-100 text-green-700',
  active: 'bg-blue-100 text-blue-700',
  lost:   'bg-red-100 text-red-500',
}

export default function BacklinksSection({ data }: Props) {
  const chartData = data.drHistory.map((d) => ({
    date: shortDate(d.date),
    'Domain Rating': d.dr,
    'Ref. Domains': d.refDomains,
  }))

  return (
    <SectionWrapper
      title="Backlinks & Authority"
      subtitle="Source: Ahrefs Site Explorer"
      icon={<Link size={15} className="text-brand-purple" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* DR History chart */}
        <div className="lg:col-span-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Domain Rating & Referring Domains History</p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="left"  tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="left"  type="monotone" dataKey="Domain Rating" stroke="#EE7023" strokeWidth={2.5} dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="Ref. Domains"  stroke="#8A2685" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Authority Stats</p>
          <div className="space-y-0">
            {[
              { label: 'Domain Rating',    value: `DR ${data.currentDR}`,                   sub: `was ${data.prevDR}` },
              { label: 'Total Backlinks',  value: data.totalBacklinks.toLocaleString(),       sub: `was ${data.prevTotalBacklinks.toLocaleString()}` },
              { label: 'Referring Domains',value: data.refDomains.toLocaleString(),           sub: `was ${data.prevRefDomains.toLocaleString()}` },
              { label: 'New Ref. Domains', value: `+${data.newRefDomains}`,                  sub: 'this period', valueClass: 'text-green-600' },
              { label: 'Lost Ref. Domains',value: `-${data.lostRefDomains}`,                 sub: 'this period', valueClass: 'text-red-500' },
            ].map(({ label, value, sub, valueClass }) => (
              <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0 text-xs">
                <span className="text-gray-500 font-medium">{label}</span>
                <div className="text-right">
                  <span className={`font-black ${valueClass ?? 'text-brand-navy'}`}>{value}</span>
                  <span className="text-gray-400 ml-1.5">{sub}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top referring domains table */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Referring Domains</p>
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-xs data-table">
            <thead>
              <tr className="bg-gray-50">
                {['Domain', 'DR', 'Links', 'First Seen', 'Status'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.topReferringDomains.map((rd, i) => (
                <tr key={i} className="hover:bg-brand-orange/5 transition-colors">
                  <td className="px-3 py-2.5 font-semibold text-brand-navy flex items-center gap-1">
                    {rd.domain}
                    <ArrowUpRight size={11} className="text-gray-400" />
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`font-black px-1.5 py-0.5 rounded text-[11px] ${drColor(rd.dr)}`}>
                      {rd.dr}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-gray-700">{rd.links}</td>
                  <td className="px-3 py-2.5 text-gray-500">{rd.firstSeen}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusBadge[rd.status]}`}>
                      {rd.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionWrapper>
  )
}
