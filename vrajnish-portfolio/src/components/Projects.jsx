import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { projects } from '../data.js'

export default function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Projects"
      title="Selected work"
      intro="A few things I have built. Replace these with your real projects in src/data.js."
    >
      <Reveal className="overflow-hidden rounded-3xl border border-line bg-surface">
        {projects.map((p, i) => (
          <a
            key={p.name}
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={`group grid gap-4 p-7 transition-colors hover:bg-surface-2 md:grid-cols-[220px_1fr_24px] md:gap-8 ${
              i > 0 ? 'border-t border-line' : ''
            }`}
          >
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {p.tag}
              </p>
            </div>
            <div>
              <p className="font-light leading-relaxed text-muted">{p.text}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <Icon
              name="arrow"
              size={20}
              className="hidden text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block"
            />
          </a>
        ))}
      </Reveal>
    </Section>
  )
}
