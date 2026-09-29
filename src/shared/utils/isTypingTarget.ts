// Single-key shortcuts shouldn't fire while the user is typing somewhere.
export const isTypingTarget = (eventTarget: EventTarget | null) => {
  if (!(eventTarget instanceof HTMLElement)) return false
  if (eventTarget.isContentEditable) return true

  return eventTarget.closest('input, textarea, select, [contenteditable="true"]') !== null
}
