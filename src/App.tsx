import { TokensPage } from './pages/dev/TokensPage'

const App = () => {
  if (window.location.pathname === '/dev/tokens') return <TokensPage />

  return (
    <main className="px-4 py-6 md:px-6">
      <h1 className="text-xl font-semibold">Kanbo</h1>
      <p className="text-sm text-fg-2">
        Design tokens: <a className="text-accent-text underline" href="/dev/tokens">/dev/tokens</a>
      </p>
    </main>
  )
}

export default App
