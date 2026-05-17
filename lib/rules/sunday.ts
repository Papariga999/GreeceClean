import type { WorkRecord, ContractInfo, Claim } from './types';

// Sunday/holiday premium: +75% of hourly rate for actual hours worked.
export function calculateSundayPremium(
  records: WorkRecord[],
  contract: ContractInfo,
): Claim[] {
  const sundayRecords = records.filter((r) => r.isSunday || r.isHoliday);
  if (sundayRecords.length === 0) return [];

  const totalHours = sundayRecords.reduce((sum, r) => sum + r.actualHours, 0);

  return [
    {
      category: 'sonntags',
      hours: totalHours,
      baseRate: contract.hourlyRate,
      multiplier: 1.75,
      amount: totalHours * contract.hourlyRate * 0.75,
      legalBasis: 'Art. 2 Gesetz 435/1976; Presidential Decree 88/1999',
      confidenceLevel: 'medium',
    },
  ];
}
