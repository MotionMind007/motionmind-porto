// ══ DEFAULT DATA ══
const DEFAULTS = {
  profile: {
    name: 'MotionMind',
    location: 'Jayapura, Papua',
    timezone: 'WIT · UTC+9',
    available: true,
    description: 'Full-stack developer & AI engineer — crafting autonomous systems and pixel-perfect interfaces from the edge of Indonesia.',
    specialties: ['Web Dev', 'AI Agent', 'Automation'],
    email: 'motionmind007@gmail.com',
    whatsapp: '+62 852-4484-7978',
    whatsappLink: 'https://wa.me/6285244847978',
    github: 'MotionMind007',
    githubLink: 'https://github.com/MotionMind007',
    instagram: '@motionmind.id',
    instagramLink: 'https://instagram.com/motionmind.id',
    stats: [
      { value: '10+', label: 'projects', variant: 'gradient' },
      { value: '∞', label: 'automations', variant: 'green' },
      { value: '1+', label: 'years', variant: 'gradient' },
    ],
  },
  services: [
    {
      id: 1,
      title: 'Web Development',
      description: 'Pixel-perfect websites with cinematic animations. SSR, edge-deployed, Lighthouse 100.',
      tags: ['Next.js', 'React', 'Tailwind', 'GSAP'],
      color: 'blue',
      icon: 'Layout',
    },
    {
      id: 2,
      title: 'WebApps & SaaS',
      description: 'Full-stack scalable apps. Auth, payments, real-time — production-ready from day one.',
      tags: ['Node.js', 'PostgreSQL', 'Supabase'],
      color: 'purple',
      icon: 'Layers',
    },
    {
      id: 3,
      title: 'AI Automation',
      description: 'Eliminate manual workflows with intelligent pipelines. Trigger-based, always-on systems.',
      tags: ['n8n', 'Make.com', 'Python'],
      color: 'cyan',
      icon: 'Workflow',
    },
    {
      id: 4,
      title: 'AI Agent Systems',
      description: 'Multi-agent orchestration, RAG pipelines, memory-augmented agents that execute autonomously.',
      tags: ['LangChain', 'CrewAI', 'Claude API', 'RAG'],
      color: 'green',
      icon: 'Bot',
    },
  ],
  projects: [
    { id: 1, title: 'SENA - Sentimen & Narative Analityc', tech: 'political intelligence · ai agent · sentiment analysis · NLP', badge: 'AI Agent', color: 'purple', status: 'development', link: '', thumbnail: '' },
    { id: 2, title: 'Website PSI Papua', tech: 'next.js · tailwind · cms · responsive design', badge: 'Web App', color: 'blue', status: 'finished', link: '', thumbnail: '' },
    { id: 3, title: 'SmartGov - Aplikasi Laporan Masyarakat', tech: 'next.js · supabase · real-time · dashboard analytics', badge: 'Web App', color: 'blue', status: 'demo', link: '', thumbnail: '' },
    { id: 4, title: 'AI Agent Automation', tech: 'crewai · claude api · n8n · multi-agent orchestration', badge: 'Automation', color: 'cyan', status: 'finished', link: '', thumbnail: '' },
  ],
  techStack: ['React', 'Next.js', 'Node.js', 'Python', 'LangChain', 'CrewAI', 'Claude', 'n8n', 'Supabase', 'Docker', 'Postgres', 'Vercel'],
  marqueeItems: ['React', 'Next.js', 'TypeScript', 'Python', 'LangChain', 'CrewAI', 'Claude API', 'OpenAI', 'n8n', 'Supabase', 'Docker', 'Tailwind', 'Framer Motion'],
}

const STORAGE_KEY = 'motionmind_data'

// ══ DATA MANAGER ══
export const DataManager = {
  getAll() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch { /* fallback to defaults */ }
    return DEFAULTS
  },
  saveAll(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY)
  },
}

// ══ CONVENIENCE EXPORTS ══
export function getData() {
  return DataManager.getAll()
}

export const { profile, services, projects, techStack, marqueeItems } = getData()
