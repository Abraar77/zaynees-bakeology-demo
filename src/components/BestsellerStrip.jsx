import { bestsellers } from '../data/siteData'

export function BestsellerStrip() {
  return (
    <section className="py-6">
      <div className="section-shell">
        <div className="overflow-hidden rounded-2xl border border-gold-500/25 bg-cream-50 p-4 shadow-card">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="rounded-full bg-gold-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cream-50">
              Bestsellers
            </span>
            {bestsellers.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cream-200 bg-cream-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-espresso-900/85 sm:text-sm"
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
