'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDemoStore } from '@/lib/demo-state';
import { getPersona } from '@/lib/personas';
import DashboardNav from '@/components/dashboard-nav';

const MONTHS_EL = ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος'];

export default function EvidencePage() {
  const t = useTranslations('evidence');
  const tCommon = useTranslations('common');
  const { activePersonaId } = useDemoStore();
  const persona = getPersona(activePersonaId);
  const [preview, setPreview] = useState<string | null>(null);

  const months = MONTHS_EL.slice(0, persona.monthsAnalyzed);

  return (
    <div>
      <DashboardNav />
      <div className="px-4 py-6 max-w-md mx-auto">
        <h1 className="font-display font-bold text-xl text-slate-900 mb-5">{t('title')}</h1>
        <div className="flex flex-col gap-3">
          {months.map((month, i) => {
            const day = 28 + (i % 3);
            const dateStr = `${day}.0${i + 1}.2026`;
            return (
              <div
                key={month}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div>
                  <div className="font-medium text-slate-900 text-sm">
                    Beweis-Protokoll {month} 2026
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t('signed')}: {dateStr}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreview(month)}
                    className="text-xs text-primary underline hover:no-underline"
                  >
                    {t('preview')}
                  </button>
                  <button className="text-xs bg-slate-100 text-slate-600 rounded-lg px-2 py-1 hover:bg-slate-200 transition-colors">
                    {t('download')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {preview && (
        <PdfModal
          month={preview}
          persona={persona}
          onClose={() => setPreview(null)}
          t={t}
          tCommon={tCommon}
        />
      )}
    </div>
  );
}

function PdfModal({
  month,
  persona,
  onClose,
  t,
  tCommon,
}: {
  month: string;
  persona: ReturnType<typeof getPersona>;
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
  tCommon: ReturnType<typeof useTranslations>;
}) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border-2 border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="text-6xl font-black text-red-500 rotate-[-20deg]">DEMO</div>
          </div>
          <div className="text-center mb-3 font-bold text-sm text-primary">KARTA-CHECK</div>
          <div className="text-center text-xs text-slate-500 mb-4">Beweis-Protokoll — {month} 2026</div>
          <div className="border-t border-slate-200 pt-3 space-y-1.5">
            <div><span className="text-slate-500">Arbeitnehmer:</span> {persona.displayName}</div>
            <div><span className="text-slate-500">Arbeitgeber:</span> {persona.employer}</div>
            <div><span className="text-slate-500">Vertragl. Stunden:</span> {persona.contractedHoursPerWeek}h/Woche</div>
            <div><span className="text-slate-500">Diskrepanz:</span> <span className="text-destructive font-bold">aufgedeckt</span></div>
          </div>
          <div className="border-t border-slate-200 mt-3 pt-2 text-center text-xs text-slate-400">
            {t('demoWatermark')}
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full text-center text-sm text-slate-500 hover:text-slate-800"
        >
          {tCommon('close')}
        </button>
      </div>
    </div>
  );
}
