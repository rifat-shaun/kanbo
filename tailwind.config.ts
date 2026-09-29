/*
 * Kanbo design tokens, loaded by Tailwind v4 through `@config` in src/index.css.
 *
 * Semantic colors are CSS variables holding space-separated RGB channels, written per theme
 * by the base plugin below, so opacity modifiers (bg-accent/10) work. Dark-mode borders and
 * soft fills are translucent, so they carry their own alpha variables.
 */
import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

type CssVariables = Record<string, string>

const LIGHT_THEME_VARIABLES: CssVariables = {
  '--bg': '249 250 251', // #F9FAFB
  '--surface': '255 255 255', // #FFFFFF
  '--surface-2': '243 244 246', // #F3F4F6
  '--surface-3': '229 231 235', // #E5E7EB
  '--border': '229 231 235', '--border-alpha': '1', // #E5E7EB
  '--border-2': '209 213 219', '--border-2-alpha': '1', // #D1D5DB
  '--text': '17 24 39', // #111827
  '--text-2': '75 85 99', // #4B5563
  '--text-3': '107 114 128', // #6B7280
  '--accent': '99 102 241', // #6366F1
  '--accent-hover': '79 70 229', // #4F46E5
  '--accent-soft': '238 242 255', '--accent-soft-alpha': '1', // #EEF2FF
  '--accent-text': '67 56 202', // #4338CA
  '--success': '22 163 74', '--success-soft': '220 252 231', '--success-soft-alpha': '1',
  '--warn': '217 119 6', '--warn-soft': '254 243 199', '--warn-soft-alpha': '1',
  '--danger': '220 38 38', '--danger-soft': '254 226 226', '--danger-soft-alpha': '1',
  '--info': '37 99 235', '--info-soft': '219 234 254', '--info-soft-alpha': '1',
  '--ring-bg': '255 255 255',
  '--shadow-pop': '0 8px 24px rgba(0, 0, 0, .12)',
  // label palette: bg / fg
  '--label-gray-bg': '243 244 246', '--label-gray-fg': '55 65 81',
  '--label-red-bg': '254 226 226', '--label-red-fg': '153 27 27',
  '--label-orange-bg': '255 237 213', '--label-orange-fg': '154 52 18',
  '--label-yellow-bg': '254 249 195', '--label-yellow-fg': '133 77 14',
  '--label-green-bg': '220 252 231', '--label-green-fg': '22 101 52',
  '--label-teal-bg': '204 251 241', '--label-teal-fg': '17 94 89',
  '--label-blue-bg': '219 234 254', '--label-blue-fg': '30 64 175',
  '--label-purple-bg': '237 233 254', '--label-purple-fg': '91 33 182',
  '--label-pink-bg': '252 231 243', '--label-pink-fg': '157 23 77',
  '--label-bg-alpha': '1',
  'color-scheme': 'light',
}

const DARK_THEME_VARIABLES: CssVariables = {
  '--bg': '11 12 15', // #0B0C0F
  '--surface': '20 22 27', // #14161B
  '--surface-2': '28 31 38', // #1C1F26
  '--surface-3': '38 42 51', // #262A33
  '--border': '255 255 255', '--border-alpha': '.08',
  '--border-2': '255 255 255', '--border-2-alpha': '.12',
  '--text': '243 244 246', // #F3F4F6
  '--text-2': '161 161 170', // #A1A1AA
  '--text-3': '113 113 122', // #71717A
  '--accent': '99 102 241',
  '--accent-hover': '129 140 248', // #818CF8
  '--accent-soft': '99 102 241', '--accent-soft-alpha': '.16',
  '--accent-text': '165 180 252', // #A5B4FC
  '--success': '74 222 128', '--success-soft': '34 197 94', '--success-soft-alpha': '.16',
  '--warn': '251 191 36', '--warn-soft': '245 158 11', '--warn-soft-alpha': '.16',
  '--danger': '248 113 113', '--danger-soft': '239 68 68', '--danger-soft-alpha': '.16',
  '--info': '96 165 250', '--info-soft': '59 130 246', '--info-soft-alpha': '.16',
  '--ring-bg': '20 22 27',
  '--shadow-pop': '0 8px 24px rgba(0, 0, 0, .55)',
  '--label-gray-bg': '156 163 175', '--label-gray-fg': '209 213 219',
  '--label-red-bg': '239 68 68', '--label-red-fg': '252 165 165',
  '--label-orange-bg': '249 115 22', '--label-orange-fg': '253 186 116',
  '--label-yellow-bg': '234 179 8', '--label-yellow-fg': '253 224 71',
  '--label-green-bg': '34 197 94', '--label-green-fg': '134 239 172',
  '--label-teal-bg': '20 184 166', '--label-teal-fg': '94 234 212',
  '--label-blue-bg': '59 130 246', '--label-blue-fg': '147 197 253',
  '--label-purple-bg': '139 92 246', '--label-purple-fg': '196 181 253',
  '--label-pink-bg': '236 72 153', '--label-pink-fg': '249 168 212',
  '--label-bg-alpha': '.16',
  'color-scheme': 'dark',
}

/** Builds a Tailwind color from an RGB channel variable, optionally with a fixed alpha variable. */
const colorFromVariable = (channelVariable: string, alphaVariable?: string) =>
  `rgb(var(--${channelVariable}) / ${alphaVariable ? `var(--${alphaVariable})` : '<alpha-value>'})`

const LABEL_HUES = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple', 'pink'] as const

// Theme variables, base styles and utilities that have no theme key.
const kanboBasePlugin = plugin(({ addBase, addUtilities }) => {
  addBase({
    ':root, [data-theme="light"]': LIGHT_THEME_VARIABLES,
    '[data-theme="dark"]': DARK_THEME_VARIABLES,
    html: {
      'font-family': 'Inter, system-ui, sans-serif',
      background: 'rgb(var(--bg))',
      color: 'rgb(var(--text))',
      '-webkit-font-smoothing': 'antialiased',
    },
    body: { margin: '0', 'font-size': '13px', 'line-height': '1.45' },
    '@media (prefers-reduced-motion: reduce)': {
      '*, *::before, *::after': {
        'animation-duration': '.01ms !important',
        'transition-duration': '.01ms !important',
      },
    },
  })

  // Channel variables are used directly so these follow the nearest [data-theme] scope.
  addUtilities({
    // Shared focus style for every interactive element.
    '.focus-ring': {
      '&:focus-visible': {
        outline: 'none',
        'border-color': 'rgb(var(--accent))',
        'box-shadow': '0 0 0 3px rgb(var(--accent-soft) / var(--accent-soft-alpha))',
      },
    },
    '.bg-skeleton': {
      'background-image': 'linear-gradient(90deg, rgb(var(--surface-3)), rgb(var(--surface-2)), rgb(var(--surface-3)))',
      'background-size': '200% 100%',
    },
  })
})

export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    // Replaces Tailwind's palette so only Kanbo colors exist.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#fff',
      black: '#000',
      bg: colorFromVariable('bg'),
      surface: colorFromVariable('surface'),
      'surface-2': colorFromVariable('surface-2'),
      'surface-3': colorFromVariable('surface-3'),
      border: colorFromVariable('border', 'border-alpha'),
      'border-2': colorFromVariable('border-2', 'border-2-alpha'),
      fg: colorFromVariable('text'),
      'fg-2': colorFromVariable('text-2'),
      'fg-3': colorFromVariable('text-3'),
      accent: {
        DEFAULT: colorFromVariable('accent'),
        hover: colorFromVariable('accent-hover'),
        soft: colorFromVariable('accent-soft', 'accent-soft-alpha'),
        text: colorFromVariable('accent-text'),
      },
      success: { DEFAULT: colorFromVariable('success'), soft: colorFromVariable('success-soft', 'success-soft-alpha') },
      warn: { DEFAULT: colorFromVariable('warn'), soft: colorFromVariable('warn-soft', 'warn-soft-alpha') },
      danger: { DEFAULT: colorFromVariable('danger'), soft: colorFromVariable('danger-soft', 'danger-soft-alpha') },
      info: { DEFAULT: colorFromVariable('info'), soft: colorFromVariable('info-soft', 'info-soft-alpha') },
      'ring-bg': colorFromVariable('ring-bg'),
      label: Object.fromEntries(
        LABEL_HUES.map((hue) => [
          hue,
          { bg: colorFromVariable(`label-${hue}-bg`, 'label-bg-alpha'), fg: colorFromVariable(`label-${hue}-fg`) },
        ]),
      ),
    },
    // Replaces Tailwind's type scale so only these sizes exist.
    fontSize: {
      '3xs': ['10px', { lineHeight: '14px' }], // kbd
      '2xs': ['11px', { lineHeight: '16px' }], // pills, section labels
      xs: ['12px', { lineHeight: '18px' }], // meta, table cells
      sm: ['13px', { lineHeight: '19px' }], // app body
      base: ['14px', { lineHeight: '21px' }], // auth, docs
      'md-sm': ['15px', { lineHeight: '22px' }], // board name, mobile body
      md: ['16px', { lineHeight: '24px' }], // section / empty-state titles
      lg: ['20px', { lineHeight: '26px', letterSpacing: '-0.01em' }], // card detail title
      xl: ['24px', { lineHeight: '30px', letterSpacing: '-0.01em' }], // page titles
      '2xl': ['32px', { lineHeight: '38px', letterSpacing: '-0.02em' }], // hero
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { label: '.04em' },
      borderRadius: { xs: '4px', control: '6px', card: '10px' },
      boxShadow: {
        pop: 'var(--shadow-pop)',
        focus: '0 0 0 3px rgb(var(--accent-soft) / var(--accent-soft-alpha))',
      },
      transitionDuration: { fast: '120ms', DEFAULT: '150ms', slow: '180ms', sidebar: '160ms' },
      transitionTimingFunction: { DEFAULT: 'cubic-bezier(0, 0, .2, 1)', out: 'cubic-bezier(0, 0, .2, 1)' },
      keyframes: {
        'kanbo-shimmer': { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        'kanbo-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgb(99 102 241 / .55)' },
          '100%': { boxShadow: '0 0 0 10px rgb(99 102 241 / 0)' },
        },
      },
      animation: {
        shimmer: 'kanbo-shimmer 1.4s linear infinite',
        pulse: 'kanbo-pulse 1.6s ease-out 3',
      },
      width: {
        sidebar: '240px',
        rail: '56px',
        column: '280px',
        slideover: '640px',
        palette: '640px',
        popover: '240px',
      },
    },
  },
  plugins: [kanboBasePlugin],
} satisfies Config
