'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { PERSONAS, getAvatarUrl } from '@/lib/personas';
import Image from 'next/image';

export default function LawyerDashboardPage() {
  const t = useTranslations('lawyer.dashboard');
  const [accepted, setAccepted] = useState<Set<string>>(new Set());

  // Show all four personas as incoming cases
  const cases = PERSONAS.map((p) => ({
    ...p,
    recommendedAction:
      p.manipulationFlags.length > 0
        ? 'File for manipulation + wage theft'
        : p.winProbability >= 0.7
        ? 'Direct legal claim'
        : p.winProbability >= 0.5
        ? 'Send formal notice first'
        : 'Advise monitoring only',
  }));

  return (
    <div className="min-h-screen pt-14 px-4">
      <div className="max-w-2xl mx-auto py-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">⚖</div>
          <div>
            <h1 className="font-display font-bold text-xl text-slate-900">{t('title')}</h1>
            <p className="text-xs text-slate-500">Karta-Check — Lawyer Demo View</p>
          </div>
          <Link href="/dashboard" className="ml-auto text-xs text-slate-400 hover:text-slate-600">← User View</Link>
        </div>

        <div className="flex flex-col gap-4">
          {cases.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <Image
                    src={getAvatarUrl(c.avatarSeed)}
                    alt={c.displayName}
                    width={44}
                    height={44}
                    className="rounded-full bg-slate-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900">{c.displayName}, {c.age}</div>
                    <div className="text-xs text-slate-500">{c.employer} · {c.location}</div>
                  </div>
                  {c.manipulationFlags.length > 0 && (
                    <span className="text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5 shrink-0">⚠ Manipulation</span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <Stat label={t('winProb')} value={`${Math.round(c.winProbability * 100)}%`} color={c.winProbability >= 0.7 ? 'text-success' : c.winProbability >= 0.5 ? 'text-warning' : 'text-destructive'} />
                  <Stat label={t('compensation')} value={`€${c.totalUnpaidEUR.toLocaleString('el-GR', { maximumFractionDigits: 0 })}`} color="text-amber-600" />
                  <Stat label="Trust score" value={`${c.trustScore}/100`} color={c.trustScore >= 75 ? 'text-success' : c.trustScore >= 50 ? 'text-warning' : 'text-destructive'} />
                </div>

                <div className="rounded-xl bg-blue-50 border border-blue-100 px-3 py-2 text-xs text-blue-800 mb-4">
                  <span className="font-semibold">Recommended: </span>{c.recommendedAction}
                </div>

                {accepted.has(c.id) ? (
                  <div className="text-center text-sm text-success font-semibold py-2">✓ Case accepted</div>
                ) : (
                  <button
                    onClick={() => setAccepted((s) => new Set([...s, c.id]))}
                    className="w-full bg-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-900 transition-colors"
                  >
                    {t('accept')}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-3 text-center">
      <div className={`font-bold text-base ${color}`}>{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}
