import { SectionHeading } from './SectionHeading'

function Rating({ value }) {
  const stars = Math.round(value)
  return (
    <div className="flex items-center gap-1 text-sm">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < stars ? 'text-gold-500' : 'text-cream-200/40'}>
          ★
        </span>
      ))}
      <span className="ml-1 text-xs text-espresso-800/80">{value.toFixed(1)}</span>
    </div>
  )
}

export function FeaturedSection({ items, onEnquirySelect }) {
  return (
    <section id="featured" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Featured Selection"
          title="Freshly Baked Highlights"
          description="A premium showcase of customer favorites with realistic demo copy, ratings, and order actions."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.name}
              className="group overflow-hidden rounded-3xl border border-cream-200/15 bg-cream-50 shadow-card transition duration-300 hover:-translate-y-1.5"
            >
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${item.imageTone}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,255,255,.8),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(199,154,63,.2),transparent_42%)]" />
                <span className="absolute left-4 top-4 rounded-full bg-espresso-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-400">
                  {item.tag}
                </span>
                <div className="absolute bottom-4 left-4 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-espresso-900">
                  Handmade
                </div>
              </div>
              <div className="space-y-3 p-5 text-espresso-900">
                <h3 className="font-heading text-2xl font-semibold leading-tight">{item.name}</h3>
                <p className="text-sm leading-relaxed text-espresso-800/80">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Rating value={item.rating} />
                  <p className="text-base font-bold text-espresso-950">GBP {item.price}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-espresso-900/20 bg-espresso-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cream-50 transition hover:bg-espresso-800"
                    onClick={() => onEnquirySelect(item.name)}
                  >
                    Add to Enquiry
                  </button>
                  <a
                    className="flex-1 rounded-full border border-gold-600/25 bg-gold-500/20 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] text-gold-600 transition hover:bg-gold-500/30"
                    href={`https://wa.me/440000000000?text=${encodeURIComponent(`Hi, I want to order ${item.name}.`)}`}
                  >
                    Order Now
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
