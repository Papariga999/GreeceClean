import type { WorkRecord, ContractInfo, Claim } from './types';

// Sixth-day premium applies when an employee works their 6th consecutive day
// in a work week under a 5-day scheme. Premium: +30% of daily wage.
export function calculateSixthDay(
  records: WorkRecord[],
  contract: ContractInfo,
): Claim[] {
  if (contract.workScheme !== 'five_day') return [];

  const claims: Claim[] = [];
  const byWeek = new Map<number, WorkRecord[]>();

  for (const r of records) {
    const list = byWeek.get(r.weekNumber) ?? [];
    list.push(r);
    byWeek.set(r.weekNumber, list);
  }

  for (const weekRecords of byWeek.values()) {
    // Count distinct work days (by weekDayIndex)
    const workedDays = new Set(weekRecords.map((r) => r.weekDayIndex)).size;

    if (workedDays >= 6) {
      // Sixth day: 8h at +30%
      const sixthDayHours = 8;
      claims.push({
        category: 'sechster_tag',
        hours: sixthDayHours,
        baseRate: contract.hourlyRate,
        multiplier: 1.30,
        amount: sixthDayHours * contract.hourlyRate * 0.30,
        legalBasis: 'Art. 11 Gesetz 2874/2000, Rundschreiben 44/2017',
        confidenceLevel: 'high',
      });
    }
  }

  return claims;
}
