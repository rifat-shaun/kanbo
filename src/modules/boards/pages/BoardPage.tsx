import { useParams } from 'react-router'
import { PageHeader } from '@/modules/app-shell'

export const BoardPage = () => {
  const { boardId, cardId } = useParams()

  return (
    <>
      <PageHeader title={`Board ${boardId}`} />
      {cardId && <p className="p-6 text-fg-3">Card {cardId}</p>}
    </>
  )
}
