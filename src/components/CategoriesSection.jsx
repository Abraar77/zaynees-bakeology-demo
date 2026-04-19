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
              className="group rounded-3xl border border-cream-200/15 bg-gradient-to-b from-cream-50 to-cream-100 p-6 text-espresso-900 shadow-soft transition duration-300 hover:-translate-y-1.5 hover:shadow-glow"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="text-3xl">{category.icon}</span>
                <span className="rounded-full border border-gold-600/35 bg-gold-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-gold-600">
                  {category.badge}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-3xl font-semibold">{category.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso-800/85">{category.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-semibold text-espresso-950">From GBP {category.fromPrice}</span>
                <span className="text-espresso-800/70">{category.leadTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
