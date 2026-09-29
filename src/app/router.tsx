import { createBrowserRouter, Navigate } from 'react-router'
import { AppShell } from '@/modules/app-shell'
import { AuthLayout, LoginPage, RequireAuth } from '@/modules/auth'
import { BoardPage, BoardsIndexPage } from '@/modules/boards'
import { TokensPage } from '@/modules/dev'
import { HomePage } from '@/modules/home'
import { NotificationsPage } from '@/modules/notifications'
import { SettingsLayout, SettingsSectionPage } from '@/modules/settings'
import { NotFoundPage } from '@/shared/pages/NotFoundPage'

// No sessions yet, so `/` just goes to the demo workspace.
const DEFAULT_WORKSPACE = 'northwind'

export const router = createBrowserRouter([
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
    children: [
      { index: true, element: <HomePage /> },
      { path: 'boards', element: <BoardsIndexPage /> },
      { path: 'b/:boardId', element: <BoardPage /> },
      { path: 'b/:boardId/c/:cardId', element: <BoardPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          { index: true, element: <Navigate to="general" replace /> },
          { path: ':settingsSection', element: <SettingsSectionPage /> },
        ],
      },
      // keeps the shell around for unknown workspace pages
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
