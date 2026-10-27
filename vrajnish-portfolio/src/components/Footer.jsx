import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>
          Built with React and Tailwind CSS ·{' '}
          <a href="#top" className="hover:text-ink">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  )
}
