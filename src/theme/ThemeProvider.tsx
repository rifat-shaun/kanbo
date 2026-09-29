import { useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'
import { THEME_STORAGE_KEY, ThemeContext, type ResolvedTheme, type Theme } from './ThemeContext'

const DARK_COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)'

function readStoredTheme(): Theme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') return storedTheme
  } catch {
    // Storage can be unavailable (private mode, blocked site data).
  }
  return 'system'
}

function subscribeToSystemTheme(onSystemThemeChange: () => void) {
  const darkSchemeMediaQuery = window.matchMedia(DARK_COLOR_SCHEME_QUERY)
  darkSchemeMediaQuery.addEventListener('change', onSystemThemeChange)
  return () => darkSchemeMediaQuery.removeEventListener('change', onSystemThemeChange)
}

const getSystemTheme = (): ResolvedTheme => (window.matchMedia(DARK_COLOR_SCHEME_QUERY).matches ? 'dark' : 'light')

// Used during server rendering, where there is no media query to read.
const getServerTheme = (): ResolvedTheme => 'light'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme)
  const resolvedTheme: ResolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
  }, [resolvedTheme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // Ignore; the choice still applies for this session.
    }
  }, [])

  const contextValue = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme])

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
