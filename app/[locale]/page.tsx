import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HeroCounter from '@/components/hero-counter';

export default function LandingPage() {
  const t = useTranslations('landing');
  const tDemo = useTranslations('demo');

  return (
    <div className="min-h-screen flex flex-col">
      <div className="pt-14 px-4 flex flex-col flex-1">
        {/* Hero */}
        <section className="flex flex-col items-center text-center pt-12 pb-8 gap-4">
          <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-semibold mb-2">
            <span>✓</span> {t('trustBadge')}
          </div>
          <h1 className="font-display font-bold text-4xl sm:text-5xl text-slate-900 leading-tight max-w-xs sm:max-w-md">
            {t('headline')}
          </h1>
          <p className="text-slate-500 text-lg">{t('subheadline')}</p>

          {/* Animated counter */}
          <div className="my-6">
            <div className="text-sm text-slate-500 mb-1 font-medium">{t('heroSubtext')}</div>
            <HeroCounter target={1847} prefix="€" />
          </div>

          <Link
            href="/onboarding"
            className="bg-primary text-white rounded-xl px-8 py-4 text-base font-semibold shadow-lg hover:bg-blue-900 transition-colors w-full max-w-xs"
          >
            {t('cta')} →
          </Link>
          <a
            href="#how-it-works"
            className="text-slate-400 text-sm hover:text-slate-600 transition-colors"
          >
            {t('howItWorks')} ↓
          </a>
        </section>

        {/* Trust logos */}
        <section className="flex flex-wrap justify-center gap-4 py-6 border-t border-slate-100">
          {['POEEM', 'GSEE', 'SEPE'].map((logo) => (
            <div
              key={logo}
              className="text-xs font-bold text-slate-400 border border-slate-200 rounded-lg px-3 py-2"
            >
              {logo}
            </div>
          ))}
        </section>

        {/* How it works */}
        <section id="how-it-works" className="pt-8 pb-12">
          <h2 className="text-center font-display font-bold text-2xl text-slate-900 mb-8">
            {t('howItWorks')}
          </h2>
          <div className="flex flex-col gap-6 max-w-md mx-auto">
            {[
              { num: '01', label: t('step1'), icon: '🔗' },
              { num: '02', label: t('step2'), icon: '📄' },
              { num: '03', label: t('step3'), icon: '💶' },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50">
                <div className="text-2xl">{step.icon}</div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">{step.num}</div>
                  <div className="font-medium text-slate-800">{step.label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Demo CTA */}
        <section className="pb-16 text-center">
          <Link
            href="/onboarding"
            className="inline-block bg-primary text-white rounded-xl px-8 py-4 text-base font-semibold shadow-lg hover:bg-blue-900 transition-colors"
          >
            {t('cta')} →
          </Link>
          <p className="mt-3 text-xs text-slate-400">{tDemo('banner')}</p>
        </section>
      </div>
    </div>
  );
}
