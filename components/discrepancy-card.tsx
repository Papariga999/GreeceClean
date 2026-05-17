'use client';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { formatPct } from '@/lib/utils';
import type { Persona } from '@/lib/personas';

type Props = { persona: Persona };

function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration]);

  return value;
}

export default function DiscrepancyCard({ persona }: Props) {
  const t = useTranslations('dashboard');
  const displayValue = useCountUp(persona.totalUnpaidEUR);

  const formatted = new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(displayValue);

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md">
      <div className="text-sm font-medium text-slate-600 mb-1">{t('youAreOwed')}</div>
      <div
        className="font-display font-bold text-5xl text-amber-600 font-tabular tracking-tight leading-none mb-2"
        aria-live="polite"
      >
        {formatted}
      </div>
      <div className="text-xs text-slate-500">
        {t('period', { months: persona.monthsAnalyzed })}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 bg-white rounded-xl border border-slate-200 px-3 py-2">
          <div className="text-xs text-slate-500 mb-1">{t('winProbability', { pct: formatPct(persona.winProbability) })}</div>
          <div className="w-full bg-slate-200 rounded-full h-1.5">
            <div
              className="bg-success h-1.5 rounded-full transition-all duration-1000"
              style={{ width: `${persona.winProbability * 100}%` }}
            />
          </div>
        </div>
        <TrustBadge score={persona.trustScore} evidenceQuality={persona.evidenceQuality} />
      </div>
    </div>
  );
}

function TrustBadge({ score, evidenceQuality }: { score: number; evidenceQuality: string }) {
  const t = useTranslations('dashboard');
  const isStrong = evidenceQuality === 'high' || evidenceQuality === 'high_with_manipulation';
  const color = score >= 75 ? 'text-success bg-green-50 border-green-200' : score >= 50 ? 'text-warning bg-yellow-50 border-yellow-200' : 'text-destructive bg-red-50 border-red-200';

  return (
    <div className={`rounded-xl border px-3 py-2 text-xs font-medium ${color}`}>
      <div>{t('evidenceStrength')}</div>
      <div className="font-bold">{isStrong ? t('strong') : score >= 50 ? t('moderate') : t('weak')}</div>
    </div>
  );
}
