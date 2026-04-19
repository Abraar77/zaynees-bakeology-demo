import { RemoteImage } from './RemoteImage'
import { SectionHeading } from './SectionHeading'

function Rating({ value }) {
  const stars = Math.round(value)
  return (
    <div className="flex items-center gap-1 text-sm">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < stars ? 'text-gold-500' : 'text-cream-200'}>
          {'\u2605'}
        </span>
      ))}
      <span className="ml-1 text-xs text-espresso-900/75">{value.toFixed(1)}</span>
    </div>
  )
}

export function FeaturedSection({ items, activeCategory, onAddToCart }) {
  const filtered = activeCategory === 'all' ? items : items.filter((item) => item.category === activeCategory)

  return (
    <section id="featured" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Featured Selection"
          title="Freshly Baked Highlights"
          description="Interactive product cards with working cart actions."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filtered.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-card transition duration-300 hover:-translate-y-1.5"
            >
              <div className="relative h-48 overflow-hidden">
                <RemoteImage
                  src={item.imageUrl}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  fallbackText={item.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/55 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-cream-50/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-gold-600">
                  {item.tag}
                </span>
                <div className="absolute bottom-4 left-4 rounded-full bg-espresso-900/90 px-3 py-1 text-xs font-semibold text-cream-50">
                  Handmade
                </div>
              </div>
              <div className="space-y-3 p-5 text-espresso-900">
                <h3 className="font-heading text-2xl font-semibold leading-tight">{item.name}</h3>
                <p className="text-sm leading-relaxed text-espresso-900/72">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Rating value={item.rating} />
                  <p className="text-base font-bold text-espresso-950">GBP {item.price}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-gold-500 bg-gold-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-cream-50 transition hover:bg-gold-400"
                    onClick={() => onAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-full border border-espresso-900/20 bg-cream-100 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] text-espresso-900 transition hover:bg-cream-200"
                    onClick={() => onAddToCart(item)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
