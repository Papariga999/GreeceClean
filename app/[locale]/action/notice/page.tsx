'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoStore } from '@/lib/demo-state';
import { getPersona } from '@/lib/personas';

export default function NoticePage() {
  const t = useTranslations('action.notice');
  const tDemo = useTranslations('demo');
  const { activePersonaId } = useDemoStore();
  const persona = getPersona(activePersonaId);
  const [showStripe, setShowStripe] = useState(false);
  const [sent, setSent] = useState(false);

  const totalEUR = persona.totalUnpaidEUR.toLocaleString('el-GR', { minimumFractionDigits: 2 });

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">← Back</Link>

        <h1 className="font-display font-bold text-xl text-slate-900 mb-2">{t('title')}</h1>
        <p className="text-slate-500 text-sm mb-5">{t('desc')}</p>

        {/* Exodiko preview */}
        <div className="rounded-2xl border-2 border-slate-200 p-5 mb-5 font-mono text-xs text-slate-700 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="text-6xl font-black text-slate-800 rotate-[-15deg]">DEMO</div>
          </div>
          <div className="text-center font-bold text-sm mb-3 text-slate-900">ΕΞΩΔΙΚΗ ΔΗΛΩΣΗ — ΠΡΟΣΚΛΗΣΗ</div>
          <div className="space-y-2 text-slate-600">
            <div><strong>Προς:</strong> {persona.employer}</div>
            <div><strong>Από:</strong> {persona.displayName}</div>
            <div><strong>Θέμα:</strong> Αξίωση αδήλωτων ωρών εργασίας</div>
            <div className="border-t border-slate-200 pt-2 mt-2">
              <p>Σας γνωρίζω ότι κατά την απασχόλησή μου στην επιχείρησή σας για διάστημα{' '}
              {persona.monthsAnalyzed} μηνών, εργάσθηκα συνολικά {persona.actualHoursWorked} ώρες,
              ενώ αμείφθηκα μόνον για {persona.hoursPaid} ώρες.</p>
              <p className="mt-2">Διεκδικώ το ποσό των <strong>€{totalEUR}</strong> με βάση την ισχύουσα
              εργατική νομοθεσία (Ν. 4808/2021, Ν. 5239/2025).</p>
              <p className="mt-2">Καλείσθε να εξοφλήσετε την οφειλή εντός 15 ημερών.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
          <span className="text-sm text-slate-600">{t('title')}</span>
          <span className="font-bold text-slate-900">{t('price')}</span>
        </div>

        {sent ? (
          <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center text-green-700 font-semibold text-sm">
            ✓ {t('disclaimer')}
          </div>
        ) : (
          <button
            onClick={() => setShowStripe(true)}
            className="w-full bg-amber-500 text-white rounded-xl py-4 font-semibold hover:bg-amber-600 transition-colors"
          >
            {t('cta')} — {t('price')}
          </button>
        )}
      </div>

      {showStripe && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h2 className="font-bold text-lg mb-1">{tDemo('stripeTitle')}</h2>
            <p className="text-xs text-amber-600 mb-5">⚠ {tDemo('noRealPayment')}</p>
            <div className="rounded-xl border border-slate-200 p-4 mb-4 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between"><span>Εξώδικο — Karta-Check</span><span className="font-bold">€99,00</span></div>
              <div className="border-t pt-2 flex justify-between font-bold text-slate-900"><span>Σύνολο</span><span>€99,00</span></div>
            </div>
            <button
              onClick={() => { setShowStripe(false); setSent(true); }}
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
