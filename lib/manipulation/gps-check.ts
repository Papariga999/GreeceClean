export type GpsAnomalyResult = {
  hasAnomaly: boolean;
  anomalyDays: number;
  probability: number;
  description: string;
};

// Mock GPS anomaly check based on persona manipulation flags
export function checkGpsAnomalies(personaId: string): GpsAnomalyResult {
  if (personaId === 'arben-rhodes') {
    return {
      hasAnomaly: true,
      anomalyDays: 12,
      probability: 0.88,
      description:
        'An 12 Tagen wurde die Stempelung registriert, während GPS-Daten zeigen, dass User noch auf der Baustelle war.',
    };
  }
  return {
    hasAnomaly: false,
    anomalyDays: 0,
    probability: 0.02,
    description: 'GPS-Verifikation: konsistent.',
  };
}
