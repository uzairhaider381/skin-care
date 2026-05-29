'use client';

import { ThemeProvider as NextThemesProvider, useTheme as nextUseTheme } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  return nextUseTheme();
}
