import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the custom theme keys so e.g. `text-2xs` and `text-fg` don't clobber each other.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['3xs', '2xs', 'xs', 'sm', 'base', 'md-sm', 'md', 'lg', 'xl', '2xl'],
      radius: ['xs', 'control', 'card'],
      shadow: ['pop', 'focus'],
      container: ['sidebar', 'rail', 'column', 'slideover', 'palette', 'popover'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
