import { useAppShell } from '../../context/AppShellContext'

// There's no global navbar. Each page fills these via <PageHeader/>, and the
// content goes away with the page, so a stale header can't stick around.
export const TopBar = () => {
  const { setHeaderTarget, setSubBarTarget } = useAppShell()

  return (
    <>
      <header
        ref={setHeaderTarget}
        className="h-13 shrink-0 flex items-center gap-2 px-4 md:px-5 bg-surface border-b border-border relative z-10"
      />
      <div
        ref={setSubBarTarget}
        className="h-10 shrink-0 flex items-center gap-2 px-4 md:px-5 bg-surface border-b border-border empty:hidden"
      />
    </>
  )
}
