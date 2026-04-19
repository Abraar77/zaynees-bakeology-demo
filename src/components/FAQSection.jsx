import { useState } from 'react'
import { SectionHeading } from './SectionHeading'

export function FAQSection({ faqItems }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="section-shell">
        <SectionHeading
          eyebrow="FAQ"
          title="Ordering Information"
          description="Key details around lead times, collection, custom requests, and allergens."
        />

        <div className="mx-auto max-w-4xl space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-cream-200/15 bg-cream-50/5"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-cream-50 sm:text-base">{faq.question}</span>
                  <span className="text-xl text-gold-400">{isOpen ? '-' : '+'}</span>
                </button>
                {isOpen ? (
                  <div className="border-t border-cream-200/15 px-5 py-4 text-sm leading-relaxed text-cream-100/80">
                    {faq.answer}
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
