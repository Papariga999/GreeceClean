import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Karta-Check — Πόσα σου χρωστάει ο εργοδότης σου;',
  description: 'Ανακάλυψε σε 60 δευτερόλεπτα αν ο εργοδότης σου σου χρωστάει χρήματα.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
