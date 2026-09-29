import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { isTypingTarget } from '@/shared/utils/isTypingTarget'
import { AppShellContext, SIDEBAR_COLLAPSED_STORAGE_KEY } from './AppShellContext'

const readStoredCollapsed = () => {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

export const AppShellProvider = ({ children }: { children: ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(readStoredCollapsed)
  const [headerTarget, setHeaderTarget] = useState<HTMLElement | null>(null)
  const [subBarTarget, setSubBarTarget] = useState<HTMLElement | null>(null)

  const toggleSidebar = useCallback(() => setIsSidebarCollapsed((collapsed) => !collapsed), [])

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(isSidebarCollapsed))
    } catch {
      // not persisted, but still works for this session
    }
  }, [isSidebarCollapsed])

  // `[` toggles the sidebar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '[' || event.metaKey || event.ctrlKey || event.altKey) return
      if (event.defaultPrevented || isTypingTarget(event.target)) return

      event.preventDefault()
      toggleSidebar()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggleSidebar])

  const value = useMemo(
    () => ({ isSidebarCollapsed, toggleSidebar, headerTarget, subBarTarget, setHeaderTarget, setSubBarTarget }),
    [isSidebarCollapsed, toggleSidebar, headerTarget, subBarTarget],
  )

  return <AppShellContext.Provider value={value}>{children}</AppShellContext.Provider>
}
