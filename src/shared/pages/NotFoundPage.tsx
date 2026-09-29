import { Link } from 'react-router'

// TODO: swap for <EmptyState/> once it exists.
export const NotFoundPage = () => (
  <div className="p-6 flex flex-col gap-2">
    <h1 className="text-xl font-semibold">Page not found</h1>
    <Link to="/" className="text-accent-text underline">
      Back to Home
    </Link>
  </div>
)
