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
          <div className="relative rounded-[2rem] border border-gold-500/35 bg-gradient-to-br from-cream-50 via-cream-100 to-amber-100 p-1 shadow-glow">
            <div className="rounded-[1.7rem] bg-[radial-gradient(circle_at_top,#fff9ed,transparent_62%),linear-gradient(145deg,#fff6e2_5%,#f7e4bf_47%,#efd4a0_100%)] p-7 sm:p-9">
              <div className="rounded-[1.4rem] bg-cream-50/70 p-7 shadow-soft backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-espresso-800/75">Featured Today</p>
                <h3 className="mt-2 font-heading text-3xl font-semibold text-espresso-900">Pistachio Rose Cake</h3>
                <p className="mt-2 text-sm text-espresso-900/80">
                  Delicate floral notes, creamy pistachio layers, and a soft sponge baked fresh for collection.
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-espresso-900 px-4 py-2 text-sm font-semibold text-gold-400">From GBP 52</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-espresso-900/70">Top Rated</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gold-500/30 blur-2xl" />
          <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-amber-100/30 blur-2xl" />
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
