import { motion } from 'framer-motion'
import { getData } from '../data'

export default function About() {
  const { techStack } = getData()
  return (
    <section id="about" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gradient-to-r from-brand-green to-transparent" />
            <span className="font-mono text-[11px] text-brand-green uppercase tracking-[3px]">About</span>
          </div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-6">
            Dev from the<br /><span className="text-gradient">Edge of Indonesia</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Building world-class digital products from Jayapura, Papua. I combine clean engineering with AI-first thinking — shipping systems that scale, evolve, and work while you sleep.
          </p>
          <p className="text-slate-500 text-sm leading-relaxed">
            Focused on the intersection of beautiful UIs and intelligent backends. Every project I ship is a statement.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3">
          {techStack.map((t, i) => (
            <motion.div
              key={t}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-4 text-center hover:border-brand-blue/20 transition-colors cursor-default"
            >
              <div className="font-mono text-[10px] text-slate-500">{t}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
