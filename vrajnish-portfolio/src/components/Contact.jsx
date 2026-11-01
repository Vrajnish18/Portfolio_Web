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
    mobile: '',
    subject: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    setStatus('')

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${profile.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            Name: form.name,
            Email: form.email,
            Mobile: form.mobile,
            Subject: form.subject,
            Message: form.message,
            _subject: `New Portfolio Enquiry: ${form.subject}`,
            _template: 'table',
            _captcha: 'true',
          }),
        }
      )

      const result = await response.json()

      if (!response.ok || result.success !== 'true') {
        throw new Error(result.message || 'Failed to send message')
      }

      setStatus('success')

      setForm({
        name: '',
        email: '',
        mobile: '',
        subject: '',
        message: '',
      })

    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="LET'S Connect"
      intro="Have an opportunity or want to connect? Send me a message. I'd be happy to hear from you."
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
              LET'S CONNECT
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
                <span className="mb-1.5 block text-muted">Name</span>
                <input
                  required
                  value={form.name}
                  onChange={set('name')}
                  className={field}
                  placeholder="Jane Doe"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">Email</span>
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
                <span className="mb-1.5 block text-muted">Mobile No.</span>
                <input
                  required
                  type="tel"
                  value={form.mobile}
                  onChange={set('mobile')}
                  className={field}
                  placeholder="e.g. 9876543210"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block text-muted">Subject</span>
                <input
                  required
                  type="text"
                  value={form.subject}
                  onChange={set('subject')}
                  className={field}
                  placeholder="Subject of your message"
                />
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-1.5 block text-muted">Message</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={set('message')}
                className={`${field} resize-y`}
                placeholder="Type your message here..."
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Message'}
              {!loading && <Icon name="arrow" size={16} />}
            </button>

            {status === 'success' && (
              <p className="text-sm text-green-500">
                Message sent successfully! Thank you for contacting me.
              </p>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-500">
                Failed to send message. Please try again later.
              </p>
            )}

            {!status && (
              <p className="text-xs text-muted">
                Your message will be delivered directly to my inbox.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  )
}