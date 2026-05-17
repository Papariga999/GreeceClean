export type WorkRecord = {
  date: string;
  startTime: string;
  endTime: string;
  declaredHours: number;
  actualHours: number;
  isSunday: boolean;
  isHoliday: boolean;
  isNightShift: boolean;
  weekNumber: number;
  weekDayIndex: number;
};

export type ContractInfo = {
  weeklyHours: number;
  hourlyRate: number;
  contractType: 'permanent' | 'seasonal' | 'fixed_term';
  workScheme: 'five_day' | 'six_day';
};

export type ClaimCategory =
  | 'mehrarbeit'
  | 'legale_ueberstunden'
  | 'illegale_ueberstunden'
  | 'sechster_tag'
  | 'sonntags'
  | 'nachtarbeit';

export type Claim = {
  category: ClaimCategory;
  hours: number;
  baseRate: number;
  multiplier: number;
  amount: number;
  legalBasis: string;
  confidenceLevel: 'high' | 'medium' | 'low';
};

export type WeeklyAggregate = {
  weekNumber: number;
  totalActualHours: number;
  totalDeclaredHours: number;
  records: WorkRecord[];
  annualOvertimeUsed?: number;
};
