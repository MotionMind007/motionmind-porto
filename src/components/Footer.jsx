export default function Footer() {
  return (
    <footer className="py-6 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-[8px] text-white font-bold">MM</div>
          <span className="font-heading text-xs font-bold">MotionMind</span>
        </div>
        <p className="font-mono text-[10px] text-slate-600">© 2025 · Jayapura, Papua 🇮🇩 · Built with React + Framer Motion</p>
      </div>
    </footer>
  )
}
