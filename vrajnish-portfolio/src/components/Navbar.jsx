import { useState } from 'react'
import Icon from './Icon.jsx'
import { profile } from '../data.js'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Skills' },
  { href: '#process', label: 'Process' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false)
  const initials = profile.name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-sm font-semibold text-white">
            {initials}
          </span>
          <span className="text-lg font-semibold tracking-tight">
            {profile.name.split(' ')[0]}
            <span className="text-accent">.dev</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-85 sm:inline-block"
          >
            Hire me
          </a>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted md:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-bg px-5 py-3 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-muted hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pb-2 pt-1">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="block rounded-full bg-accent py-2.5 text-center text-sm font-medium text-white"
            >
              Hire me
            </a>
          </li>
        </ul>
      )}
    </header>
  )
}
