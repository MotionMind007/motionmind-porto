import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionHeader } from './Section'
import { getData } from '../data'

const badgeColor = {
  blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  purple: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
}

export default function Work() {
  const { projects } = getData()
  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Selected Work" title="Recent Projects" accent="purple" />
        <div className="glass rounded-2xl overflow-hidden">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group flex items-center gap-5 px-6 py-5 cursor-pointer transition-all hover:bg-brand-blue/[0.03] hover:px-7 ${i < projects.length - 1 ? 'border-b border-white/5' : ''}`}
            >
              <span className="font-mono text-[11px] text-slate-600 w-8">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-sm group-hover:text-white transition-colors">{p.title}</h3>
                <p className="font-mono text-[10px] text-slate-600 mt-0.5 truncate">{p.tech}</p>
              </div>
              <span className={`hidden sm:inline-block font-mono text-[10px] px-2.5 py-1 rounded border ${badgeColor[p.color]}`}>{p.badge}</span>
              <ArrowUpRight size={16} className="text-slate-600 group-hover:text-brand-purple group-hover:rotate-45 transition-all" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
