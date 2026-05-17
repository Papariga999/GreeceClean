import { describe, it, expect } from 'vitest';
import { calculateSundayPremium } from './sunday';
import type { WorkRecord, ContractInfo } from './types';

const CONTRACT: ContractInfo = {
  weeklyHours: 40,
  hourlyRate: 5.50,
  contractType: 'seasonal',
  workScheme: 'five_day',
};

function makeRecord(overrides: Partial<WorkRecord> = {}): WorkRecord {
  return {
    date: '2026-06-07',
    startTime: '10:00',
    endTime: '18:00',
    declaredHours: 8,
    actualHours: 8,
    isSunday: false,
    isHoliday: false,
    isNightShift: false,
    weekNumber: 1,
    weekDayIndex: 6,
    ...overrides,
  };
}

describe('calculateSundayPremium', () => {
  it('returns no claims when no sunday/holiday records', () => {
    const records = [makeRecord({ isSunday: false, isHoliday: false })];
    expect(calculateSundayPremium(records, CONTRACT)).toHaveLength(0);
  });

  it('returns a claim for Sunday work', () => {
    const records = [makeRecord({ isSunday: true })];
    const claims = calculateSundayPremium(records, CONTRACT);
    expect(claims).toHaveLength(1);
    expect(claims[0].multiplier).toBe(1.75);
  });

  it('returns a claim for holiday work', () => {
    const records = [makeRecord({ isHoliday: true })];
    const claims = calculateSundayPremium(records, CONTRACT);
    expect(claims).toHaveLength(1);
  });

  it('aggregates hours across multiple sunday records', () => {
    const records = [
      makeRecord({ isSunday: true, actualHours: 6 }),
      makeRecord({ isSunday: true, actualHours: 8, weekNumber: 2 }),
    ];
    const claims = calculateSundayPremium(records, CONTRACT);
    expect(claims[0].hours).toBe(14);
  });

  it('applies correct amount: hours × rate × 0.75', () => {
    const records = [makeRecord({ isSunday: true, actualHours: 8 })];
    const claims = calculateSundayPremium(records, CONTRACT);
    expect(claims[0].amount).toBeCloseTo(8 * 5.50 * 0.75, 2);
  });
});
