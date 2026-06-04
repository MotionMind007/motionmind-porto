import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { SectionHeader } from './Section'
import { getData } from '../data'

const statusConfig = {
  finished: { label: 'Finished', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  demo: { label: 'Demo', bg: 'bg-brand-blue/10', text: 'text-brand-blue', border: 'border-brand-blue/20', dot: 'bg-brand-blue' },
  development: { label: 'In Development', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-400' },
}

const badgeColor = {
  blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  purple: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default function Work() {
  const { projects } = getData()

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Selected Work" title="Recent Projects" accent="purple" />

        <div className="grid sm:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const status = statusConfig[p.status] || statusConfig.finished
            return (
              <motion.a
                key={p.id || i}
                href={p.link || '#contact'}
                target={p.link ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group glass gradient-border rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-white/10"
              >
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-dark-200">
                  {p.thumbnail ? (
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-200 to-dark-50">
                      <span className="font-mono text-xs text-slate-700">No preview</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/90 via-dark-100/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Status badge */}
                  <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full ${status.bg} border ${status.border} backdrop-blur-sm`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    <span className={`font-mono text-[9px] font-medium ${status.text}`}>{status.label}</span>
                  </div>

                  {/* External link icon on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <ExternalLink size={13} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-heading font-bold text-sm group-hover:text-white transition-colors leading-tight">{p.title}</h3>
                    <span className={`shrink-0 font-mono text-[9px] px-2 py-0.5 rounded border ${badgeColor[p.color] || badgeColor.blue}`}>{p.badge}</span>
                  </div>
                  <p className="font-mono text-[10px] text-slate-600 leading-relaxed">{p.tech}</p>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
