import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// tailwind-merge needs to know our custom theme keys, otherwise `text-2xs` and `text-fg` clobber each other.
const mergeTailwindClasses = extendTailwindMerge({
  extend: {
    theme: {
      text: ['3xs', '2xs', 'xs', 'sm', 'base', 'md-sm', 'md', 'lg', 'xl', '2xl'],
      radius: ['xs', 'control', 'card'],
      shadow: ['pop', 'focus'],
      container: ['sidebar', 'rail', 'column', 'slideover', 'palette', 'popover'],
    },
  },
})

export const mergeClassNames = (...classNames: ClassValue[]) => mergeTailwindClasses(clsx(classNames))
