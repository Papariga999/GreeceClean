import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LawyerMatchCard, { type LawyerData } from '@/components/lawyer-match-card';

const LAWYERS: LawyerData[] = [
  {
    id: 'dimitra',
    name: 'Dimitra Papadopoulou',
    city: 'Athens',
    specialization: 'Εργατικό Δίκαιο',
    yearsExperience: 23,
    successRate: 87,
    rating: 4.8,
    matchScore: 94,
  },
  {
    id: 'nikos',
    name: 'Nikos Stavridis',
    city: 'Thessaloniki',
    specialization: 'Τουριστικό Εργατικό',
    yearsExperience: 15,
    successRate: 91,
    rating: 4.9,
    matchScore: 88,
  },
  {
    id: 'eleni',
    name: 'Eleni Konstantinou',
    city: 'Heraklion',
    specialization: 'Υποθέσεις χειραγώγησης',
    yearsExperience: 18,
    successRate: 79,
    rating: 4.7,
    matchScore: 76,
  },
];

export default function LawyerPage() {
  const t = useTranslations('action.lawyer');

  return (
    <div className="min-h-screen pt-16 px-4">
      <div className="max-w-md mx-auto py-8">
        <Link href="/dashboard" className="text-sm text-slate-400 hover:text-slate-600 mb-6 inline-block">← Back</Link>

        <h1 className="font-display font-bold text-xl text-slate-900 mb-2">{t('title')}</h1>
        <p className="text-slate-500 text-sm mb-6">
          Ranked by match score for your case.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {LAWYERS.map((lawyer) => (
            <LawyerMatchCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500">
          {t('disclaimer')}
        </div>
      </div>
    </div>
  );
}
