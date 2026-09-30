import * as Tooltip from '@radix-ui/react-tooltip'
import type { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router'
import { mergeClassNames } from '@/shared/utils/mergeClassNames'

type NavItemProps = {
  to: string
  label: string
  icon: LucideIcon
  shortcut?: string
  count?: number
  end?: boolean
  collapsed: boolean
}

export const NavItem = ({ to, label, icon: Icon, shortcut, count = 0, end, collapsed }: NavItemProps) => {
  // NavLink adds aria-current="page" on its own when active
  const link = (
    <NavLink
      to={to}
      end={end}
      aria-label={collapsed ? label : undefined}
      className={({ isActive }) =>
        mergeClassNames(
          'relative h-7.5 px-2 rounded-control flex items-center gap-2 border border-transparent font-medium text-fg-2 hover:bg-surface-2 hover:text-fg focus-ring',
          collapsed && 'justify-center px-0',
          isActive && 'bg-accent-soft text-accent-text hover:bg-accent-soft hover:text-accent-text',
        )
      }
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden className="shrink-0" />
      {!collapsed && <span className="flex-1 truncate">{label}</span>}

      {count > 0 && collapsed && <span aria-hidden className="absolute top-1.5 right-2.5 size-1.5 rounded-full bg-accent" />}
      {count > 0 && !collapsed && (
        <span className="min-w-5 h-4 px-1.5 rounded-full bg-accent text-white text-2xs font-semibold flex items-center justify-center">
          {count > 9 ? '9+' : count}
        </span>
      )}
    </NavLink>
  )

  if (!collapsed) return link

  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{link}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="right"
          sideOffset={8}
          className="z-50 flex items-center gap-2 rounded-control bg-fg px-2 py-1 text-xs font-medium text-surface shadow-pop"
        >
          {label}
          {shortcut && <span className="font-mono text-3xs opacity-70">{shortcut}</span>}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}
