import { bestsellers } from '../data/siteData'

export function BestsellerStrip() {
  return (
    <section className="py-6">
      <div className="section-shell">
        <div className="overflow-hidden rounded-2xl border border-gold-500/35 bg-espresso-900/85 p-4 shadow-card">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="rounded-full bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-espresso-950">
              Bestsellers
            </span>
            {bestsellers.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cream-200/20 bg-cream-50/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream-100/90 sm:text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
