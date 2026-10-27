import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { skills } from '../data.js'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I work with every day">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal
            key={g.group}
            delay={i * 70}
            className="rounded-3xl border border-line bg-surface p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{g.group}</p>
            <ul className="mt-4 space-y-2.5">
              {g.items.map((it) => (
                <li key={it} className="text-sm text-muted">
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
