// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio. Everything on the
//  page is read from here — no need to touch the components.
//  Items marked (placeholder) are samples; replace them.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Vrajnish Aghera',
  role: 'Frontend Developer',
  stack: ['React', 'Tailwind CSS', 'JavaScript'],
  availability: 'Available for freelance projects',
  location: 'India', // (placeholder) e.g. "Surat, Gujarat, India"
  email: 'agheravrajnish188@gmail.com',
  bio: 'Frontend developer who turns designs and rough ideas into fast, accessible, pixel-accurate interfaces. I build with React and Tailwind CSS, care about the small details, and enjoy working directly with founders and small teams, from first call to launch.',
  socials: {
    github: 'https://github.com/', // (placeholder) add your profile URL
    linkedin: 'https://www.linkedin.com/', // (placeholder)
  },
  platforms: [
    // (placeholder) add your freelance profiles, or delete the entries
    { label: 'Upwork', href: 'https://www.upwork.com/' },
    { label: 'Fiverr', href: 'https://www.fiverr.com/' },
  ],
}

export const stats = [
  // (placeholder) replace with your real numbers
  { value: '2+', label: 'years building production interfaces' },
  { value: '15+', label: 'projects shipped for clients and teams' },
  { value: '100', label: 'Lighthouse performance target on every build' },
  { value: '24h', label: 'typical first reply to new enquiries' },
]

export const services = [
  {
    icon: 'layout',
    title: 'Landing pages & websites',
    text: 'Fast, responsive marketing sites that look sharp on every screen and are easy for you to update.',
    points: ['Responsive from 320px up', 'SEO-ready markup', 'Light and dark themes'],
  },
  {
    icon: 'code',
    title: 'React web applications',
    text: 'Dashboards, SaaS front ends and internal tools built with clean, maintainable component code.',
    points: ['Reusable component systems', 'API and auth integration', 'State management done simply'],
  },
  {
    icon: 'pen',
    title: 'Design to code',
    text: 'Figma or screenshots turned into pixel-accurate React and Tailwind, with spacing and type matched.',
    points: ['Faithful to the design', 'Accessible by default', 'Handoff-friendly code'],
  },
  {
    icon: 'zap',
    title: 'Performance & fixes',
    text: 'Slow page, broken layout or messy codebase? I audit, fix and leave the project in better shape.',
    points: ['Core Web Vitals tuning', 'Bug fixing and refactors', 'Cross-browser testing'],
  },
]

export const projects = [
  // (placeholder) replace with your real projects
  {
    name: 'Project One',
    tag: 'Client work',
    text: 'Short description of what you built, who it was for and the result. One or two sentences works best.',
    tech: ['React', 'Tailwind CSS', 'REST API'],
    href: '#',
  },
  {
    name: 'Project Two',
    tag: 'Product',
    text: 'Another project. Mention the problem it solved and your part in it, for example the dashboard UI.',
    tech: ['React', 'Vite', 'Chart.js'],
    href: '#',
  },
  {
    name: 'Project Three',
    tag: 'Open source',
    text: 'A side project or open source tool that shows how you think about code and design.',
    tech: ['JavaScript', 'Tailwind CSS'],
    href: '#',
  },
  {
    name: 'Project Four',
    tag: 'Side project',
    text: 'Anything you are proud of, even a small utility. Real links make the strongest impression.',
    tech: ['React', 'Firebase'],
    href: '#',
  },
]

export const skills = [
  { group: 'Core', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript'] },
  { group: 'Frameworks', items: ['React', 'Next.js', 'Tailwind CSS', 'Vite'] },
  { group: 'Tooling', items: ['Git & GitHub', 'Figma', 'REST APIs', 'Vercel / Netlify'] },
  { group: 'Quality', items: ['Responsive design', 'Accessibility', 'Web performance', 'SEO basics'] },
]

export const process = [
  { title: 'Discover', text: 'A short call or message to understand your goals, audience, deadline and budget.' },
  { title: 'Plan', text: 'A clear scope, timeline and fixed quote, so you know what you get and when.' },
  { title: 'Build', text: 'Regular progress links to review as it grows, with feedback built into every step.' },
  { title: 'Launch & support', text: 'Deployment, handover and 30 days of free fixes after the project goes live.' },
]

export const engagement = [
  { title: 'Fixed-price project', text: 'Best for websites and well-defined features with a clear scope and deadline.' },
  { title: 'Hourly', text: 'Best for fixes, audits and work where the scope will change as we go.' },
  { title: 'Monthly retainer', text: 'Best for ongoing product work and a front-end developer on call each month.' },
]
