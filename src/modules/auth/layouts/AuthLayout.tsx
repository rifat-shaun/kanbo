import { Outlet } from 'react-router'

export const AuthLayout = () => (
  <div className="min-h-dvh flex items-center justify-center bg-bg px-4 text-base text-fg">
    <main className="w-full max-w-sm">
      <Outlet />
    </main>
  </div>
)
