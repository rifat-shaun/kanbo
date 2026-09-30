import { useAppShell } from '../../context/AppShellContext'
import { Breadcrumbs } from './Breadcrumbs'

export const TopBar = () => {
  const { setActionsTarget, setSubBarTarget } = useAppShell()

  return (
    <>
      <header className="h-13 shrink-0 flex items-center gap-2 px-4 md:px-5 bg-surface border-b border-border relative z-10">
        <Breadcrumbs />
        <div className="flex-1" />
        <div ref={setActionsTarget} className="flex items-center gap-2 shrink-0 *:shrink-0" />
      </header>
      <div
        ref={setSubBarTarget}
        className="h-10 shrink-0 flex items-center gap-2 px-4 md:px-5 bg-surface border-b border-border empty:hidden"
      />
    </>
  )
}
