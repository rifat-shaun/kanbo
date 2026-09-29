import type { ReactNode } from 'react'

// TODO: redirect to /login when there's no session. Everyone is signed in until auth exists.
export const RequireAuth = ({ children }: { children: ReactNode }) => children
