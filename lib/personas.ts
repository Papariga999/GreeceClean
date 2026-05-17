import mariaData from '@/data/demo-personas/maria-mykonos.json';
import giannisData from '@/data/demo-personas/giannis-athens.json';
import arbenData from '@/data/demo-personas/arben-rhodes.json';
import eleniData from '@/data/demo-personas/eleni-thessaloniki.json';

export type ManipulationFlag = {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  evidenceCount: number;
};

export type BreakdownItem = {
  hours: number;
  rateMultiplier: number;
  amount: number;
  note?: string;
};

export type Persona = {
  id: string;
  displayName: string;
  age: number;
  location: string;
  sector: string;
  employer: string;
  contractType: string;
  contractedHoursPerWeek: number;
  contractedHourlyRate: number;
  monthsAnalyzed: number;
  actualHoursWorked: number;
  declaredHoursWorked: number;
  hoursPaid: number;
  totalUnpaidEUR: number;
  breakdown: Record<string, BreakdownItem>;
  trustScore: number;
  manipulationFlags: ManipulationFlag[];
  evidenceQuality: string;
  winProbability: number;
  avatarSeed: string;
  additionalLegalGrounds?: string;
};

export const PERSONAS: Persona[] = [
  mariaData as Persona,
  giannisData as Persona,
  arbenData as Persona,
  eleniData as Persona,
];

export function getPersona(id: string): Persona {
  return PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];
}

export function getAvatarUrl(seed: string): string {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
}
