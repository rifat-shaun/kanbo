import { createContext, useContext } from 'react'

export const SIDEBAR_COLLAPSED_STORAGE_KEY = 'kanbo-sidebar-collapsed'

type AppShellContextValue = {
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  // DOM nodes inside the top bar that <PageHeader/> portals into
  headerTarget: HTMLElement | null
  subBarTarget: HTMLElement | null
  setHeaderTarget: (element: HTMLElement | null) => void
  setSubBarTarget: (element: HTMLElement | null) => void
}

export const AppShellContext = createContext<AppShellContextValue | null>(null)

export const useAppShell = () => {
  const appShellContext = useContext(AppShellContext)
  if (!appShellContext) throw new Error('useAppShell must be used inside <AppShellProvider>')

  return appShellContext
}
