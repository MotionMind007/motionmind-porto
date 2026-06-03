import { marqueeItems } from '../data'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]
  return (
    <div className="border-y border-white/5 bg-dark-200/50 py-3 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 font-mono text-xs text-slate-600 whitespace-nowrap">
            {item}
            <span className="w-1 h-1 rounded-full bg-brand-blue/40" />
          </div>
        ))}
      </div>
    </div>
  )
}
