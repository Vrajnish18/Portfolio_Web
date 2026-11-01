// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE to update your portfolio. Everything on the
//  page is read from here — no need to touch the components.
//  Items marked (placeholder) are samples; replace them.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Vrajnish Aghera',
  role: 'Web Developer',
  stack: [],
  availability: 'Available for freelance projects',
  location: 'India', // (placeholder) e.g. "Surat, Gujarat, India"
  email: 'vrajnishaghera18@gmail.com',
  bio: 'Web developer who turns designs and rough ideas into fast, accessible, pixel-accurate interfaces. I build with React and Tailwind CSS, care about the small details, and enjoy working directly with founders and small teams, from first call to launch.',
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
    title: 'Web Application Development',
    text: 'Building responsive, scalable and user-friendly web applications using React.js, TypeScript and modern frontend technologies.',
    points: [
      'Reusable React components',
      'Responsive UI development',
      'Modern frontend architecture',
    ],
  },
  {
    icon: 'code',
    title: 'Dashboard & Admin Panel Development',
    text: 'Developing production-ready dashboards and admin panels with dynamic data, role-based access and interactive interfaces.',
    points: [
      'Role-based access control (RBAC)',
      'Dynamic tables and data management',
      'Multi-role dashboard interfaces',
    ],
  },
  {
    icon: 'zap',
    title: 'API Integration & State Management',
    text: 'Integrating REST APIs and managing application data to create smooth and reliable frontend experiences.',
    points: [
      'REST API integration',
      'Authentication and authorization',
      'Context API and Redux fundamentals',
    ],
  },
  {
    icon: 'settings',
    title: 'Code Quality & Optimization',
    text: 'Writing maintainable frontend code, debugging application issues and improving existing user interfaces.',
    points: [
      'Component reusability',
      'Debugging and bug fixing',
      'Responsive and cross-browser compatibility',
    ],
  },
]

export const projects = [
  {
    name: 'Aookly',
    tag: 'Production Application',
    text: 'Worked on a React-based social marketplace platform, developing responsive interfaces, dynamic dashboards, role-based permissions and reusable components. Integrated REST APIs and contributed to multiple application modules.',
    tech: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'REST APIs',
      'Context API',
    ],
    href: '#',
  },
  {
    name: 'Banas AI HR',
    tag: 'Enterprise HR Management',
    text: 'Developed frontend modules for an HR management application, including employee management, animal registration workflows, searchable dropdowns, dynamic forms and API-driven data management.',
    tech: [
      'React.js',
      'JavaScript',
      'REST APIs',
      'Material UI',
      'Axios',
    ],
    href: '#',
  },
  {
    name: 'Leafy Lion Café',
    tag: 'Website Development',
    text: 'Designed and developed a responsive business website with a modern interface, structured content sections and mobile-friendly layouts.',
    tech: [
      'React.js',
      'Tailwind CSS',
      'JavaScript',
      'Responsive Design',
    ],
    href: 'https://vrajnish18.github.io/Leafy-Lion-Cafe/',
  },
  {
    name: 'Personal Developer Portfolio',
    tag: 'Personal Project',
    text: 'Designed and developed a personal portfolio to showcase frontend development skills, technical experience, projects and professional background.',
    tech: [
      'React.js',
      'Tailwind CSS',
      'JavaScript',
      'CSS',
    ],
    href: '#',
  },
]

export const skills = [
  {
    group: 'Frontend Development',
    items: [
      'HTML5',
      'CSS3',
      'JavaScript (ES6+)',
      'TypeScript',
      'React.js',
    ],
  },
  {
    group: 'UI & Styling',
    items: [
      'Tailwind CSS',
      'Material UI',
      'Bootstrap',
      'Responsive Design',
      'jQuery',
    ],
  },
  {
    group: 'API & State Management',
    items: [
      'REST API Integration',
      'Axios',
      'Context API',
      'Redux Toolkit',
      'JSON',
    ],
  },
  {
    group: 'Development Tools',
    items: [
      'Git',
      'GitHub',
      'Git Desktop',
      'VS Code',
      'Figma',
      'Vite',
    ],
  },
]

export const process = [
  {
    title: 'Understand Requirements',
    text: 'Understand project requirements, application workflows and technical specifications before starting development.',
  },
  {
    title: 'Develop & Implement',
    text: 'Build responsive user interfaces using reusable React components and maintainable code structures.',
  },
  {
    title: 'Integrate & Test',
    text: 'Integrate APIs, handle dynamic application data, debug issues and verify functionality across different devices.',
  },
  {
    title: 'Maintain & Improve',
    text: 'Fix bugs, improve existing features, optimize interfaces and collaborate with team members to maintain application quality.',
  },
]

export const engagement = [
  {
    title: 'Component-Based Architecture',
    text: 'Building reusable, modular and maintainable React components for scalable applications.',
  },
  {
    title: 'Problem Solving',
    text: 'Debugging frontend issues, handling API responses and implementing practical solutions for application requirements.',
  },
  {
    title: 'Team Collaboration',
    text: 'Working with Git and GitHub, following development workflows and collaborating with team members.',
  },
]
