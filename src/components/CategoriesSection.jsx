import { SectionHeading } from './SectionHeading'

export function CategoriesSection({ categories }) {
  return (
    <section id="menu" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Menu Categories"
          title="Curated for Celebrations and Everyday Treats"
          description="Browse handcrafted dessert categories with demo pricing and lead times for a realistic client presentation."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category, index) => (
            <article
              key={category.name}
              className="group overflow-hidden rounded-3xl border border-cream-200/15 bg-gradient-to-b from-cream-50 to-cream-100 text-espresso-900 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-glow"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/40 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-gold-600/35 bg-cream-50/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-gold-600">
                  {category.badge}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-3xl font-semibold">{category.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-800/85">{category.description}</p>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="font-semibold text-espresso-950">From GBP {category.fromPrice}</span>
                  <span className="text-espresso-800/70">{category.leadTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
