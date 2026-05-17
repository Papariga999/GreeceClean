'use client';
import { useTranslations } from 'next-intl';
import { useDemoStore } from '@/lib/demo-state';
import { getPersona } from '@/lib/personas';
import DashboardNav from '@/components/dashboard-nav';

const LEGAL_BASIS: Record<string, string> = {
  mehrarbeit: 'Art. 1 Ν. 3863/2010 (τροπ. Ν. 5053/2023)',
  legaleUeberstunden: 'Art. 4 Ν. 4808/2021',
  illegaleUeberstunden: 'Art. 4§5 Ν. 4808/2021 · Art. 7 Ν. 5239/2025',
  sechsterTag: 'Art. 11 Ν. 2874/2000 · Εγκ. 44/2017',
  sonntags: 'Art. 2 Ν. 435/1976 · ΠΔ 88/1999',
  nachtarbeit: 'Art. 1§4 Ν. 2112/1920 · Ν. 4808/2021',
};

export default function BreakdownPage() {
  const t = useTranslations('breakdown');
  const { activePersonaId } = useDemoStore();
  const persona = getPersona(activePersonaId);
  const breakdown = persona.breakdown;

  const total = Object.values(breakdown).reduce((s, v) => s + (v.amount ?? 0), 0);

  return (
    <div>
      <DashboardNav />
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-xl text-slate-900 mb-5">{t('title')}</h1>
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">{t('category')}</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-slate-600">{t('hours')}</th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-slate-600">{t('multiplier')}</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-600">{t('amount')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {Object.entries(breakdown).map(([key, val]) => {
                  if (val.amount === 0) return null;
                  const label = t(key as Parameters<typeof t>[0]);
                  const basis = LEGAL_BASIS[key] ?? '';
                  return (
                    <tr key={key} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800">{label}</div>
                        {basis && (
                          <div className="text-xs text-slate-400 mt-0.5">
                            {t('legalBasis')}: {basis}
                          </div>
                        )}
                        {val.note && (
                          <div className="text-xs text-amber-600 mt-0.5">⚠ {val.note}</div>
                        )}
                      </td>
                      <td className="text-right px-3 py-3 text-slate-700 font-tabular">{val.hours}h</td>
                      <td className="text-right px-3 py-3 text-slate-700 font-tabular">
                        +{Math.round((val.rateMultiplier - 1) * 100)}%
                      </td>
                      <td className="text-right px-4 py-3 font-semibold text-slate-900 font-tabular">
                        €{val.amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-primary text-white">
                <tr>
                  <td className="px-4 py-3 font-bold" colSpan={3}>{t('total')}</td>
                  <td className="text-right px-4 py-3 font-bold text-lg font-tabular">
                    €{total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">
          * {t('legalBasis')} βάσει ελληνικής εργατικής νομοθεσίας (2024–2025)
        </p>
      </div>
    </div>
  );
}
