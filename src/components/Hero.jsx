import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Monitor, MessageSquare, ArrowRight, ArrowUpRight } from 'lucide-react'
import ParticleField from './ParticleField'
import { getData } from '../data'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const item = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const variantClass = { gradient: 'text-gradient', green: 'text-gradient-green' }

export default function Hero() {
  const { profile } = getData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      {/* Ambient orbs */}
      <motion.div style={{ y: orbY }} className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-brand-blue/10 blur-[100px] animate-float" />
      <motion.div style={{ y: orbY }} className="absolute bottom-1/3 right-[15%] w-96 h-96 rounded-full bg-brand-purple/8 blur-[120px] animate-float-delay" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[.02] animate-spin-slow" />

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Chip */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="font-mono text-[11px] text-slate-400">{profile.location} · Remote Worldwide</span>
          </motion.div>

          {/* Heading */}
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-6">
            <motion.span variants={item} className="block text-white/90">I Build</motion.span>
            <motion.span variants={item} className="block text-gradient glow-text mt-1">Intelligent</motion.span>
            <motion.span variants={item} className="block text-white/20 text-4xl md:text-6xl lg:text-7xl mt-2">Digital Systems.</motion.span>
          </h1>

          {/* Animated line */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="h-0.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple"
            />
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="font-mono text-sm md:text-base text-slate-500 max-w-lg mx-auto leading-relaxed mb-10">
            Full-stack developer & AI engineer — crafting autonomous systems and pixel-perfect interfaces from the edge of Indonesia.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#work" className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white font-heading font-bold text-sm cursor-pointer hover:shadow-xl hover:shadow-brand-blue/25 transition-all hover:-translate-y-1 flex items-center gap-2">
              <Monitor size={16} /> View Projects
              <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a href="#contact" className="px-7 py-3.5 rounded-xl glass-strong text-slate-300 font-heading font-semibold text-sm cursor-pointer hover:border-brand-purple/30 hover:text-white transition-all flex items-center gap-2">
              <MessageSquare size={16} /> Let's Talk
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="flex items-center justify-center gap-8 mt-14">
            {profile.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-8 bg-white/5" />}
                <div className="text-center">
                  <div className={`font-heading font-bold text-2xl ${variantClass[s.variant]}`}>{s.value}</div>
                  <div className="font-mono text-[10px] text-slate-600 mt-1">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-slate-600">scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
          <span className="w-1 h-2 rounded-full bg-brand-blue animate-scroll-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
