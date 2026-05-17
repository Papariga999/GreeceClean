'use client';
import { useTranslations } from 'next-intl';
import { useDemoStore } from '@/lib/demo-state';
import { getPersona } from '@/lib/personas';
import DashboardNav from '@/components/dashboard-nav';
import TrustBadgeDetailed from '@/components/trust-badge';

export default function TrustPage() {
  const t = useTranslations('trust');
  const { activePersonaId } = useDemoStore();
  const persona = getPersona(activePersonaId);
  const hasManipulation = persona.manipulationFlags.length > 0;

  return (
    <div>
      <DashboardNav />
      <div className="px-4 py-6 max-w-md mx-auto flex flex-col gap-5">
        <h1 className="font-display font-bold text-xl text-slate-900">{t('title')}</h1>

        {/* Score badge */}
        <TrustBadgeDetailed score={persona.trustScore} flags={persona.manipulationFlags} />

        {/* Summary */}
        <div className={`rounded-2xl border p-5 ${hasManipulation ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <div className={`font-semibold mb-1 ${hasManipulation ? 'text-destructive' : 'text-success'}`}>
            {hasManipulation ? t('manipulated') : t('clean')}
          </div>
          <p className="text-sm text-slate-600">
            {!hasManipulation && t('cleanDesc')}
          </p>
        </div>

        {/* Checks */}
        <div className="flex flex-col gap-3">
          <CheckRow
            label={t('gpsCheck')}
            value={hasManipulation && persona.manipulationFlags.some(f => f.type === 'gps_mismatch')
              ? t('stampFlag')
              : t('gpsConsistent')}
            ok={!hasManipulation || !persona.manipulationFlags.some(f => f.type === 'gps_mismatch')}
          />
          <CheckRow
            label={t('stampPattern')}
            value={hasManipulation && persona.manipulationFlags.some(f => f.type === 'manager_stamping')
              ? t('stampFlag')
              : t('stampNatural')}
            ok={!hasManipulation || !persona.manipulationFlags.some(f => f.type === 'manager_stamping')}
          />
        </div>

        {/* Manipulation flags */}
        {persona.manipulationFlags.map((flag, i) => (
          <div key={i} className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-destructive font-bold text-sm">⚠</span>
              <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                flag.severity === 'high' ? 'bg-red-200 text-red-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {t(`severity.${flag.severity}` as Parameters<typeof t>[0])}
              </span>
              <span className="text-xs text-slate-500 ml-auto">{flag.evidenceCount} records</span>
            </div>
            <p className="text-sm text-slate-700">{flag.description}</p>
          </div>
        ))}

        {hasManipulation && (
          <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800 font-medium">
            ⚖️ {t('additionalGrounds')}
          </div>
        )}
      </div>
    </div>
  );
}

function CheckRow({ label, value, ok }: { label: string; value: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
      <span className="text-sm text-slate-600">{label}</span>
      <span className={`text-sm font-semibold flex items-center gap-1 ${ok ? 'text-success' : 'text-destructive'}`}>
        {ok ? '✓' : '✗'} {value}
      </span>
    </div>
  );
}
