'use client'

import { Search, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { KeywordsData } from '@/lib/types'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell,
} from 'recharts'

interface Props { data: KeywordsData }

function posColor(pos: number) {
  if (pos <= 3) return 'text-green-600 bg-green-50'
  if (pos <= 10) return 'text-brand-orange bg-orange-50'
  if (pos <= 20) return 'text-brand-coral bg-red-50'
  return 'text-gray-500 bg-gray-100'
}

function diffColor(diff: number) {
  if (diff <= 30) return 'text-green-600'
  if (diff <= 60) return 'text-brand-orange'
  return 'text-brand-coral'
}

export default function KeywordsSection({ data }: Props) {
  const intentBadge: Record<string, string> = {
    commercial:    'bg-brand-orange/10 text-brand-orange',
    transactional: 'bg-green-100 text-green-700',
    informational: 'bg-blue-100 text-blue-700',
    navigational:  'bg-gray-100 text-gray-600',
  }

  return (
    <SectionWrapper
      title="Keyword Rankings"
      subtitle="Source: Ahrefs — Tracked Keywords"
      icon={<Search size={15} className="text-brand-coral" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Position distribution */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Position Distribution</p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.positionBuckets} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e5e7eb' }}
                  formatter={(v: number) => [`${v} keywords`, 'Count']}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.positionBuckets.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary stats */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Summary</p>
          {[
            { label: 'Avg. Position',      value: `#${data.avgPosition}`,       sub: `was #${data.prevAvgPosition}` },
            { label: 'Visibility Score',   value: `${data.visibilityScore}%`,   sub: `was ${data.prevVisibilityScore}%` },
            { label: 'Keywords Top 3',     value: data.positionBuckets[0].count, sub: 'positions' },
            { label: 'Keywords Top 10',    value: data.positionBuckets[0].count + data.positionBuckets[1].count, sub: 'positions' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-xs text-gray-500 font-medium">{label}</span>
              <div className="text-right">
                <span className="text-sm font-black text-brand-navy">{value}</span>
                <span className="text-xs text-gray-400 ml-1.5">{sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Top movers */}
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Top Movers</p>
          <div className="space-y-2">
            {data.topMovers.slice(0, 5).map((kw, i) => {
              const diff = (kw.prevPosition ?? kw.position) - kw.position
              return (
                <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-gray-50 last:border-0">
                  <span className="text-gray-700 font-medium truncate max-w-[140px]" title={kw.keyword}>
                    {kw.keyword}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`font-black px-1.5 py-0.5 rounded text-[11px] ${posColor(kw.position)}`}>
                      #{kw.position}
                    </span>
                    <span className="text-green-600 font-bold flex items-center gap-0.5">
                      <ArrowUpRight size={11} />+{diff}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Full keyword table */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">All Tracked Keywords</p>
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="w-full text-xs data-table">
            <thead>
              <tr className="bg-gray-50">
                {['Keyword', 'Position', 'Change', 'Volume', 'Difficulty', 'Intent'].map((h) => (
                  <th key={h} className="text-left px-3 py-2.5 text-gray-400 font-bold uppercase tracking-wider text-[10px] whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.tracked.map((kw, i) => {
                const change = kw.prevPosition !== null ? kw.prevPosition - kw.position : 0
                return (
                  <tr key={i} className="hover:bg-brand-orange/5 transition-colors">
                    <td className="px-3 py-2.5 font-semibold text-brand-navy max-w-[220px] truncate" title={kw.keyword}>
                      {kw.keyword}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`font-black px-1.5 py-0.5 rounded text-[11px] ${posColor(kw.position)}`}>
                        #{kw.position}
                      </span>
                    </td>
                    <td className="px-3 py-2.5">
                      {change > 0 ? (
                        <span className="text-green-600 font-bold flex items-center gap-0.5 w-fit">
                          <ArrowUpRight size={11} />+{change}
                        </span>
                      ) : change < 0 ? (
                        <span className="text-red-500 font-bold flex items-center gap-0.5 w-fit">
                          <ArrowDownRight size={11} />{change}
                        </span>
                      ) : (
                        <span className="text-gray-400 flex items-center gap-0.5 w-fit">
                          <Minus size={11} />0
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 font-semibold text-gray-700">{kw.volume.toLocaleString()}</td>
                    <td className="px-3 py-2.5">
                      <span className={`font-bold ${diffColor(kw.difficulty)}`}>{kw.difficulty}</span>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${intentBadge[kw.intent]}`}>
                        {kw.intent}
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
