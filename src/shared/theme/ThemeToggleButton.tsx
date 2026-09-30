import { Moon, Sun } from 'lucide-react'
import { mergeClassNames } from '@/shared/utils/mergeClassNames'
import { useTheme } from './ThemeContext'

type ThemeToggleButtonProps = {
  iconOnly?: boolean
  className?: string
}

export const ThemeToggleButton = ({ iconOnly = false, className }: ThemeToggleButtonProps) => {
  const { resolvedTheme, setTheme } = useTheme()

  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  const label = nextTheme === 'dark' ? 'Dark mode' : 'Light mode'
  const Icon = nextTheme === 'dark' ? Moon : Sun

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={iconOnly ? `Switch to ${nextTheme} mode` : undefined}
      title={`Switch to ${nextTheme} mode`}
      className={mergeClassNames(
        'h-7.5 flex items-center gap-2 rounded-control border border-transparent px-2 font-medium text-fg-2 hover:bg-surface-2 hover:text-fg focus-ring',
        iconOnly && 'w-7.5 justify-center px-0',
        className,
      )}
    >
      <Icon size={16} strokeWidth={1.5} aria-hidden className="shrink-0" />
      {!iconOnly && <span className="truncate">{label}</span>}
    </button>
  )
}
