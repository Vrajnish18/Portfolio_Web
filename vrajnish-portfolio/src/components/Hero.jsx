import Avatar from './Avatar.jsx'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'
import { profile, stats } from '../data.js'
import StrokeText from '../ReactBits/StrokeText.jsx'

const metaLink =
  'inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink'

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_340px]">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1 text-[12px] font-medium">
              <span className="pulse-dot h-2 w-2 rounded-full bg-accent" />
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <StrokeText
                text={profile.name}
                strokeColor="#ff7a45"
                strokeStyle="solid"
                strokeWidth={1.4}
                dashLength={10}
                drawDuration={2.2}
                fillDelay={0.4}
                stagger={0.08}
                ease="power2.out"
                trigger="mount"
                fillMode="wipe"
                wipeFrom="left"
                fontSize={60}
                fontWeight={400}
                letterSpacing={-4}
                marching={false}
                hoverRedraw
                shadow={false}
                fontFamily="inherit"
                reverse={false}
              />
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-5 text-[16px] font-medium sm:text-[20px]">
              <span className="text-accent">{profile.role}</span>
              {profile.stack.map((s) => (
                <span key={s} className="text-muted">
                  {' '}
                  · {s}
                </span>
              ))}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className={metaLink}>
                <Icon name="pin" size={16} />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`} className={metaLink}>
                <Icon name="mail" size={16} />
                {profile.email}
              </a>
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className={metaLink}>
                <Icon name="github" size={16} />
                GitHub
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className={metaLink}>
                <Icon name="linkedin" size={16} />
                LinkedIn
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-9 max-w-2xl border-l-2 border-accent/60 pl-6 text-md font-light leading-relaxed text-muted">
              {profile.bio}
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                Start a project <Icon name="arrow" size={16} />
              </a>
              <a
                href="#work"
                className="inline-flex items-center rounded-full border border-line bg-surface px-7 py-3 text-sm font-medium transition-colors hover:border-accent"
              >
                View my work
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mx-auto w-full max-w-[300px] lg:max-w-none">
          <Avatar className="aspect-square w-full" />
        </Reveal>
      </div>

      <div className="mt-20">
        <p className="eyebrow mb-5">:: Highlights</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 70}
              className="rounded-3xl border border-line bg-surface p-6"
            >
              <p className="text-4xl font-semibold tracking-tight">{s.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
