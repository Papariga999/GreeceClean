'use client'

import { useState, type ReactNode } from 'react'

type Tab = 'reports' | 'municipalities'

export default function DashboardTabs({
  reportsTab,
  municipalitiesTab,
  pendingCount,
  municipalityCount,
}: {
  reportsTab: ReactNode
  municipalitiesTab: ReactNode
  pendingCount: number
  municipalityCount: number
}) {
  const [active, setActive] = useState<Tab>('reports')

  return (
    <>
      {/* Tab bar */}
      <div className="flex gap-1 mb-8 bg-white rounded-2xl p-1 border border-gray-200 w-fit">
        <button
          onClick={() => setActive('reports')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            active === 'reports'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Αναφορές
          {pendingCount > 0 && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              active === 'reports' ? 'bg-white/20 text-white' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActive('municipalities')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            active === 'municipalities'
              ? 'bg-primary text-white shadow-sm'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          Δήμοι & Email
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
            active === 'municipalities' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
          }`}>
            {municipalityCount}
          </span>
        </button>
      </div>

      {/* Tab content */}
      <div className={active === 'reports' ? '' : 'hidden'}>{reportsTab}</div>
      <div className={active === 'municipalities' ? '' : 'hidden'}>{municipalitiesTab}</div>
    </>
  )
}
