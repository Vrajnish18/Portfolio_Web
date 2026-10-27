import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { services } from '../data.js'

export default function Services() {
  return (
    <Section
      id="services"
      eyebrow="Services"
      title="What I can build for you"
      intro="Clear scope, honest timelines and clean code. Here is where I can help most."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal
            key={s.title}
            delay={i * 80}
            className="group rounded-3xl border border-line bg-surface p-7 transition-colors hover:border-accent/60"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Icon name={s.icon} size={22} />
            </span>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
            <p className="mt-2 font-light leading-relaxed text-muted">{s.text}</p>
            <ul className="mt-5 space-y-2 text-sm">
              {s.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5">
                  <Icon name="check" size={15} className="shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
