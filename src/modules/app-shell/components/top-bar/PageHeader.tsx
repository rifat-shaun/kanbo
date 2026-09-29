import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useAppShell } from '../../context/AppShellContext'

export type PageHeaderProps = {
  title: ReactNode
  actions?: ReactNode
  subBar?: ReactNode
}

const PageHeaderContent = ({ title, actions }: Omit<PageHeaderProps, 'subBar'>) => (
  <>
    <div className="flex items-center gap-1.5 min-w-0">
      <h1 className="text-md-sm font-semibold whitespace-nowrap">{title}</h1>
    </div>
    <div className="flex-1" />
    {actions && <div className="flex items-center gap-2 shrink-0 *:shrink-0">{actions}</div>}
  </>
)

// Renders nothing where it's placed; the content shows up in the top bar.
export const PageHeader = ({ subBar, ...contentProps }: PageHeaderProps) => {
  const { headerTarget, subBarTarget } = useAppShell()

  return (
    <>
      {headerTarget && createPortal(<PageHeaderContent {...contentProps} />, headerTarget)}
      {subBar && subBarTarget && createPortal(subBar, subBarTarget)}
    </>
  )
}
