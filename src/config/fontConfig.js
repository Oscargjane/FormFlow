import { Inter } from 'next/font/google';

// Configura la fuente Inter con los subsets, pesos y variables deseados
export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});
