'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useDemoStore } from '@/lib/demo-state';
import { getPersona } from '@/lib/personas';
import DiscrepancyCard from '@/components/discrepancy-card';
import DashboardNav from '@/components/dashboard-nav';

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { activePersonaId } = useDemoStore();
  const persona = getPersona(activePersonaId);

  const paths = [
    {
      key: 'silent',
      href: '/action/silent',
      icon: '🗄️',
      style: 'bg-slate-50 border-slate-200 text-slate-700',
    },
    {
      key: 'notice',
      href: '/action/notice',
      icon: '📨',
      style: 'bg-amber-50 border-amber-300 text-amber-900',
    },
    {
      key: 'lawyer',
      href: '/action/lawyer',
      icon: '⚖️',
      style: 'bg-primary text-white border-primary',
    },
  ] as const;

  return (
    <div>
      <DashboardNav />
      <div className="px-4 py-6 max-w-md mx-auto flex flex-col gap-5">
        {/* AHA MOMENT CARD */}
        <DiscrepancyCard persona={persona} />

        {/* Action paths */}
        <div>
          <div className="text-sm font-semibold text-slate-700 mb-3">{t('actionTitle')}</div>
          <div className="flex flex-col gap-3">
            {paths.map((path) => (
              <Link
                key={path.key}
                href={path.href}
                className={`flex items-center gap-3 rounded-xl border-2 px-4 py-4 font-medium text-sm transition-all hover:shadow-md ${path.style}`}
              >
                <span className="text-xl">{path.icon}</span>
                <span>{t(`path.${path.key}`)}</span>
                <span className="ml-auto opacity-60">→</span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/dashboard/breakdown"
          className="text-center text-sm text-slate-500 hover:text-primary transition-colors"
        >
          {t('seeDetails')} ↓
        </Link>
      </div>
    </div>
  );
}
