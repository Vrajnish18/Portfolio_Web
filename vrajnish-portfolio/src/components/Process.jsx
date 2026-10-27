import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import { process, engagement } from '../data.js'

export default function Process() {
  return (
    <Section
      id="process"
      eyebrow="How I work"
      title="A simple, transparent process"
      intro="No surprises. You always know what is happening, what is next and what it costs."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {process.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 80}
            className="rounded-3xl border border-line bg-surface p-6"
          >
            <p className="font-mono text-sm text-accent">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14">
        <p className="eyebrow">:: Ways to work together</p>
      </Reveal>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {engagement.map((e, i) => (
          <Reveal
            key={e.title}
            delay={i * 80}
            className="rounded-3xl border border-line bg-surface-2 p-6"
          >
            <h3 className="text-lg font-semibold tracking-tight">{e.title}</h3>
            <p className="mt-2 text-sm font-light leading-relaxed text-muted">{e.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
