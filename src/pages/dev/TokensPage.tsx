import { useLayoutEffect, useRef, useState } from 'react'
import { mergeClassNames } from '../../lib/mergeClassNames'
import { useTheme, type Theme } from '../../theme/ThemeContext'

// Class names are written out in full so Tailwind can see them.
const COLOR_GROUPS: { title: string; swatches: { name: string; className: string }[] }[] = [
  {
    title: 'Surfaces',
    swatches: [
      { name: 'bg', className: 'bg-bg' },
      { name: 'surface', className: 'bg-surface' },
      { name: 'surface-2', className: 'bg-surface-2' },
      { name: 'surface-3', className: 'bg-surface-3' },
      { name: 'border', className: 'bg-border' },
      { name: 'border-2', className: 'bg-border-2' },
      { name: 'ring-bg', className: 'bg-ring-bg' },
    ],
  },
  {
    title: 'Text',
    swatches: [
      { name: 'fg', className: 'bg-fg' },
      { name: 'fg-2', className: 'bg-fg-2' },
      { name: 'fg-3', className: 'bg-fg-3' },
    ],
  },
  {
    title: 'Accent',
    swatches: [
      { name: 'accent', className: 'bg-accent' },
      { name: 'accent-hover', className: 'bg-accent-hover' },
      { name: 'accent-soft', className: 'bg-accent-soft' },
      { name: 'accent-text', className: 'bg-accent-text' },
    ],
  },
  {
    title: 'Status',
    swatches: [
      { name: 'success', className: 'bg-success' },
      { name: 'success-soft', className: 'bg-success-soft' },
      { name: 'warn', className: 'bg-warn' },
      { name: 'warn-soft', className: 'bg-warn-soft' },
      { name: 'danger', className: 'bg-danger' },
      { name: 'danger-soft', className: 'bg-danger-soft' },
      { name: 'info', className: 'bg-info' },
      { name: 'info-soft', className: 'bg-info-soft' },
    ],
  },
]

const LABEL_SWATCHES = [
  { hue: 'gray', pill: 'bg-label-gray-bg text-label-gray-fg', dot: 'bg-label-gray-fg' },
  { hue: 'red', pill: 'bg-label-red-bg text-label-red-fg', dot: 'bg-label-red-fg' },
  { hue: 'orange', pill: 'bg-label-orange-bg text-label-orange-fg', dot: 'bg-label-orange-fg' },
  { hue: 'yellow', pill: 'bg-label-yellow-bg text-label-yellow-fg', dot: 'bg-label-yellow-fg' },
  { hue: 'green', pill: 'bg-label-green-bg text-label-green-fg', dot: 'bg-label-green-fg' },
  { hue: 'teal', pill: 'bg-label-teal-bg text-label-teal-fg', dot: 'bg-label-teal-fg' },
  { hue: 'blue', pill: 'bg-label-blue-bg text-label-blue-fg', dot: 'bg-label-blue-fg' },
  { hue: 'purple', pill: 'bg-label-purple-bg text-label-purple-fg', dot: 'bg-label-purple-fg' },
  { hue: 'pink', pill: 'bg-label-pink-bg text-label-pink-fg', dot: 'bg-label-pink-fg' },
]

const TYPE_SCALE = [
  { name: '2xl', className: 'text-2xl font-semibold', use: 'Hero' },
  { name: 'xl', className: 'text-xl font-semibold', use: 'Page titles' },
  { name: 'lg', className: 'text-lg font-semibold', use: 'Card detail title' },
  { name: 'md', className: 'text-md font-semibold', use: 'Section / empty-state titles' },
  { name: 'md-sm', className: 'text-md-sm font-semibold', use: 'Board name' },
  { name: 'base', className: 'text-base', use: 'Auth, docs' },
  { name: 'sm', className: 'text-sm', use: 'App body' },
  { name: 'xs', className: 'text-xs', use: 'Meta, table cells' },
  { name: '2xs', className: 'text-2xs font-medium', use: 'Pills, section labels' },
  { name: '3xs', className: 'text-3xs font-mono', use: 'Kbd' },
]

/** Converts a computed `rgb()`/`rgba()` color into `#RRGGBB`, with the alpha as a percentage when translucent. */
function rgbToHex(rgbColor: string) {
  const rgbMatch = rgbColor.match(/rgba?\(([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)(?:\s*[/,]\s*([\d.]+))?\)/)
  if (!rgbMatch) return rgbColor
  const [, red, green, blue, alpha] = rgbMatch
  const hex = [red, green, blue]
    .map((channel) => Math.round(Number(channel)).toString(16).padStart(2, '0'))
    .join('')
  const alphaSuffix = alpha !== undefined && Number(alpha) < 1 ? ` / ${Math.round(Number(alpha) * 100)}%` : ''
  return `#${hex.toUpperCase()}${alphaSuffix}`
}

function Swatch({ name, className }: { name: string; className: string }) {
  const swatchRef = useRef<HTMLDivElement>(null)
  const [resolvedColor, setResolvedColor] = useState('')

  useLayoutEffect(() => {
    if (swatchRef.current) setResolvedColor(rgbToHex(getComputedStyle(swatchRef.current).backgroundColor))
  }, [])

  return (
    <div className="flex items-center gap-2">
      <div ref={swatchRef} className={mergeClassNames('size-8 shrink-0 rounded-control border border-border', className)} />
      <div className="min-w-0">
        <div className="text-xs font-medium text-fg">{name}</div>
        <div className="font-mono text-2xs text-fg-3">{resolvedColor}</div>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return <h3 className="text-2xs font-semibold uppercase tracking-label text-fg-3">{children}</h3>
}

function ThemePanel({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <section data-theme={theme} className="flex min-w-0 flex-col gap-6 rounded-card border border-border bg-bg p-4 text-fg">
      <h2 className="text-md font-semibold capitalize">{theme}</h2>

      {COLOR_GROUPS.map((group) => (
        <div key={group.title} className="flex flex-col gap-2">
          <SectionLabel>{group.title}</SectionLabel>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {group.swatches.map((swatch) => (
              <Swatch key={swatch.name} {...swatch} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <SectionLabel>Labels</SectionLabel>
        <div className="flex flex-wrap gap-1">
          {LABEL_SWATCHES.map((label) => (
            <span key={label.hue} className={mergeClassNames('rounded-full px-2 text-2xs font-medium capitalize', label.pill)}>
              {label.hue}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {LABEL_SWATCHES.map((label) => (
            <span key={label.hue} className="inline-flex items-center gap-1.5 text-xs capitalize text-fg-2">
              <span className={mergeClassNames('size-2 rounded-xs', label.dot)} />
              {label.hue}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SectionLabel>Elevation, radius and focus</SectionLabel>
        <div className="flex flex-wrap items-center gap-4">
          <div className="grid h-16 w-28 place-items-center rounded-card border border-border bg-surface text-xs text-fg-2">
            border
          </div>
          <div className="grid h-16 w-28 place-items-center rounded-card border border-border bg-surface text-xs text-fg-2 shadow-pop">
            shadow-pop
          </div>
          <button
            type="button"
            className="focus-ring h-7.5 rounded-control border border-border-2 bg-surface px-3 text-sm font-medium"
          >
            Tab to focus
          </button>
        </div>
      </div>
    </section>
  )
}

const THEME_OPTIONS: Theme[] = ['system', 'light', 'dark']

export function TokensPage() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 md:px-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Design tokens</h1>
          <p className="text-sm text-fg-2">Every color token in both themes, plus the type scale.</p>
        </div>
        <div role="radiogroup" aria-label="Theme" className="flex gap-0.5 rounded-control border border-border bg-surface p-0.5">
          {THEME_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={theme === option}
              onClick={() => setTheme(option)}
              className={mergeClassNames(
                'focus-ring h-6 rounded-xs border border-transparent px-2 text-xs font-medium capitalize text-fg-2 transition-colors hover:bg-surface-2 hover:text-fg',
                theme === option && 'bg-accent-soft text-accent-text hover:bg-accent-soft hover:text-accent-text',
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </header>
      <p className="text-xs text-fg-3">Page theme: {resolvedTheme}. The panels below are pinned to light and dark.</p>

      <div className="grid gap-4 lg:grid-cols-2">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>

      <section className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
        <SectionLabel>Type scale</SectionLabel>
        {TYPE_SCALE.map((typeStyle) => (
          <div key={typeStyle.name} className="flex items-baseline gap-4 border-b border-border pb-2 last:border-0">
            <span className="w-14 shrink-0 font-mono text-2xs text-fg-3">{typeStyle.name}</span>
            <span className={mergeClassNames('min-w-0 flex-1 truncate', typeStyle.className)}>Design onboarding v2</span>
            <span className="hidden shrink-0 text-xs text-fg-3 sm:block">{typeStyle.use}</span>
          </div>
        ))}
      </section>
    </main>
  )
}
