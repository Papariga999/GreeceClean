'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export type LawyerData = {
  id: string;
  name: string;
  city: string;
  specialization: string;
  yearsExperience: number;
  successRate: number;
  rating: number;
  matchScore: number;
};

type Props = { lawyer: LawyerData };

export default function LawyerMatchCard({ lawyer }: Props) {
  const t = useTranslations('action.lawyer');
  const [sent, setSent] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md p-5">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <div className="font-semibold text-slate-900">{lawyer.name}</div>
          <div className="text-xs text-slate-500">{lawyer.specialization} · {lawyer.city}</div>
        </div>
        <div className="shrink-0 text-xs font-bold text-primary bg-blue-50 rounded-full px-2.5 py-1">
          {t('matchScore')}: {lawyer.matchScore}%
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center">
        <div className="bg-slate-50 rounded-xl p-2">
          <div className="font-bold text-slate-800">{lawyer.yearsExperience}</div>
          <div className="text-slate-500">{t('experience')}</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-2">
          <div className="font-bold text-slate-800">{lawyer.successRate}%</div>
          <div className="text-slate-500">{t('successRate')}</div>
        </div>
        <div className="bg-slate-50 rounded-xl p-2">
          <div className="font-bold text-slate-800">⭐ {lawyer.rating}</div>
          <div className="text-slate-500">{t('rating')}</div>
        </div>
      </div>
      {sent ? (
        <div className="text-center text-sm text-success font-medium py-2">✓ {t('sent')}</div>
      ) : (
        <button
          onClick={() => setSent(true)}
          className="w-full bg-primary text-white rounded-xl py-3 text-sm font-semibold hover:bg-blue-900 transition-colors"
        >
          {t('sendRequest')}
        </button>
      )}
    </div>
  );
}
