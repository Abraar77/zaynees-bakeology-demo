import { storyImage } from '../data/siteData'
import { RemoteImage } from './RemoteImage'

export function AboutSection() {
  return (
    <section id="story" className="py-16 sm:py-20">
      <div className="section-shell">
        <div className="grid gap-8 rounded-[2rem] border border-cream-200/15 bg-gradient-to-br from-espresso-950 to-espresso-900 p-7 shadow-card md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <span className="section-eyebrow border-gold-500/45 bg-gold-500/10 text-gold-400">Our Story</span>
            <h2 className="mt-4 font-heading text-4xl font-semibold text-cream-50 sm:text-5xl">
              From a Home Kitchen in East London to Your Celebration Table
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-100/80 sm:text-base">
              Zaynees Bakeology is a home bakery in East London, E17, focused on fresh handmade desserts for
              birthdays, gatherings, and everyday sweet cravings. Every order is baked in small batches and
              styled with care for a premium finish.
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/80 sm:text-base">
              We specialise in custom orders, collection-only service, and thoughtful flavor combinations. For
              celebration cakes, we recommend placing your order at least one week in advance.
            </p>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden rounded-3xl border border-gold-500/20">
              <RemoteImage
                src={storyImage}
                alt="Home bakery workspace"
                className="h-44 w-full object-cover sm:h-56"
                loading="lazy"
                fallbackText="Home Bakery Story"
              />
            </div>
            <div className="rounded-3xl border border-gold-500/20 bg-gradient-to-br from-cream-50 to-cream-100 p-6 text-espresso-900">
              <h3 className="font-heading text-3xl font-semibold">How It Works</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="rounded-2xl border border-espresso-900/10 bg-white/65 p-3">
                  <span className="mr-1 font-semibold">1.</span> Add desserts to cart from featured products.
                </li>
                <li className="rounded-2xl border border-espresso-900/10 bg-white/65 p-3">
                  <span className="mr-1 font-semibold">2.</span> Open cart drawer and fill address + payment.
                </li>
                <li className="rounded-2xl border border-espresso-900/10 bg-white/65 p-3">
                  <span className="mr-1 font-semibold">3.</span> Place demo order and collect from E17.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
