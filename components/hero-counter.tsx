'use client';
import { useEffect, useRef, useState } from 'react';

type Props = { target: number; prefix?: string; suffix?: string };

export default function HeroCounter({ target, prefix = '', suffix = '' }: Props) {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2800;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, [target]);

  const formatted = new Intl.NumberFormat('el-GR').format(value);

  return (
    <div className="font-display font-bold text-6xl sm:text-7xl text-amber-500 font-tabular tracking-tight">
      {prefix}{formatted}{suffix}
    </div>
  );
}
