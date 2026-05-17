'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useDemoStore } from '@/lib/demo-state';

export default function DemoResetPage() {
  const t = useTranslations('demo');
  const { reset } = useDemoStore();
  const router = useRouter();

  useEffect(() => {
    reset();
    const timer = setTimeout(() => router.push('/'), 1500);
    return () => clearTimeout(timer);
  }, [reset, router]);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-4xl mb-4">🔄</div>
        <div className="font-semibold text-slate-800 mb-2">{t('reset')}</div>
        <div className="text-sm text-slate-500">{t('resetDesc')}</div>
      </div>
    </div>
  );
}
