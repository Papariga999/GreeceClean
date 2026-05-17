export type PatternAnomalyResult = {
  hasAnomaly: boolean;
  affectedDays: number;
  probability: number;
  description: string;
  type: 'manager_stamping' | 'batch_entry' | 'none';
};

// Mock pattern anomaly detection
export function checkStampPattern(personaId: string): PatternAnomalyResult {
  if (personaId === 'arben-rhodes') {
    return {
      hasAnomaly: true,
      affectedDays: 48,
      probability: 0.94,
      description:
        'Stempelungen erfolgen täglich um exakt 16:00:00 Uhr ohne Sekunden-Varianz. Wahrscheinlichkeit: Manager stempelt automatisiert.',
      type: 'manager_stamping',
    };
  }
  return {
    hasAnomaly: false,
    affectedDays: 0,
    probability: 0.03,
    description: 'Stempel-Pattern: natürlich variabel.',
    type: 'none',
  };
}
