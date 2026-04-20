'use client'

import { ChevronDown, FileDown, Check } from 'lucide-react'
import { Client } from '@/lib/types'

interface HeaderProps {
  clients: Client[]
  selectedClientId: string
  onClientChange: (id: string) => void
  from: string
  to: string
  onFromChange: (v: string) => void
  onToChange: (v: string) => void
}

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export default function Header({
  clients, selectedClientId, onClientChange,
  from, to, onFromChange, onToChange,
}: HeaderProps) {
  const selected = clients.find((c) => c.id === selectedClientId) ?? clients[0]

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-brand-navy border-b border-white/10 shrink-0">
      {/* Left: branding */}
      <div className="flex flex-col">
        <span className="text-white/50 text-[10px] font-semibold tracking-widest uppercase">
          Client Dashboard Report
        </span>
        <span className="text-white/30 text-[9px] tracking-wider uppercase mt-0.5">
          Multi-Platform SEO Analytics
        </span>
        {/* Logo text */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-white font-black italic text-base leading-none tracking-tight">abogados</span>
          <span className="gradient-text font-black text-base leading-none tracking-tight">NOW</span>
        </div>
        <span className="text-white/30 text-[8px] tracking-[0.18em] uppercase mt-0.5">
          Bilingual Legal Marketing Experts
        </span>
      </div>

      {/* Right: controls */}
      <div className="flex items-center gap-3">
        {/* Export button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-brand-coral/60 text-brand-coral text-xs font-semibold hover:bg-brand-coral/10 transition-colors">
          <FileDown size={13} />
          PPTX
        </button>

        {/* Client selector */}
        <div className="relative">
          <select
            value={selectedClientId}
            onChange={(e) => onClientChange(e.target.value)}
            className="appearance-none bg-white/10 text-white text-sm font-semibold pl-3 pr-8 py-1.5 rounded-md border border-white/20 hover:border-white/40 cursor-pointer focus:outline-none focus:border-brand-orange transition-colors min-w-[160px]"
          >
            {clients.map((c) => (
              <option key={c.id} value={c.id} className="bg-brand-navy text-white">
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
        </div>

        {/* Date range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            className="bg-white/10 text-white text-sm px-2 py-1.5 rounded-md border border-white/20 hover:border-white/40 focus:outline-none focus:border-brand-orange transition-colors cursor-pointer"
          />
          <span className="text-white/40 text-sm">→</span>
          <input
            type="date"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            className="bg-white/10 text-white text-sm px-2 py-1.5 rounded-md border border-white/20 hover:border-white/40 focus:outline-none focus:border-brand-orange transition-colors cursor-pointer"
          />
        </div>

        {/* Apply button */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 hover:bg-green-400 transition-colors">
          <Check size={15} className="text-white" strokeWidth={3} />
        </button>
      </div>
    </header>
  )
}
