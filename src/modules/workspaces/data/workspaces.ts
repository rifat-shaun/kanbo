// Mock data until there's an API.
export type Workspace = {
  slug: string
  name: string
}

export const WORKSPACES: Workspace[] = [{ slug: 'northwind', name: 'Northwind Labs' }]

export const getWorkspaceName = (slug = '') => WORKSPACES.find((workspace) => workspace.slug === slug)?.name ?? slug
