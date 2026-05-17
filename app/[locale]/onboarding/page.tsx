'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useDemoStore, type PersonaId } from '@/lib/demo-state';
import { PERSONAS, getAvatarUrl } from '@/lib/personas';
import Image from 'next/image';

export default function OnboardingPage() {
  const t = useTranslations('onboarding');
  const tSectors = useTranslations('sectors');
  const { setPersona } = useDemoStore();
  const router = useRouter();

  function handleSelect(id: PersonaId) {
    setPersona(id);
    router.push('/onboarding/connect');
  }

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-md mx-auto py-8">
        <div className="mb-6 text-center">
          <h1 className="font-display font-bold text-2xl text-slate-900 mb-2">{t('choosePersona')}</h1>
          <p className="text-slate-500 text-sm">{t('personaDesc')}</p>
        </div>
        <div className="flex flex-col gap-4">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelect(p.id as PersonaId)}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-200 bg-white text-left hover:border-primary hover:shadow-md transition-all group"
            >
              <Image
                src={getAvatarUrl(p.avatarSeed)}
                alt={p.displayName}
                width={56}
                height={56}
                className="rounded-full bg-slate-100 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-slate-900">{p.displayName}, {p.age}</div>
                <div className="text-xs text-slate-500">{tSectors(p.sector as Parameters<typeof tSectors>[0])} · {p.location}</div>
                <div className="text-sm font-bold text-amber-600 mt-1">
                  €{p.totalUnpaidEUR.toLocaleString('el-GR', { minimumFractionDigits: 2 })} unpaid
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-end gap-1">
                {p.manipulationFlags.length > 0 && (
                  <span className="text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5">⚠ Manip.</span>
                )}
                <span className="text-xs text-slate-300 group-hover:text-primary transition-colors">→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
