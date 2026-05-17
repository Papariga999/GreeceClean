import type { WorkRecord, ContractInfo, Claim } from './types';
import { aggregateByWeek } from './overtime';

const ANNUAL_CAP = 150;

// Standalone illegal overtime calculator for records already exceeding the cap.
export function calculateIllegalOvertime(
  records: WorkRecord[],
  contract: ContractInfo,
): Claim[] {
  const claims: Claim[] = [];
  const weeks = aggregateByWeek(records);
  let annualLegalUsed = 0;

  for (const week of weeks) {
    const excess = week.totalActualHours - contract.weeklyHours;
    if (excess <= 5) continue; // only Mehrarbeit zone, no legal overtime

    const legalAvailable = Math.max(0, ANNUAL_CAP - annualLegalUsed);
    const legalThisWeek = Math.min(excess - 5, legalAvailable);
    annualLegalUsed += legalThisWeek;

    const illegalHours = excess - 5 - legalThisWeek;
    if (illegalHours > 0) {
      claims.push({
        category: 'illegale_ueberstunden',
        hours: illegalHours,
        baseRate: contract.hourlyRate,
        multiplier: 2.20,
        amount: illegalHours * contract.hourlyRate * 1.20,
        legalBasis: 'Art. 4§5 Gesetz 4808/2021; Art. 7 Gesetz 5239/2025',
        confidenceLevel: 'high',
      });
    }
  }

  return claims;
}
