// ══ MOTIONMIND PORTFOLIO DATA ══
// Data ini bisa di-edit melalui Admin Panel
// Disimpan di localStorage, fallback ke default di bawah

const DEFAULT_DATA = {
  profile: {
    name: "MotionMind",
    tagline: "I Build Intelligent Digital Systems.",
    description: "Full-stack developer & AI engineer crafting high-performance web products and autonomous systems. From pixel-perfect UIs to multi-agent pipelines.",
    location: "Jayapura, Papua",
    timezone: "WIT · UTC+9",
    available: true,
    email: "motionmind007@gmail.com",
    whatsapp: "+62 852-4484-7978",
    whatsappLink: "https://wa.me/6285244847978",
    github: "MotionMind007",
    githubLink: "https://github.com/MotionMind007",
    instagram: "@motionmind.id",
    instagramLink: "https://instagram.com/motionmind.id",
    specialties: ["Web Dev", "AI Agent", "Automation"],
    stats: {
      projects: "10+",
      automations: "∞",
      years: "1+",
      committed: "100%"
    }
  },
  services: [
    {
      id: 1,
      number: "01",
      title: "Web Development",
      description: "Pixel-perfect websites with cinematic animations. SSR, edge-deployed, Lighthouse 100. Built to convert and impress.",
      tags: ["Next.js", "React", "GSAP", "Framer Motion", "Tailwind"],
      span: 7,
      iconColor: "cyan"
    },
    {
      id: 2,
      number: "02",
      title: "WebApps & SaaS",
      description: "Full-stack scalable apps. Auth, payments, real-time — production-ready from day one.",
      tags: ["Node.js", "PostgreSQL", "Supabase"],
      span: 5,
      iconColor: "violet"
    },
    {
      id: 3,
      number: "03",
      title: "AI Automation",
      description: "Eliminate manual workflows with intelligent pipelines. Trigger-based, API-integrated, always-on systems.",
      tags: ["n8n", "Make.com", "Python"],
      span: 5,
      iconColor: "violet"
    },
    {
      id: 4,
      number: "04",
      title: "AI Agent Systems",
      description: "Multi-agent orchestration, RAG pipelines, memory-augmented agents that reason, plan, and execute complex tasks fully autonomously.",
      tags: ["LangChain", "CrewAI", "Claude API", "OpenAI", "RAG", "Vector DB"],
      span: 7,
      iconColor: "cyan"
    }
  ],
  projects: [
    {
      id: 1,
      title: "SENA - Sentimen & Narative Analityc",
      tech: "political intelligence · ai agent · sentiment analysis · NLP pipeline",
      badge: "AI Agent",
      badgeClass: "b-ai"
    },
    {
      id: 2,
      title: "Website PSI Papua",
      tech: "next.js · tailwind · cms · responsive design",
      badge: "Web App",
      badgeClass: "b-web"
    },
    {
      id: 3,
      title: "SmartGov - Aplikasi Laporan Masyarakat",
      tech: "next.js · supabase · real-time · dashboard analytics",
      badge: "Web App",
      badgeClass: "b-web"
    },
    {
      id: 4,
      title: "AI Agent Automation",
      tech: "crewai · claude api · n8n · multi-agent orchestration",
      badge: "Automation",
      badgeClass: "b-auto"
    }
  ],
  techStack: [
    "React", "Next.js", "Node.js", "Python",
    "LangChain", "CrewAI", "Claude", "n8n",
    "Postgres", "Supabase", "Docker", "Vercel"
  ],
  marquee1: ["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "Redis", "Docker", "Vercel"],
  marquee2: ["LangChain", "CrewAI", "Claude API", "OpenAI", "n8n", "Make.com", "Supabase", "Pinecone", "RAG", "GSAP"]
};

// ══ DATA MANAGER ══
const DataManager = {
  getAll() {
    const stored = localStorage.getItem('motionmind_data');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return DEFAULT_DATA;
      }
    }
    return DEFAULT_DATA;
  },

  saveAll(data) {
    localStorage.setItem('motionmind_data', JSON.stringify(data));
  },

  reset() {
    localStorage.removeItem('motionmind_data');
  },

  getProfile() {
    return this.getAll().profile;
  },

  saveProfile(profile) {
    const data = this.getAll();
    data.profile = profile;
    this.saveAll(data);
  },

  getProjects() {
    return this.getAll().projects;
  },

  saveProjects(projects) {
    const data = this.getAll();
    data.projects = projects;
    this.saveAll(data);
  },

  getServices() {
    return this.getAll().services;
  },

  saveServices(services) {
    const data = this.getAll();
    data.services = services;
    this.saveAll(data);
  },

  addProject(project) {
    const data = this.getAll();
    project.id = Date.now();
    data.projects.push(project);
    this.saveAll(data);
    return project;
  },

  deleteProject(id) {
    const data = this.getAll();
    data.projects = data.projects.filter(p => p.id !== id);
    this.saveAll(data);
  },

  addService(service) {
    const data = this.getAll();
    service.id = Date.now();
    data.services.push(service);
    this.saveAll(data);
    return service;
  },

  deleteService(id) {
    const data = this.getAll();
    data.services = data.services.filter(s => s.id !== id);
    this.saveAll(data);
  }
};
