import type { WorkRecord, ContractInfo, Claim } from './types';

// Night work premium: +25% for hours between 22:00–06:00.
export function calculateNightPremium(
  records: WorkRecord[],
  contract: ContractInfo,
): Claim[] {
  const nightRecords = records.filter((r) => r.isNightShift);
  if (nightRecords.length === 0) return [];

  const totalHours = nightRecords.reduce((sum, r) => sum + r.actualHours, 0);

  return [
    {
      category: 'nachtarbeit',
      hours: totalHours,
      baseRate: contract.hourlyRate,
      multiplier: 1.25,
      amount: totalHours * contract.hourlyRate * 0.25,
      legalBasis: 'Art. 1 Gesetz 2112/1920 §4; Gesetz 4808/2021',
      confidenceLevel: 'high',
    },
  ];
}
