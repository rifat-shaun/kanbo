// Mock data until there's an API.
export type Board = {
  id: string
  name: string
}

export const BOARDS: Board[] = [
  { id: 'mobile-app-sprint-14', name: 'Mobile app · Sprint 14' },
  { id: 'bug-triage', name: 'Bug triage' },
  { id: 'public-api-v1', name: 'Public API v1' },
  { id: 'q4-marketing', name: 'Q4 marketing' },
]

export const getBoardName = (boardId = '') => BOARDS.find((board) => board.id === boardId)?.name ?? boardId
