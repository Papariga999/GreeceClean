'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PersonaId = 'maria-mykonos' | 'giannis-athens' | 'arben-rhodes' | 'eleni-thessaloniki';

type DemoStore = {
  activePersonaId: PersonaId;
  setPersona: (id: PersonaId) => void;
  reset: () => void;
};

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      activePersonaId: 'maria-mykonos',
      setPersona: (id) => set({ activePersonaId: id }),
      reset: () => set({ activePersonaId: 'maria-mykonos' }),
    }),
    { name: 'karta-check-demo' },
  ),
);
