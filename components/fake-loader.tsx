'use client';
import { useEffect, useState } from 'react';

type Props = {
  steps: string[];
  onComplete: () => void;
  durationMs?: number;
};

export default function FakeLoader({ steps, onComplete, durationMs = 3000 }: Props) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepDuration = durationMs / steps.length;
    const timers: ReturnType<typeof setTimeout>[] = [];

    steps.forEach((_, i) => {
      timers.push(
        setTimeout(() => setCurrentStep(i), i * stepDuration),
      );
    });

    timers.push(setTimeout(onComplete, durationMs));

    return () => timers.forEach(clearTimeout);
  }, [steps, durationMs, onComplete]);

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <div className="relative w-16 h-16">
        <svg className="animate-spin w-16 h-16 text-primary" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
          <path
            d="M12 2a10 10 0 0 1 10 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-2xl">📊</div>
      </div>
      <div className="space-y-2 text-center">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`text-sm transition-all duration-300 ${
              i === currentStep
                ? 'text-slate-900 font-medium scale-105'
                : i < currentStep
                ? 'text-slate-400 line-through'
                : 'text-slate-300'
            }`}
          >
            {i < currentStep ? '✓ ' : i === currentStep ? '⟳ ' : '○ '}
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
