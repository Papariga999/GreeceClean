'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useDemoStore, type PersonaId } from '@/lib/demo-state';
import { PERSONAS, getAvatarUrl } from '@/lib/personas';
import Image from 'next/image';

export default function PersonaSwitcher() {
  const t = useTranslations('demo');
  const tSectors = useTranslations('sectors');
  const { activePersonaId, setPersona } = useDemoStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const active = PERSONAS.find((p) => p.id === activePersonaId) ?? PERSONAS[0];

  function handleSelect(id: PersonaId) {
    setLoading(true);
    setPersona(id);
    setOpen(false);
    setTimeout(() => {
      router.push('/dashboard');
      setLoading(false);
    }, 800);
  }

  return (
    <>
      {/* Floating pill */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-8 right-4 z-40 flex items-center gap-2 bg-white border border-slate-200 shadow-md rounded-full px-3 py-1.5 text-xs font-medium text-slate-700 hover:shadow-lg transition-shadow"
      >
        <Image
          src={getAvatarUrl(active.avatarSeed)}
          alt={active.displayName}
          width={24}
          height={24}
          className="rounded-full bg-slate-100"
        />
        <span className="hidden sm:inline">{active.displayName}</span>
        <span className="text-slate-400">▾</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 animate-in slide-in-from-bottom-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-900">{t('switchPersona')}</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700 text-xl leading-none">×</button>
            </div>
            <div className="grid gap-3">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p.id as PersonaId)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                    p.id === activePersonaId
                      ? 'border-primary bg-blue-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Image
                    src={getAvatarUrl(p.avatarSeed)}
                    alt={p.displayName}
                    width={40}
                    height={40}
                    className="rounded-full bg-slate-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-slate-900 text-sm">{p.displayName}, {p.age}</div>
                    <div className="text-xs text-slate-500">{tSectors(p.sector as Parameters<typeof tSectors>[0])} · {p.location}</div>
                    <div className="text-xs font-semibold text-amber-600 mt-0.5">
                      €{p.totalUnpaidEUR.toLocaleString('el-GR', { minimumFractionDigits: 2 })} unpaid
                    </div>
                  </div>
                  {p.manipulationFlags.length > 0 && (
                    <span className="ml-auto shrink-0 text-xs bg-red-100 text-red-700 rounded-full px-2 py-0.5">⚠ Manip.</span>
                  )}
                </button>
              ))}
            </div>
            {loading && (
              <div className="mt-4 text-center text-sm text-slate-500">Loading persona…</div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
