import { SectionHeading } from './SectionHeading'

export function WhyChooseSection({ trustPoints }) {
  return (
    <section className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Trusted Local Baking with Boutique Standards"
          description="A polished trust badge section designed to reassure new customers instantly."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {trustPoints.map((point) => (
            <article
              key={point.title}
              className="rounded-2xl border border-gold-500/20 bg-cream-50/95 p-5 text-espresso-900 shadow-soft"
            >
              <span className="text-2xl">{point.icon}</span>
              <h3 className="mt-3 font-heading text-2xl font-semibold">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso-800/80">{point.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
