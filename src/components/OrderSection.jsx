import { SectionHeading } from './SectionHeading'

const steps = [
  {
    title: '1. Add To Cart',
    detail: 'Choose products from featured cards and click Add to Cart.',
  },
  {
    title: '2. Open Cart Drawer',
    detail: 'Review quantity, totals, and service fee in the right panel.',
  },
  {
    title: '3. Enter Details',
    detail: 'Fill contact info, address, and payment method in checkout.',
  },
  {
    title: '4. Place Demo Order',
    detail: 'Submit to generate a realistic order reference instantly.',
  },
]

export function OrderSection({ onCartOpen }) {
  return (
    <section id="order" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="rounded-[2rem] border border-cream-200 bg-cream-50 p-6 shadow-card sm:p-8 md:p-10">
          <SectionHeading
            eyebrow="Live Checkout Demo"
            title="Add to Cart, Enter Address, Choose Payment"
            description="The website now includes a working right-side cart and checkout flow for a realistic client presentation."
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-cream-200 bg-cream-100 p-4">
                <h3 className="font-heading text-2xl font-semibold text-espresso-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso-900/70">{step.detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button type="button" onClick={onCartOpen} className="gold-btn">
              Open Checkout Cart
            </button>
            <a
              href="https://wa.me/440000000000?text=Hi%20Zaynees%20Bakeology%2C%20I%20want%20to%20place%20an%20order."
              className="ghost-btn"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
