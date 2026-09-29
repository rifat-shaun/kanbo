import { useCallback, useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react'
import { THEME_STORAGE_KEY, ThemeContext, type ResolvedTheme, type Theme } from './ThemeContext'

const DARK_SCHEME_QUERY = '(prefers-color-scheme: dark)'

const readStoredTheme = (): Theme => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    if (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') return storedTheme
  } catch {
    // localStorage can throw in private mode
  }
  return 'system'
}

const subscribeToSystemTheme = (onChange: () => void) => {
  const darkSchemeQuery = window.matchMedia(DARK_SCHEME_QUERY)
  darkSchemeQuery.addEventListener('change', onChange)

  return () => darkSchemeQuery.removeEventListener('change', onChange)
}

const getSystemTheme = (): ResolvedTheme => (window.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light')
const getServerTheme = (): ResolvedTheme => 'light'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme, getServerTheme)
  const resolvedTheme = theme === 'system' ? systemTheme : theme

  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme
  }, [resolvedTheme])

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch {
      // still applies for this session
    }
  }, [])

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
