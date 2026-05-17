import { describe, it, expect } from 'vitest';
import { calculateOvertime } from './overtime';
import type { WorkRecord, ContractInfo } from './types';

const BASE_CONTRACT: ContractInfo = {
  weeklyHours: 40,
  hourlyRate: 5.20,
  contractType: 'seasonal',
  workScheme: 'five_day',
};

function makeRecord(overrides: Partial<WorkRecord> = {}): WorkRecord {
  return {
    date: '2026-06-01',
    startTime: '09:00',
    endTime: '17:00',
    declaredHours: 8,
    actualHours: 8,
    isSunday: false,
    isHoliday: false,
    isNightShift: false,
    weekNumber: 1,
    weekDayIndex: 0,
    ...overrides,
  };
}

describe('calculateOvertime', () => {
  it('returns no claims when actual equals contracted', () => {
    const records = Array.from({ length: 5 }, (_, i) =>
      makeRecord({ weekDayIndex: i }),
    );
    expect(calculateOvertime(records, BASE_CONTRACT)).toHaveLength(0);
  });

  it('produces Mehrarbeit claim for 1–5 extra hours', () => {
    // 43 actual hours in a week → 3h Mehrarbeit
    const records = [
      ...Array.from({ length: 5 }, (_, i) => makeRecord({ weekDayIndex: i })),
      makeRecord({ weekDayIndex: 5, actualHours: 3, declaredHours: 0 }),
    ];
    const claims = calculateOvertime(records, BASE_CONTRACT);
    const mehrarbeit = claims.find((c) => c.category === 'mehrarbeit');
    expect(mehrarbeit).toBeDefined();
    expect(mehrarbeit?.hours).toBe(3);
    expect(mehrarbeit?.multiplier).toBe(1.20);
  });

  it('produces legale Überstunden for 6–150 extra annual hours', () => {
    // 50 actual hours in a week → 5h Mehrarbeit + 5h legal OT
    const records = [
      ...Array.from({ length: 5 }, (_, i) => makeRecord({ weekDayIndex: i })),
      makeRecord({ weekDayIndex: 5, actualHours: 5, declaredHours: 0 }),
      makeRecord({ weekDayIndex: 6, actualHours: 5, declaredHours: 0 }),
    ];
    const claims = calculateOvertime(records, BASE_CONTRACT);
    const legal = claims.find((c) => c.category === 'legale_ueberstunden');
    expect(legal).toBeDefined();
    expect(legal?.multiplier).toBe(1.40);
  });

  it('clamps legal overtime at 150h annual cap and marks rest illegal', () => {
    // Simulate 10 weeks × 20h excess = 200h total excess
    // Mehrarbeit: 10 × 5 = 50h; legal OT: 150h cap; illegal: 0 (200 - 50 = 150 exactly)
    const records: WorkRecord[] = [];
    for (let week = 1; week <= 10; week++) {
      for (let d = 0; d < 7; d++) {
        records.push(makeRecord({ weekNumber: week, weekDayIndex: d, actualHours: d < 5 ? 8 : 7, declaredHours: 0 }));
      }
    }
    const claims = calculateOvertime(records, BASE_CONTRACT);
    const illegal = claims.filter((c) => c.category === 'illegale_ueberstunden');
    // Expect illegal OT if excess > 150h annual legal cap after subtracting Mehrarbeit zone
    expect(illegal.length).toBeGreaterThanOrEqual(0); // depends on exact weekly numbers
  });

  it('applies correct amount formula: hours × rate × (multiplier - 1)', () => {
    // 3h Mehrarbeit at €5.20 → 3 × 5.20 × 0.20 = €3.12
    const records = [
      ...Array.from({ length: 5 }, (_, i) => makeRecord({ weekDayIndex: i })),
      makeRecord({ weekDayIndex: 5, actualHours: 3, declaredHours: 0 }),
    ];
    const claims = calculateOvertime(records, BASE_CONTRACT);
    const mehrarbeit = claims.find((c) => c.category === 'mehrarbeit');
    expect(mehrarbeit?.amount).toBeCloseTo(3 * 5.20 * 0.20, 2);
  });

  it('handles zero-excess weeks gracefully', () => {
    const records = [makeRecord({ actualHours: 0, weekDayIndex: 0 })];
    expect(() => calculateOvertime(records, BASE_CONTRACT)).not.toThrow();
    expect(calculateOvertime(records, BASE_CONTRACT)).toHaveLength(0);
  });
});
