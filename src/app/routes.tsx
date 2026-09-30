import { Navigate, type RouteObject } from 'react-router'
import { AppShell, type BreadcrumbHandle } from '@/modules/app-shell'
import { AuthLayout, LoginPage, RequireAuth } from '@/modules/auth'
import { BoardPage, BoardsIndexPage, getBoardName } from '@/modules/boards'
import { TokensPage } from '@/modules/dev'
import { HomePage } from '@/modules/home'
import { NotificationsPage } from '@/modules/notifications'
import { getSettingsSectionLabel, SettingsLayout, SettingsSectionPage } from '@/modules/settings'
import { getWorkspaceName } from '@/modules/workspaces'
import { NotFoundPage } from '@/shared/pages/NotFoundPage'

// No sessions yet, so `/` just goes to the demo workspace.
const DEFAULT_WORKSPACE = 'northwind'

// Breadcrumbs for each route; the top bar joins them in order: Northwind Labs › Boards › Bug triage
const workspaceCrumbs: BreadcrumbHandle = {
  breadcrumbs: ({ params, pathname }) => [{ label: getWorkspaceName(params.workspaceSlug), to: pathname }],
}

const pageCrumbs = (label: string): BreadcrumbHandle => ({
  breadcrumbs: ({ pathname }) => [{ label, to: pathname }],
})

// Board URLs are /b/:boardId rather than /boards/:boardId, so the board adds the "Boards" crumb itself.
const boardCrumbs: BreadcrumbHandle = {
  breadcrumbs: ({ params }) => [
    { label: 'Boards', to: `/${params.workspaceSlug}/boards` },
    { label: getBoardName(params.boardId), to: `/${params.workspaceSlug}/b/${params.boardId}` },
  ],
}

const cardCrumbs: BreadcrumbHandle = {
  breadcrumbs: (match) => [...boardCrumbs.breadcrumbs(match), { label: `Card ${match.params.cardId}`, to: match.pathname }],
}

const settingsSectionCrumbs: BreadcrumbHandle = {
  breadcrumbs: ({ params, pathname }) => [{ label: getSettingsSectionLabel(params.settingsSection), to: pathname }],
}

export const routes: RouteObject[] = [
  { path: '/', element: <Navigate to={`/${DEFAULT_WORKSPACE}`} replace /> },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  { path: '/dev/tokens', element: <TokensPage /> },
  {
    path: '/:workspaceSlug',
    element: (
      <RequireAuth>
        <AppShell />
      </RequireAuth>
    ),
    handle: workspaceCrumbs,
    children: [
      { index: true, element: <HomePage />, handle: pageCrumbs('Home') },
      { path: 'boards', element: <BoardsIndexPage />, handle: pageCrumbs('Boards') },
      { path: 'b/:boardId', element: <BoardPage />, handle: boardCrumbs },
      { path: 'b/:boardId/c/:cardId', element: <BoardPage />, handle: cardCrumbs },
      { path: 'notifications', element: <NotificationsPage />, handle: pageCrumbs('Notifications') },
      {
        path: 'settings',
        element: <SettingsLayout />,
        handle: pageCrumbs('Settings'),
        children: [
          { index: true, element: <Navigate to="general" replace /> },
          { path: ':settingsSection', element: <SettingsSectionPage />, handle: settingsSectionCrumbs },
        ],
      },
      // keeps the shell around for unknown workspace pages
      { path: '*', element: <NotFoundPage />, handle: pageCrumbs('Not found') },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]
