import { motion } from 'framer-motion'
import { Mail, MessageCircle, Github, Instagram } from 'lucide-react'
import { getData } from '../data'

// TikTok icon (custom SVG — Lucide doesn't have TikTok)
function TikTokIcon({ size = 20, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

function getContacts(profile) {
  return [
    { label: 'Email', value: 'motionmind007', href: `mailto:${profile.email}`, Icon: Mail, color: 'text-brand-blue', hover: 'hover:border-brand-blue/30 group-hover:text-brand-blue' },
    { label: 'WhatsApp', value: profile.whatsapp, href: profile.whatsappLink, Icon: MessageCircle, color: 'text-brand-green', hover: 'hover:border-brand-green/30 group-hover:text-brand-green' },
    { label: 'GitHub', value: profile.github, href: profile.githubLink, Icon: Github, color: 'text-brand-purple', hover: 'hover:border-brand-purple/30 group-hover:text-brand-purple' },
    { label: 'Instagram', value: profile.instagram, href: profile.instagramLink, Icon: Instagram, color: 'text-brand-pink', hover: 'hover:border-brand-pink/30 group-hover:text-brand-pink' },
    { label: 'TikTok', value: '@motionmind.id', href: 'https://www.tiktok.com/@motionmind.id', Icon: TikTokIcon, color: 'text-cyan-400', hover: 'hover:border-cyan-400/30 group-hover:text-cyan-400' },
  ]
}

export default function Contact() {
  const { profile } = getData()
  const contacts = getContacts(profile)
  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
            Let's Build Something<br /><span className="text-gradient">Brilliant Together</span>
          </h2>
          <p className="font-mono text-xs text-slate-500 mt-4">Open for freelance, consulting, and full-time opportunities.</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`glass rounded-xl p-5 text-center transition-colors cursor-pointer group ${c.hover}`}
            >
              <c.Icon size={20} className={`${c.color} mx-auto mb-3`} strokeWidth={1.5} />
              <div className="font-mono text-[10px] text-slate-600">{c.label}</div>
              <div className="font-heading text-xs font-semibold mt-1 transition-colors">{c.value}</div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
