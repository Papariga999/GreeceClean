'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import FakeLoader from '@/components/fake-loader';

export default function AnalyzingPage() {
  const t = useTranslations('onboarding.analyzing');
  const router = useRouter();

  const steps = [t('step1'), t('step2'), t('step3')];

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="max-w-sm w-full">
        <FakeLoader
          steps={steps}
          durationMs={3200}
          onComplete={() => router.push('/dashboard')}
        />
      </div>
    </div>
  );
}
