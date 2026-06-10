import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-dark-100 text-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 glass-strong border-b border-white/5 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img src="/logo.png?v=2" alt="MotionMind" className="h-7 w-auto" />
            <span className="font-heading font-bold text-sm">Motion<span className="text-brand-blue">Mind</span></span>
          </Link>
          <Link to="/" className="font-mono text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Back
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Terms of Service */}
        <section className="mb-20" id="terms">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-gradient-to-r from-brand-blue to-transparent" />
            <span className="font-mono text-[11px] text-brand-blue uppercase tracking-[3px]">Legal</span>
          </div>
          <h1 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-8">Terms of Service</h1>

          <div className="space-y-5 text-slate-400 text-sm leading-relaxed">
            <p>MotionMind provides web development, web application development, AI automation, AI agent systems, and related digital services.</p>
            <p>By using MotionMind services, users agree to use the services only for lawful purposes and in accordance with applicable laws and third-party platform rules.</p>
            <p>Users are responsible for the information, content, media, credentials, and instructions they provide to MotionMind or its systems.</p>
            <p>For AI-assisted features, MotionMind may help generate ideas, text, scripts, captions, automation flows, or other outputs. AI-generated outputs should be reviewed by users before being used or published.</p>
            <p>If users connect third-party platforms such as TikTok or other services, they must only connect accounts they own or are authorized to manage.</p>
            <p>MotionMind does not guarantee that AI-generated content, automation results, or third-party integrations will always be error-free, uninterrupted, or suitable for every purpose.</p>
            <p>Users may not use MotionMind services for spam, illegal activities, unauthorized access, data theft, impersonation, harmful automation, or violation of third-party platform policies.</p>
            <p>MotionMind may limit, suspend, or refuse access to services if misuse, abuse, security risk, or policy violation is detected.</p>
            <p>Users remain responsible for any content they approve, publish, upload, or distribute through MotionMind services.</p>
            <p className="text-slate-500">For questions, contact: <a href="mailto:motionmind007@gmail.com" className="text-brand-blue hover:underline">motionmind007@gmail.com</a></p>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/5 mb-20" />

        {/* Privacy Policy */}
        <section id="privacy">
          <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-8">Privacy Policy</h2>

          <div className="space-y-5 text-slate-400 text-sm leading-relaxed">
            <p>MotionMind respects user privacy and is committed to protecting user data.</p>
            <p>MotionMind may collect information such as name, email address, contact details, project requirements, uploaded files, content drafts, captions, scripts, automation instructions, and technical information needed to provide services.</p>
            <p>If users connect third-party platforms such as TikTok or other services, MotionMind may process account identifiers, authorization tokens, permission scopes, uploaded media, publishing status, or related integration data based on user authorization.</p>
            <p>MotionMind uses collected data to provide services, manage projects, generate AI-assisted content, run automation workflows, enable third-party integrations, improve service quality, and maintain security.</p>
            <p>MotionMind does not sell user personal data.</p>
            <p>Authorization tokens and third-party access data are used only to perform actions authorized by the user.</p>
            <p>Users may request access, correction, deletion, or disconnection of their data by contacting MotionMind.</p>
            <p>MotionMind may use trusted third-party service providers such as hosting, database, storage, analytics, payment, AI model providers, or third-party platform APIs to operate the service.</p>
            <p>MotionMind takes reasonable security measures to protect user data, but no online system can be guaranteed to be completely secure.</p>
            <p className="text-slate-500">For privacy or data deletion requests, contact: <a href="mailto:motionmind007@gmail.com" className="text-brand-blue hover:underline">motionmind007@gmail.com</a></p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-slate-600">© 2026 MotionMind. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#terms" className="font-mono text-[10px] text-slate-500 hover:text-brand-blue transition-colors">Terms of Service</a>
            <a href="#privacy" className="font-mono text-[10px] text-slate-500 hover:text-brand-blue transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
