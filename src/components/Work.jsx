import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeader } from './Section'
import { getData } from '../data'

const statusConfig = {
  finished: { label: 'Finished', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  demo: { label: 'Demo', bg: 'bg-brand-blue/10', text: 'text-brand-blue', border: 'border-brand-blue/20', dot: 'bg-brand-blue' },
  development: { label: 'In Dev', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', dot: 'bg-amber-400' },
}

const badgeColor = {
  blue: 'bg-brand-blue/10 text-brand-blue border-brand-blue/20',
  purple: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
}

export default function Work() {
  const { projects } = getData()
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener('scroll', checkScroll)
    return () => el?.removeEventListener('scroll', checkScroll)
  }, [])

  const scroll = (dir) => {
    const el = scrollRef.current
    if (el) el.scrollBy({ left: dir * 300, behavior: 'smooth' })
  }

  return (
    <section id="work" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <SectionHeader eyebrow="Selected Work" title="Recent Projects" accent="purple" />
          </div>
          <div className="hidden sm:flex items-center gap-2 mb-16">
            <button onClick={() => scroll(-1)} disabled={!canScrollLeft} className={`w-8 h-8 rounded-full glass flex items-center justify-center transition-all cursor-pointer ${canScrollLeft ? 'hover:bg-white/10 text-white' : 'text-slate-700 cursor-default'}`}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll(1)} disabled={!canScrollRight} className={`w-8 h-8 rounded-full glass flex items-center justify-center transition-all cursor-pointer ${canScrollRight ? 'hover:bg-white/10 text-white' : 'text-slate-700 cursor-default'}`}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {projects.map((p, i) => {
            const status = statusConfig[p.status] || statusConfig.finished
            return (
              <motion.a
                key={p.id || i}
                href={p.link || '#contact'}
                target={p.link ? '_blank' : '_self'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group glass gradient-border rounded-xl overflow-hidden cursor-pointer transition-all hover:border-white/10 flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
              >
                {/* Thumbnail */}
                <div className="relative h-32 overflow-hidden bg-dark-200">
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-200 to-dark-50">
                      <span className="font-mono text-[10px] text-slate-700">No preview</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-100/80 via-transparent to-transparent" />

                  {/* Status */}
                  <div className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full ${status.bg} border ${status.border} backdrop-blur-sm`}>
                    <span className={`w-1 h-1 rounded-full ${status.dot}`} />
                    <span className={`font-mono text-[8px] font-medium ${status.text}`}>{status.label}</span>
                  </div>

                  {/* Link icon */}
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={10} className="text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-heading font-bold text-xs group-hover:text-white transition-colors leading-tight line-clamp-2">{p.title}</h3>
                    <span className={`shrink-0 font-mono text-[8px] px-1.5 py-0.5 rounded border ${badgeColor[p.color] || badgeColor.blue}`}>{p.badge}</span>
                  </div>
                  <p className="font-mono text-[9px] text-slate-600 leading-relaxed line-clamp-1">{p.tech}</p>
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Mobile scroll hint */}
        <div className="sm:hidden flex justify-center mt-3">
          <span className="font-mono text-[9px] text-slate-600">← swipe →</span>
        </div>
      </div>
    </section>
  )
}
