import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { Link, useMatches } from 'react-router'
import type { BreadcrumbHandle } from '../../types/breadcrumbs'

const hasBreadcrumbs = (handle: unknown): handle is BreadcrumbHandle =>
  typeof handle === 'object' && handle !== null && 'breadcrumbs' in handle

export const Breadcrumbs = () => {
  const matches = useMatches()

  const crumbs = matches.flatMap((match) => (hasBreadcrumbs(match.handle) ? match.handle.breadcrumbs(match) : []))
  if (crumbs.length === 0) return null

  const parentCrumbs = crumbs.slice(0, -1)
  const currentCrumb = crumbs[crumbs.length - 1]

  // Parent crumbs shrink and truncate first; the current page never does.
  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1.5 min-w-0">
        {parentCrumbs.map((crumb) => (
          <Fragment key={crumb.to + crumb.label}>
            <li className="hidden md:block min-w-0">
              <Link
                to={crumb.to}
                className="block truncate rounded-xs text-fg-3 hover:text-fg focus-ring"
              >
                {crumb.label}
              </Link>
            </li>
            <li aria-hidden className="hidden md:block shrink-0 text-fg-3">
              <ChevronRight size={14} strokeWidth={1.5} />
            </li>
          </Fragment>
        ))}

        <li className="shrink-0">
          <h1 aria-current="page" className="text-md-sm font-semibold whitespace-nowrap">
            {currentCrumb.label}
          </h1>
        </li>
      </ol>
    </nav>
  )
}
