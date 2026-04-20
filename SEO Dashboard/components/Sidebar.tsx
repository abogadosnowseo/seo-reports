'use client'

import { LayoutDashboard, TrendingUp, Search, Phone, Link, Settings, HelpCircle } from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', active: true },
  { icon: TrendingUp,      label: 'Traffic'  },
  { icon: Search,          label: 'Keywords' },
  { icon: Phone,           label: 'Leads'    },
  { icon: Link,            label: 'Backlinks'},
]

const bottomItems = [
  { icon: Settings,    label: 'Settings' },
  { icon: HelpCircle,  label: 'Help'     },
]

export default function Sidebar() {
  return (
    <aside className="w-14 flex flex-col items-center py-4 bg-brand-navyDark border-r border-white/10 shrink-0">
      <div className="flex flex-col items-center gap-1 flex-1">
        {navItems.map(({ icon: Icon, label, active }) => (
          <button
            key={label}
            title={label}
            className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
              active
                ? 'bg-brand-orange/20 text-brand-orange'
                : 'text-white/30 hover:text-white/70 hover:bg-white/5'
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1">
        {bottomItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            className="w-10 h-10 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </aside>
  )
}
