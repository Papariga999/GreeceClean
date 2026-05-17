'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { ManipulationFlag } from '@/lib/personas';

type Props = {
  score: number;
  flags: ManipulationFlag[];
};

export default function TrustBadgeDetailed({ score, flags }: Props) {
  const t = useTranslations('trust');
  const [shaken, setShaken] = useState(false);

  useEffect(() => {
    if (flags.length > 0) {
      const timer = setTimeout(() => setShaken(true), 500);
      return () => clearTimeout(timer);
    }
  }, [flags.length]);

  const color =
    score >= 75
      ? { ring: 'ring-green-500', bg: 'bg-green-500', text: 'text-success' }
      : score >= 50
      ? { ring: 'ring-yellow-500', bg: 'bg-yellow-500', text: 'text-warning' }
      : { ring: 'ring-red-500', bg: 'bg-red-500', text: 'text-destructive' };

  return (
    <div className={`${shaken ? 'animate-shake' : ''}`}>
      <div
        className={`inline-flex items-center gap-2 ring-2 ${color.ring} rounded-2xl px-4 py-3`}
      >
        <div className="relative w-12 h-12 shrink-0">
          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke={score >= 75 ? '#15803d' : score >= 50 ? '#ca8a04' : '#b91c1c'}
              strokeWidth="3"
              strokeDasharray={`${score} ${100 - score}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
            {score}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium text-slate-500">{t('score')}</div>
          <div className={`font-bold text-sm ${color.text}`}>
            {score >= 75 ? t('clean') : t('manipulated')}
          </div>
        </div>
      </div>
    </div>
  );
}
