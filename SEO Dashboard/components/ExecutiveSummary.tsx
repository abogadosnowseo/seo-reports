import { ExecutiveSummaryData } from '@/lib/types'
import { Sparkles } from 'lucide-react'

interface Props { data: ExecutiveSummaryData }

export default function ExecutiveSummary({ data }: Props) {
  return (
    <div>
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={13} className="text-brand-orange" />
        <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">
          Executive Summary
        </span>
      </div>

      {/* Headline */}
      <h2 className="text-2xl font-black text-brand-navy mb-1">
        Hi, <span className="gradient-text">{data.clientName}</span>
      </h2>
      <p className="text-brand-navy/70 text-sm font-semibold mb-4">{data.headline}</p>

      {/* Body paragraphs */}
      <div className="space-y-2.5">
        {data.paragraphs.map((p, i) => (
          <p
            key={i}
            className="text-sm text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: p }}
          />
        ))}
      </div>
    </div>
  )
}
