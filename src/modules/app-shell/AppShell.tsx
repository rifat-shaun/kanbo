import { Outlet } from 'react-router'
import { Toaster } from 'sonner'
import { useTheme } from '@/shared/theme'
import { OfflineBanner } from './components/OfflineBanner'
import { Sidebar } from './components/sidebar/Sidebar'
import { TopBar } from './components/top-bar/TopBar'
import { AppShellProvider } from './context/AppShellProvider'

export const AppShell = () => {
  const { resolvedTheme } = useTheme()

  return (
    <AppShellProvider>
      <div className="h-dvh flex bg-bg text-fg text-sm overflow-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 z-50 rounded-control border border-border bg-surface px-3 py-1.5 font-medium shadow-pop focus-ring"
        >
          Skip to content
        </a>

        <Sidebar className="hidden md:flex" />

        <div className="flex-1 min-w-0 flex flex-col">
          <OfflineBanner />
          <TopBar />
          <main id="main" tabIndex={-1} className="flex-1 min-h-0 relative outline-none">
            <Outlet />
          </main>
          {/* TODO: <MobileTabBar /> */}
        </div>

        <Toaster position="bottom-center" theme={resolvedTheme} />
        {/* TODO: <CommandPalette /> */}
      </div>
    </AppShellProvider>
  )
}
