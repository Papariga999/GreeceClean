'use client';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

const DEMO_MONTHS = ['Ιανουάριος 2026', 'Φεβρουάριος 2026', 'Μάρτιος 2026', 'Απρίλιος 2026', 'Μάιος 2026', 'Ιούνιος 2026'];

export default function PayslipsPage() {
  const t = useTranslations('onboarding.payslips');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    alert(t('demoToast'));
  }

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-md mx-auto py-8">
        <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">{t('title')}</h1>
        <p className="text-slate-500 text-sm mb-6">{t('desc')}</p>

        {/* Drop zone */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center text-sm text-slate-400 mb-6 cursor-pointer hover:border-primary hover:text-primary transition-colors"
        >
          📂 {t('dragDrop')}
        </div>

        {/* Pre-loaded demo slips */}
        <div className="flex flex-col gap-3 mb-8">
          {DEMO_MONTHS.map((month) => (
            <div
              key={month}
              className="flex items-center justify-between p-3 rounded-xl bg-green-50 border border-green-200"
            >
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <span className="text-green-600">✓</span>
                <span className="font-medium">{month}</span>
              </div>
              <span className="text-xs text-green-600 font-semibold">PDF</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/onboarding/analyzing')}
          className="w-full bg-primary text-white rounded-xl py-4 font-semibold text-base hover:bg-blue-900 transition-colors"
        >
          {tCommon('continue')} →
        </button>
      </div>
    </div>
  );
}
