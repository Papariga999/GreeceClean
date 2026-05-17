'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function DemoBanner() {
  const t = useTranslations('demo');
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-400 text-amber-900 text-xs font-semibold py-1.5 px-4 flex items-center justify-center gap-4 flex-wrap">
      <span>{t('banner')}</span>
      <Link
        href="/lawyer/dashboard"
        className="underline hover:no-underline"
      >
        {t('lawyerView')}
      </Link>
      <Link
        href="/demo/reset"
        className="underline hover:no-underline opacity-70 hover:opacity-100"
      >
        {t('reset')}
      </Link>
    </div>
  );
}
