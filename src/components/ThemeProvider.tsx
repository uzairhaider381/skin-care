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
  const { theme, setTheme, systemTheme, resolvedTheme } = nextUseTheme();
  const toggleTheme = () => {
    // Switch between light and dark themes; fallback to 'light' if undefined
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };
  return { theme, setTheme, systemTheme, resolvedTheme, toggleTheme };
}
