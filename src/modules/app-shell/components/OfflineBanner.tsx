import { WifiOff } from 'lucide-react'
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus'

type OfflineBannerProps = {
  pendingChanges?: number
}

export const OfflineBanner = ({ pendingChanges = 0 }: OfflineBannerProps) => {
  const isOnline = useOnlineStatus()
  if (isOnline) return null

  return (
    <div
      role="status"
      className="h-8 shrink-0 flex items-center justify-center gap-2 bg-warn-soft text-warn text-xs font-medium border-b border-border"
    >
      <WifiOff size={14} strokeWidth={1.5} aria-hidden />
      <span>You're offline — changes will sync when reconnected.</span>
      {pendingChanges > 0 && <span className="opacity-70">{pendingChanges} pending</span>}
    </div>
  )
}
