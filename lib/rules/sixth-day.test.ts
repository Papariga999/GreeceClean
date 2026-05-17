import { describe, it, expect } from 'vitest';
import { calculateSixthDay } from './sixth-day';
import type { WorkRecord, ContractInfo } from './types';

const CONTRACT: ContractInfo = {
  weeklyHours: 40,
  hourlyRate: 6.15,
  contractType: 'permanent',
  workScheme: 'five_day',
};

function makeDay(weekDayIndex: number, weekNumber = 1): WorkRecord {
  return {
    date: '2026-06-01',
    startTime: '08:00',
    endTime: '16:00',
    declaredHours: 8,
    actualHours: 8,
    isSunday: false,
    isHoliday: false,
    isNightShift: false,
    weekNumber,
    weekDayIndex,
  };
}

describe('calculateSixthDay', () => {
  it('returns no claims for 5-day week', () => {
    const records = Array.from({ length: 5 }, (_, i) => makeDay(i));
    expect(calculateSixthDay(records, CONTRACT)).toHaveLength(0);
  });

  it('returns a claim when 6 distinct days are worked', () => {
    const records = Array.from({ length: 6 }, (_, i) => makeDay(i));
    const claims = calculateSixthDay(records, CONTRACT);
    expect(claims).toHaveLength(1);
    expect(claims[0].category).toBe('sechster_tag');
    expect(claims[0].multiplier).toBe(1.30);
  });

  it('returns no claim for six_day work scheme', () => {
    const sixDayContract = { ...CONTRACT, workScheme: 'six_day' as const };
    const records = Array.from({ length: 6 }, (_, i) => makeDay(i));
    expect(calculateSixthDay(records, sixDayContract)).toHaveLength(0);
  });

  it('counts one claim per week when 6 days worked each week', () => {
    const records = [
      ...Array.from({ length: 6 }, (_, i) => makeDay(i, 1)),
      ...Array.from({ length: 6 }, (_, i) => makeDay(i, 2)),
    ];
    const claims = calculateSixthDay(records, CONTRACT);
    expect(claims).toHaveLength(2);
  });

  it('applies correct amount: 8h × rate × 0.30', () => {
    const records = Array.from({ length: 6 }, (_, i) => makeDay(i));
    const claims = calculateSixthDay(records, CONTRACT);
    expect(claims[0].amount).toBeCloseTo(8 * 6.15 * 0.30, 2);
  });
});
