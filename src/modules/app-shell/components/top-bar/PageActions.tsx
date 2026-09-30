import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useAppShell } from '../../context/AppShellContext'

// Lets a page put buttons on the right of the top bar, e.g. <PageActions><ShareButton /></PageActions>.
// They unmount with the page, so nothing sticks around after navigating.
export const PageActions = ({ children }: { children: ReactNode }) => {
  const { actionsTarget } = useAppShell()

  return actionsTarget ? createPortal(children, actionsTarget) : null
}

// Same idea for the optional 40px bar under the top bar (e.g. FilterBar).
export const PageSubBar = ({ children }: { children: ReactNode }) => {
  const { subBarTarget } = useAppShell()

  return subBarTarget ? createPortal(children, subBarTarget) : null
}
