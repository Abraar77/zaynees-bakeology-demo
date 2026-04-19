import { heroImage } from '../data/siteData'

const heroHighlights = [
  'Homemade desserts',
  'Made from scratch',
  'Halal-friendly options',
  'Collection only in E17',
]

export function HeroSection() {
  return (
    <section id="top" className="relative isolate pt-20 sm:pt-24">
      <div className="section-shell grid items-center gap-10 pb-14 md:grid-cols-[1.1fr_0.9fr] md:pb-20">
        <div className="animate-fadeUp">
          <span className="section-eyebrow">Boutique Home Bakery</span>
          <h1 className="mt-6 max-w-2xl font-heading text-5xl font-semibold leading-[0.96] text-cream-50 sm:text-6xl lg:text-7xl">
            Premium handmade desserts for East London moments worth celebrating.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
            Zaynees Bakeology crafts rich cakes, cupcakes, brownies, and custom celebration desserts with
            warmth, elegance, and small-batch care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="gold-btn">
              View Menu
            </a>
            <a href="https://wa.me/440000000000?text=Hi%20Zaynees%20Bakeology%2C%20I%20want%20to%20place%20an%20order." className="ghost-btn">
              Order via WhatsApp
            </a>
          </div>
          <p className="mt-4 text-sm text-cream-100/65">Please order at least 1 week in advance for custom cakes.</p>
        </div>

        <div className="relative animate-float">
          <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/35 shadow-glow">
            <img
              src={heroImage}
              alt="Artisan decorated cake and desserts"
              className="h-[26rem] w-full object-cover object-center sm:h-[30rem]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/85 via-espresso-900/25 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 rounded-3xl border border-cream-200/20 bg-espresso-950/65 p-5 backdrop-blur-sm sm:inset-x-7 sm:bottom-7 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-400">Featured Today</p>
              <h3 className="mt-2 font-heading text-3xl font-semibold text-cream-50">Pistachio Rose Cake</h3>
              <p className="mt-2 text-sm text-cream-100/85">
                Floral sponge layers with pistachio cream and handcrafted finishing details.
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-full bg-gold-500 px-4 py-2 text-sm font-semibold text-espresso-950">From GBP 52</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/75">Top Rated</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gold-500/30 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-emerald-200/20 blur-2xl" />
        </div>
      </div>

      <div className="section-shell pb-8">
        <div className="grid gap-3 rounded-3xl border border-cream-200/15 bg-cream-50/5 p-4 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-4">
          {heroHighlights.map((item) => (
            <div key={item} className="rounded-2xl border border-cream-200/10 bg-espresso-900/60 px-4 py-3 text-center text-sm text-cream-100/90">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
