'use client';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

const TABS = [
  { key: 'dashboard', href: '/dashboard' },
  { key: 'breakdown', href: '/dashboard/breakdown' },
  { key: 'evidence', href: '/dashboard/evidence' },
  { key: 'trust', href: '/dashboard/trust' },
] as const;

export default function DashboardNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav className="flex border-b border-slate-200 bg-white overflow-x-auto sticky top-9 z-30">
      {TABS.map((tab) => {
        const active = pathname === tab.href || (tab.href === '/dashboard' && pathname === '/dashboard');
        return (
          <Link
            key={tab.key}
            href={tab.href}
            className={`flex-1 text-center text-xs font-semibold py-3 px-2 border-b-2 whitespace-nowrap transition-colors ${
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {t(tab.key)}
          </Link>
        );
      })}
    </nav>
  );
}
