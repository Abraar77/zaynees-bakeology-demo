import { SectionHeading } from './SectionHeading'

function Stars({ count }) {
  return (
    <p className="text-base leading-none text-gold-500">
      {'\u2605'.repeat(count)}
      {'\u2606'.repeat(5 - count)}
    </p>
  )
}

export function TestimonialsSection({ testimonials }) {
  return (
    <section id="reviews" className="bg-espresso-950 py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Customers Say"
          description="Believable demo reviews for client presentation and social proof."
          theme="dark"
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {testimonials.map((review) => (
            <article
              key={review.name}
              className="rounded-3xl border border-cream-200/15 bg-espresso-900/80 p-5 shadow-card"
            >
              <Stars count={review.rating} />
              <p className="mt-3 text-sm leading-relaxed text-cream-100/85">"{review.text}"</p>
              <div className="mt-5 border-t border-cream-200/15 pt-4">
                <p className="font-semibold text-cream-50">{review.name}</p>
                <p className="text-xs uppercase tracking-[0.14em] text-gold-400">{review.order}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
