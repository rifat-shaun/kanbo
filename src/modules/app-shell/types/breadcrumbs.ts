import type { Params } from 'react-router'

export type Breadcrumb = {
  label: string
  to: string
}

// Put this on a route's `handle` and the top bar picks it up. A route can add
// more than one crumb, e.g. a board adds "Boards" and the board name.
export type BreadcrumbHandle = {
  breadcrumbs: (match: { params: Params; pathname: string }) => Breadcrumb[]
}
