'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

export default function ConnectPage() {
  const t = useTranslations('onboarding.connect');
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'connecting' | 'done'>('idle');

  function handleConnect() {
    setState('connecting');
    setTimeout(() => {
      setState('done');
      setTimeout(() => router.push('/onboarding/payslips'), 1000);
    }, 2000);
  }

  return (
    <div className="min-h-screen pt-16 px-4 flex flex-col items-center justify-center">
      <div className="max-w-sm w-full text-center">
        {/* Government-styled icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-700 flex items-center justify-center shadow-lg">
          <span className="text-3xl">🏛️</span>
        </div>
        <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">{t('title')}</h1>
        <p className="text-slate-500 text-sm mb-2">{t('desc')}</p>
        <p className="text-xs text-slate-400 mb-8">🔒 {t('privacy')}</p>

        {state === 'idle' && (
          <button
            onClick={handleConnect}
            className="w-full bg-blue-700 text-white rounded-xl py-4 font-semibold text-base hover:bg-blue-800 transition-colors shadow-md"
          >
            {t('button')}
          </button>
        )}

        {state === 'connecting' && (
          <div className="w-full bg-blue-100 text-blue-700 rounded-xl py-4 font-semibold text-base flex items-center justify-center gap-3">
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            {t('connecting')}
          </div>
        )}

        {state === 'done' && (
          <div className="w-full bg-green-50 text-green-700 border border-green-200 rounded-xl py-4 font-semibold text-base flex items-center justify-center gap-2">
            <span>✓</span> {t('success')}
          </div>
        )}
      </div>
    </div>
  );
}
