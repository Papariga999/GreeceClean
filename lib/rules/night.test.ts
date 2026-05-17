import { describe, it, expect } from 'vitest';
import { calculateNightPremium } from './night';
import type { WorkRecord, ContractInfo } from './types';

const CONTRACT: ContractInfo = {
  weeklyHours: 40,
  hourlyRate: 5.20,
  contractType: 'permanent',
  workScheme: 'five_day',
};

function makeRecord(overrides: Partial<WorkRecord> = {}): WorkRecord {
  return {
    date: '2026-06-01',
    startTime: '22:00',
    endTime: '06:00',
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

describe('calculateNightPremium', () => {
  it('returns no claims when no night shift records', () => {
    expect(calculateNightPremium([makeRecord({ isNightShift: false })], CONTRACT)).toHaveLength(0);
  });

  it('returns a claim for night shift records', () => {
    const claims = calculateNightPremium([makeRecord({ isNightShift: true })], CONTRACT);
    expect(claims).toHaveLength(1);
    expect(claims[0].multiplier).toBe(1.25);
  });

  it('aggregates all night shift hours', () => {
    const records = [
      makeRecord({ isNightShift: true, actualHours: 8 }),
      makeRecord({ isNightShift: true, actualHours: 6, weekNumber: 2 }),
    ];
    const claims = calculateNightPremium(records, CONTRACT);
    expect(claims[0].hours).toBe(14);
  });

  it('applies correct amount: hours × rate × 0.25', () => {
    const claims = calculateNightPremium([makeRecord({ isNightShift: true, actualHours: 8 })], CONTRACT);
    expect(claims[0].amount).toBeCloseTo(8 * 5.20 * 0.25, 2);
  });

  it('returns high confidence level', () => {
    const claims = calculateNightPremium([makeRecord({ isNightShift: true })], CONTRACT);
    expect(claims[0].confidenceLevel).toBe('high');
  });
});
