'use client';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const labels: Record<string, string> = { el: 'ΕΛ', en: 'EN', sq: 'SQ' };

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-4 right-4 z-40 flex gap-1 bg-white border border-slate-200 rounded-full shadow-md px-2 py-1">
      {routing.locales.map((l) => (
        <button
          key={l}
          onClick={() => router.replace(pathname, { locale: l })}
          className={`text-xs font-semibold px-2 py-1 rounded-full transition-colors ${
            l === locale
              ? 'bg-primary text-white'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
