import { createContext, useContext } from 'react'

export type Theme = 'system' | 'light' | 'dark'
export type ResolvedTheme = 'light' | 'dark'

// Keep in sync with the pre-paint script in index.html.
export const THEME_STORAGE_KEY = 'kanbo-theme'

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

export const useTheme = () => {
  const themeContext = useContext(ThemeContext)
  if (!themeContext) throw new Error('useTheme must be used inside <ThemeProvider>')

  return themeContext
}
