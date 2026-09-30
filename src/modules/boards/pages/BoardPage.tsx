import { Link, useParams } from 'react-router'

// TODO: lists and cards
export const BoardPage = () => {
  const { workspaceSlug, boardId, cardId } = useParams()

  if (cardId) return <p className="p-6 text-fg-3">Card {cardId} is open.</p>

  return (
    <p className="p-6 text-fg-3">
      Lists go here.{' '}
      <Link to={`/${workspaceSlug}/b/${boardId}/c/demo-card`} className="text-accent-text hover:underline">
        Open a demo card
      </Link>
    </p>
  )
}
