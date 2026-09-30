import { Link, useParams } from 'react-router'
import { BOARDS } from '../data/boards'

export const BoardsIndexPage = () => {
  const { workspaceSlug } = useParams()

  return (
    <ul className="p-6 flex flex-col gap-1">
      {BOARDS.map((board) => (
        <li key={board.id}>
          <Link to={`/${workspaceSlug}/b/${board.id}`} className="text-accent-text hover:underline">
            {board.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
