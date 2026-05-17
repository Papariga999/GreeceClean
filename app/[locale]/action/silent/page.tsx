'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function SilentPage() {
  const t = useTranslations('action.silent');
  const tDemo = useTranslations('demo');
  const [showStripe, setShowStripe] = useState(false);
  const [upgraded, setUpgraded] = useState(false);

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">← Back</Link>

        <div className="rounded-2xl bg-green-50 border border-green-200 p-6 mb-6">
          <div className="text-3xl mb-3">🗄️</div>
          <h1 className="font-display font-bold text-xl text-slate-900 mb-3">{t('title')}</h1>
          <p className="text-slate-600 text-sm">{t('confirmed')}</p>
        </div>

        {!upgraded ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <div className="text-sm text-amber-800 mb-3">⭐ {t('premium')}</div>
            <button
              onClick={() => setShowStripe(true)}
              className="w-full bg-amber-500 text-white rounded-xl py-3 font-semibold text-sm hover:bg-amber-600 transition-colors"
            >
              {t('upgradeCta')}
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-center text-green-700 font-semibold">
            ✓ Premium activated (Demo)
          </div>
        )}
      </div>

      {showStripe && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h2 className="font-bold text-lg mb-1">{tDemo('stripeTitle')}</h2>
            <p className="text-xs text-amber-600 mb-5">⚠ {tDemo('noRealPayment')}</p>
            <div className="rounded-xl border border-slate-200 p-4 mb-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Premium — 1 Monat</span><span className="font-bold">€4,99</span></div>
              <div className="border-t pt-2 flex justify-between font-bold text-slate-900"><span>Total</span><span>€4,99</span></div>
            </div>
            <button
              onClick={() => { setShowStripe(false); setUpgraded(true); }}
              className="w-full bg-primary text-white rounded-xl py-3 font-semibold mb-3"
            >
              {tDemo('confirmPayment')}
            </button>
            <button onClick={() => setShowStripe(false)} className="w-full text-slate-400 text-sm hover:text-slate-600">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
