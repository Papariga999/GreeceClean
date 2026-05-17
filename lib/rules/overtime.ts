import type { WorkRecord, ContractInfo, Claim, WeeklyAggregate } from './types';

export function aggregateByWeek(records: WorkRecord[]): WeeklyAggregate[] {
  const map = new Map<number, WeeklyAggregate>();
  for (const r of records) {
    const agg = map.get(r.weekNumber) ?? {
      weekNumber: r.weekNumber,
      totalActualHours: 0,
      totalDeclaredHours: 0,
      records: [],
    };
    agg.totalActualHours += r.actualHours;
    agg.totalDeclaredHours += r.declaredHours;
    agg.records.push(r);
    map.set(r.weekNumber, agg);
  }
  return Array.from(map.values()).sort((a, b) => a.weekNumber - b.weekNumber);
}

export function calculateOvertime(
  records: WorkRecord[],
  contract: ContractInfo,
): Claim[] {
  const claims: Claim[] = [];
  const weeks = aggregateByWeek(records);

  // Track annual legal overtime cap (150h/year)
  let annualLegalOvertimeUsed = 0;
  const ANNUAL_LEGAL_OVERTIME_CAP = 150;

  for (const week of weeks) {
    const contracted = contract.weeklyHours;
    const actual = week.totalActualHours;

    if (actual <= contracted) continue;

    const excess = actual - contracted;

    // Mehrarbeit: 1st-5th hour beyond contracted (41st-45th for 40h contract)
    const mehrarbeitHours = Math.min(excess, 5);
    if (mehrarbeitHours > 0) {
      claims.push({
        category: 'mehrarbeit',
        hours: mehrarbeitHours,
        baseRate: contract.hourlyRate,
        multiplier: 1.20,
        amount: mehrarbeitHours * contract.hourlyRate * 0.20, // only the premium delta
        legalBasis: 'Art. 1 Gesetz 3863/2010, geändert durch 5053/2023',
        confidenceLevel: 'high',
      });
    }

    // Legal overtime: beyond the Mehrarbeit threshold, up to annual cap
    if (excess > 5) {
      const remainingCap = ANNUAL_LEGAL_OVERTIME_CAP - annualLegalOvertimeUsed;
      const legaleHours = Math.min(excess - 5, remainingCap);
      if (legaleHours > 0) {
        claims.push({
          category: 'legale_ueberstunden',
          hours: legaleHours,
          baseRate: contract.hourlyRate,
          multiplier: 1.40,
          amount: legaleHours * contract.hourlyRate * 0.40,
          legalBasis: 'Art. 4 Gesetz 4808/2021',
          confidenceLevel: 'high',
        });
        annualLegalOvertimeUsed += legaleHours;
      }

      // Illegal overtime: beyond annual cap
      const illegalHours = excess - 5 - Math.min(excess - 5, ANNUAL_LEGAL_OVERTIME_CAP - (annualLegalOvertimeUsed - legaleHours));
      if (illegalHours > 0) {
        claims.push({
          category: 'illegale_ueberstunden',
          hours: illegalHours,
          baseRate: contract.hourlyRate,
          multiplier: 2.20,
          amount: illegalHours * contract.hourlyRate * 1.20,
          legalBasis: 'Art. 4§5 Gesetz 4808/2021; Gesetz 5239/2025',
          confidenceLevel: 'high',
        });
      }
    }
  }

  return claims;
}
