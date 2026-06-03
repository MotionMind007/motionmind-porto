import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Monitor, MessageSquare, ArrowRight, Sparkles } from 'lucide-react'
import ParticleField from './ParticleField'
import { getData } from '../data'

// ═══ ANIMATION VARIANTS ═══
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.4 } },
}
const item = {
  hidden: { y: 50, opacity: 0, filter: 'blur(8px)' },
  show: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

const variantClass = { gradient: 'text-gradient', green: 'text-gradient-green' }

// ═══ TEXT SCRAMBLE COMPONENT ═══
function ScrambleText({ text, delay = 0 }) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  useEffect(() => {
    let timeout
    timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < iteration) return text[i]
            return chars[Math.floor(Math.random() * chars.length)]
          }).join('')
        )
        iteration += 1 / 2
        if (iteration >= text.length) {
          setDisplay(text)
          setDone(true)
          clearInterval(interval)
        }
      }, 30)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={done ? '' : 'opacity-90'}>{display || text}</span>
}

// ═══ FLOATING BADGE COMPONENT ═══
function FloatingBadge({ children, className, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, y: -2 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ═══ MAGNETIC BUTTON ═══
function MagneticButton({ children, href, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.15)
    y.set((e.clientY - centerY) * 0.15)
  }
  const reset = () => { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={className}
    >
      {children}
    </motion.a>
  )
}

// ═══ TYPING CURSOR ═══
function TypingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
      className="inline-block w-[3px] h-[1em] bg-brand-blue ml-1 align-middle rounded-full"
    />
  )
}

// ═══ MAIN HERO ═══
export default function Hero() {
  const { profile } = getData()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -150])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 15])

  const [showCursor, setShowCursor] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setShowCursor(false), 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleField />

      {/* Animated gradient orbs with parallax */}
      <motion.div style={{ y: orbY, rotate: bgRotate }} className="absolute top-[10%] left-[10%] w-80 h-80 rounded-full bg-brand-blue/[0.07] blur-[120px] animate-float" />
      <motion.div style={{ y: orbY }} className="absolute bottom-[15%] right-[10%] w-[450px] h-[450px] rounded-full bg-brand-purple/[0.06] blur-[140px] animate-float-delay" />
      <motion.div style={{ y: orbY }} className="absolute top-[40%] left-[50%] -translate-x-1/2 w-64 h-64 rounded-full bg-brand-green/[0.04] blur-[100px] animate-float" />

      {/* Rotating ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/[.015] animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-dashed border-white/[.02] animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '60s' }} />

      {/* Main content with parallax */}
      <motion.div style={{ y: contentY, opacity: contentOpacity, scale: contentScale }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div variants={container} initial="hidden" animate="show">

          {/* Top chip with pulse */}
          <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-10 group cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
            </span>
            <span className="font-mono text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">
              {profile.location} · Remote Worldwide
            </span>
          </motion.div>

          {/* Main heading with scramble effect */}
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tighter leading-[0.85] mb-6">
            <motion.span variants={item} className="block text-white/90">
              <ScrambleText text="I Build" delay={600} />
            </motion.span>
            <motion.span variants={item} className="block text-gradient glow-text mt-2 py-1">
              <ScrambleText text="Intelligent" delay={900} />
              {showCursor && <TypingCursor />}
            </motion.span>
            <motion.span variants={item} className="block text-white/15 text-4xl md:text-6xl lg:text-7xl mt-3">
              <ScrambleText text="Digital Systems." delay={1200} />
            </motion.span>
          </h1>

          {/* Animated divider */}
          <motion.div variants={item} className="flex justify-center items-center gap-3 mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-brand-blue to-brand-purple"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, duration: 0.4, type: 'spring' }}
            >
              <Sparkles size={14} className="text-brand-purple/60" />
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 60 }}
              transition={{ delay: 1.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="h-[1.5px] rounded-full bg-gradient-to-r from-brand-purple via-brand-blue to-transparent"
            />
          </motion.div>

          {/* Description */}
          <motion.p variants={item} className="font-mono text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed mb-12">
            {profile.description}
          </motion.p>

          {/* CTA Buttons — Magnetic */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <MagneticButton href="#work" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white font-heading font-bold text-sm cursor-pointer hover:shadow-2xl hover:shadow-brand-blue/30 transition-all flex items-center gap-2.5 relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Monitor size={16} /> View Projects
              <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </MagneticButton>
            <MagneticButton href="#contact" className="px-8 py-4 rounded-xl glass-strong text-slate-300 font-heading font-semibold text-sm cursor-pointer hover:text-white hover:border-brand-purple/30 transition-all flex items-center gap-2.5">
              <MessageSquare size={16} /> Let's Talk
            </MagneticButton>
          </motion.div>

          {/* Stats with count-up feel */}
          <motion.div variants={item} className="flex items-center justify-center gap-6 md:gap-10">
            {profile.stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-6 md:gap-10">
                {i > 0 && <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/10 to-transparent" />}
                <motion.div
                  className="text-center group cursor-default"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <div className={`font-heading font-bold text-3xl md:text-4xl ${variantClass[s.variant]} group-hover:glow-text transition-all`}>{s.value}</div>
                  <div className="font-mono text-[10px] text-slate-600 mt-1 uppercase tracking-wider">{s.label}</div>
                </motion.div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* Floating specialties badges (desktop) */}
      <div className="hidden lg:block">
        <FloatingBadge delay={2.2} className="absolute top-[25%] right-[8%] glass rounded-full px-3 py-1.5 font-mono text-[10px] text-brand-blue cursor-default">
          Web Dev
        </FloatingBadge>
        <FloatingBadge delay={2.5} className="absolute bottom-[30%] left-[6%] glass rounded-full px-3 py-1.5 font-mono text-[10px] text-brand-purple cursor-default">
          AI Agent
        </FloatingBadge>
        <FloatingBadge delay={2.8} className="absolute top-[35%] left-[12%] glass rounded-full px-3 py-1.5 font-mono text-[10px] text-brand-green cursor-default">
          Automation
        </FloatingBadge>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">scroll</span>
        <div className="w-5 h-9 rounded-full border border-white/10 flex items-start justify-center p-1.5 hover:border-brand-blue/30 transition-colors">
          <motion.span
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2.5 rounded-full bg-brand-blue"
          />
        </div>
      </motion.div>
    </section>
  )
}
