import { useState } from 'react'
import Section from './Section.jsx'
import Reveal from './Reveal.jsx'
import Icon from './Icon.jsx'
import { profile } from '../data.js'

const field =
  'w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'Website / landing page',
    budget: 'Not sure yet',
    message: '',
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = `Project enquiry: ${form.type}`
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.type}`,
      `Budget: ${form.budget}`,
      '',
      form.message,
    ].join('\n')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Have a project in mind?"
      intro="Tell me a little about it. I reply within a day, usually sooner."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="space-y-4">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-accent/60"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Icon name="mail" />
            </span>
            <span>
              <span className="block text-xs text-muted">Email</span>
              <span className="text-sm font-medium">{profile.email}</span>
            </span>
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-accent/60"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Icon name="linkedin" />
            </span>
            <span>
              <span className="block text-xs text-muted">LinkedIn</span>
              <span className="text-sm font-medium">Connect with me</span>
            </span>
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-accent/60"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-soft text-accent">
              <Icon name="github" />
            </span>
            <span>
              <span className="block text-xs text-muted">GitHub</span>
              <span className="text-sm font-medium">See my code</span>
            </span>
          </a>
          {profile.platforms.length > 0 && (
            <p className="px-1 pt-2 text-sm text-muted">
              Prefer a platform? Hire me on{' '}
              {profile.platforms.map((p, i) => (
                <span key={p.label}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    {p.label}
                  </a>
                  {i < profile.platforms.length - 1 ? ' or ' : '.'}
                </span>
              ))}
            </p>
          )}
        </Reveal>

        <Reveal delay={100}>
          <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-3xl border border-line bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">Your name</span>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  className={field}
                  placeholder="Jane Doe"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">Your email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={set('email')}
                  className={field}
                  placeholder="jane@company.com"
                />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">Project type</span>
                <select value={form.type} onChange={set('type')} className={field}>
                  <option>Website / landing page</option>
                  <option>React web application</option>
                  <option>Design to code</option>
                  <option>Performance or bug fixes</option>
                  <option>Something else</option>
                </select>
              </label>
              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">Budget</span>
                <select value={form.budget} onChange={set('budget')} className={field}>
                  <option>Not sure yet</option>
                  <option>Under $500</option>
                  <option>$500 – $1,500</option>
                  <option>$1,500 – $5,000</option>
                  <option>$5,000+</option>
                </select>
              </label>
            </div>
            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">About the project</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set('message')}
                className={`${field} resize-y`}
                placeholder="What are you building, and when do you need it?"
              />
            </label>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Send enquiry <Icon name="arrow" size={16} />
            </button>
            <p className="text-xs text-muted">
              This opens your email app with the details filled in.
            </p>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
