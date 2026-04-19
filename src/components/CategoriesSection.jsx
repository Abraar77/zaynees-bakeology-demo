import { RemoteImage } from './RemoteImage'
import { SectionHeading } from './SectionHeading'

export function CategoriesSection({ categories, activeCategory, onSelectCategory }) {
  return (
    <section id="menu" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Menu Categories"
          title="Curated for Celebrations and Everyday Treats"
          description="Pick a category to filter the product grid instantly."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2 rounded-2xl border border-cream-200 bg-cream-50 p-3 shadow-soft">
          {categories.map((category) => {
            const active = category.id === activeCategory
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition sm:text-sm ${
                  active
                    ? 'bg-gold-500 text-cream-50 shadow-glow'
                    : 'border border-cream-200 bg-cream-100 text-espresso-900 hover:border-gold-500/40'
                }`}
              >
                {category.name}
              </button>
            )
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.filter((entry) => entry.id !== 'all').map((category) => (
            <article
              key={category.name}
              className="group overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 text-espresso-900 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="relative h-44 overflow-hidden">
                <RemoteImage
                  src={category.imageUrl}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  fallbackText={category.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/35 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold-600/20 bg-cream-50/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-gold-600">
                  {category.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-3xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-900/70">{category.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="font-semibold text-espresso-950">From GBP {category.fromPrice}</span>
                  <span className="text-espresso-900/65">{category.leadTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
