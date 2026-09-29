import * as Tooltip from '@radix-ui/react-tooltip'
import { Bell, Home, LayoutGrid, PanelLeft, SlidersHorizontal } from 'lucide-react'
import { useParams } from 'react-router'
import { ThemeToggleButton } from '@/shared/theme'
import { mergeClassNames } from '@/shared/utils/mergeClassNames'
import { useAppShell } from '../../context/AppShellContext'
import { NavItem } from './NavItem'

export const Sidebar = ({ className }: { className?: string }) => {
  const { isSidebarCollapsed: collapsed, toggleSidebar } = useAppShell()
  const { workspaceSlug } = useParams()
  const basePath = `/${workspaceSlug}`

  return (
    <Tooltip.Provider delayDuration={300}>
      <aside
        aria-label="Primary"
        className={mergeClassNames(
          'flex flex-col shrink-0 bg-surface border-r border-border overflow-hidden transition-[width] duration-sidebar ease-out',
          collapsed ? 'w-rail' : 'w-sidebar',
          className,
        )}
      >
        {/* TODO: workspace switcher */}
        <div
          className={mergeClassNames(
            'h-13 shrink-0 flex items-center px-3 border-b border-border',
            collapsed ? 'justify-center' : 'justify-end',
          )}
        >
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!collapsed}
            title={collapsed ? 'Expand sidebar [' : 'Collapse sidebar ['}
            className="size-6 flex items-center justify-center rounded-control border border-transparent text-fg-3 hover:bg-surface-2 hover:text-fg focus-ring"
          >
            <PanelLeft size={16} strokeWidth={1.5} />
          </button>
        </div>

        <nav aria-label="Workspace" className="p-2 flex flex-col gap-px">
          <NavItem to={basePath} end label="Home" icon={Home} shortcut="G H" collapsed={collapsed} />
          <NavItem to={`${basePath}/boards`} label="Boards" icon={LayoutGrid} shortcut="G B" collapsed={collapsed} />
          {/* TODO: open the notifications popover instead of navigating */}
          <NavItem to={`${basePath}/notifications`} label="Notifications" icon={Bell} shortcut="G N" collapsed={collapsed} />
          <NavItem to={`${basePath}/settings`} label="Settings" icon={SlidersHorizontal} shortcut="G S" collapsed={collapsed} />
        </nav>

        {/* TODO: starred boards */}
        <div className="flex-1" />

        {/* TODO: user menu (theme toggle moves into it) */}
        <div className={mergeClassNames('h-13 shrink-0 flex items-center px-2 border-t border-border', collapsed && 'justify-center')}>
          <ThemeToggleButton iconOnly={collapsed} className={mergeClassNames(!collapsed && 'w-full')} />
        </div>
      </aside>
    </Tooltip.Provider>
  )
}
