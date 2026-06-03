import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${scrolled ? 'glass-strong' : ''}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="MotionMind" className="h-8 w-auto group-hover:scale-110 transition-transform" />
          <span className="font-heading font-bold text-sm tracking-tight">
            Motion<span className="text-brand-blue">Mind</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-1.5">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="font-mono text-[11px] text-slate-400 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-all cursor-pointer">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available
          </div>
          <a href="#contact" className="hidden sm:block px-4 py-2 rounded-lg bg-brand-green text-white font-heading font-bold text-xs cursor-pointer hover:shadow-lg hover:shadow-brand-green/30 transition-all hover:-translate-y-0.5">
            Hire Me
          </a>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1" aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden mt-3"
          >
            <div className="glass-strong rounded-2xl p-4 flex flex-col gap-1">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-mono text-xs text-slate-300 hover:text-white px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 px-4 py-2.5 rounded-lg bg-brand-green text-white font-heading font-bold text-xs text-center">
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
