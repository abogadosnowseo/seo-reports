'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  title: string
  subtitle?: string
  icon?: React.ReactNode
  defaultOpen?: boolean
  children: React.ReactNode
}

export default function SectionWrapper({ title, subtitle, icon, defaultOpen = true, children }: Props) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="section-card gradient-border-top">
      {/* Section header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-orange/20 to-brand-purple/20">
              {icon}
            </div>
          )}
          <div className="text-left">
            <h3 className="text-sm font-black text-brand-navy uppercase tracking-widest">{title}</h3>
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <ChevronDown
          size={16}
          className={clsx('text-gray-400 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {/* Content */}
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  )
}
