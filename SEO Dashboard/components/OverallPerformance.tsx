import { KPIData } from '@/lib/types'
import KPICard from './KPICard'

interface Props { kpis: KPIData[] }

export default function OverallPerformance({ kpis }: Props) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        {/* Gradient bar */}
        <div className="h-1 w-6 rounded-full bg-brand-gradient" />
        <h3 className="text-sm font-bold text-brand-navy uppercase tracking-widest">
          Overall Performance
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        {kpis.map((kpi) => (
          <KPICard key={kpi.label} kpi={kpi} />
        ))}
      </div>
    </div>
  )
}
