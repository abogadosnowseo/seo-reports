import { KPIData } from '@/lib/types'
import {
  TrendingUp, Users, Award, Search, Phone, Shield, Link,
  ArrowUpRight, ArrowDownRight, Minus,
} from 'lucide-react'

const ICONS: Record<string, React.ElementType> = {
  TrendingUp, Users, Award, Search, Phone, Shield, Link,
}

const COLOR_MAP: Record<string, { dot: string; text: string; bg: string }> = {
  orange: { dot: 'bg-brand-orange', text: 'text-brand-orange', bg: 'bg-brand-orange/10' },
  coral:  { dot: 'bg-brand-coral',  text: 'text-brand-coral',  bg: 'bg-brand-coral/10'  },
  purple: { dot: 'bg-brand-purple', text: 'text-brand-purple', bg: 'bg-brand-purple/10' },
  navy:   { dot: 'bg-brand-navy',   text: 'text-brand-navy',   bg: 'bg-brand-navy/10'   },
  green:  { dot: 'bg-green-500',    text: 'text-green-600',    bg: 'bg-green-50'         },
}

interface Props { kpi: KPIData }

export default function KPICard({ kpi }: Props) {
  const Icon = ICONS[kpi.icon] ?? TrendingUp
  const colors = COLOR_MAP[kpi.color] ?? COLOR_MAP.orange
  const isPos = kpi.change > 0
  const isNeg = kpi.change < 0
  const ChangeIcon = isPos ? ArrowUpRight : isNeg ? ArrowDownRight : Minus
  const changeColor = isPos ? 'text-green-600' : isNeg ? 'text-red-500' : 'text-gray-400'

  return (
    <div className="kpi-card relative bg-white rounded-xl p-4 transition-all duration-200 border border-gray-100 shadow-sm">
      {/* Colored dot indicator top-right */}
      <span className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${colors.dot}`} />

      {/* Icon */}
      <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${colors.bg} mb-3`}>
        <Icon size={17} className={colors.text} />
      </div>

      {/* Label */}
      <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
        {kpi.label}
      </p>

      {/* Value */}
      <p className="text-2xl font-black text-brand-navy leading-none mb-1">
        {kpi.format === 'rank' ? `#${kpi.value}` : kpi.value}
      </p>

      {/* Change */}
      <div className={`flex items-center gap-0.5 text-xs font-bold ${changeColor} mb-3`}>
        <ChangeIcon size={13} strokeWidth={2.5} />
        <span>{isPos ? '+' : ''}{kpi.change}%</span>
        <span className="text-gray-400 font-normal ml-1">vs prev. period</span>
      </div>

      {/* Breakdown */}
      {(kpi.breakdownA || kpi.breakdownB) && (
        <div className="flex items-center gap-3 text-[11px] text-gray-500 border-t border-gray-100 pt-2.5 mt-auto">
          {kpi.breakdownA && (
            <span>
              <span className="text-gray-400">{kpi.breakdownA.label}</span>{' '}
              <span className="font-bold text-brand-navy">{kpi.breakdownA.value}</span>
            </span>
          )}
          {kpi.breakdownA && kpi.breakdownB && kpi.breakdownB.label && (
            <span className="text-gray-200">•</span>
          )}
          {kpi.breakdownB && kpi.breakdownB.label && (
            <span>
              <span className="text-gray-400">{kpi.breakdownB.label}</span>{' '}
              <span className="font-bold text-brand-navy">{kpi.breakdownB.value}</span>
            </span>
          )}
        </div>
      )}
    </div>
  )
}
