import { motion } from 'framer-motion'
import { Layout, Layers, Workflow, Bot } from 'lucide-react'
import { SectionHeader } from './Section'
import { services } from '../data'

const icons = { Layout, Layers, Workflow, Bot }

const colorMap = {
  blue: { icon: 'text-brand-blue', bg: 'bg-brand-blue/10', border: 'border-brand-blue/20', tag: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' },
  purple: { icon: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20', tag: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20' },
  cyan: { icon: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', tag: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  green: { icon: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', tag: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
}

export default function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Expertise" title="What I Build" accent="blue" />
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = icons[s.icon]
            const c = colorMap[s.color]
            return (
              <motion.div
                key={s.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass gradient-border rounded-2xl p-7 cursor-pointer transition-colors hover:border-white/10 group"
              >
                <div className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={20} className={c.icon} strokeWidth={1.5} />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{s.title}</h3>
                <p className="font-mono text-xs text-slate-500 leading-relaxed mb-4">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className={`font-mono text-[10px] px-2 py-0.5 rounded border ${c.tag}`}>{t}</span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
