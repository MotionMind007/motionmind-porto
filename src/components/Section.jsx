import { motion } from 'framer-motion'

export function SectionHeader({ eyebrow, title, accent, align = 'left' }) {
  const accentColors = {
    blue: 'from-brand-blue',
    purple: 'from-brand-purple',
    green: 'from-brand-green',
    cyan: 'from-brand-cyan',
  }
  const eyebrowColors = {
    blue: 'text-brand-blue',
    purple: 'text-brand-purple',
    green: 'text-brand-green',
    cyan: 'text-cyan-400',
  }
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className={`h-px w-8 bg-gradient-to-r ${accentColors[accent]} to-transparent`} />
        <span className={`font-mono text-[11px] uppercase tracking-[3px] ${eyebrowColors[accent]}`}>{eyebrow}</span>
      </div>
      <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight">{title}</h2>
    </motion.div>
  )
}
