import { heroImage } from '../data/siteData'
import { RemoteImage } from './RemoteImage'

const heroHighlights = [
  'Homemade desserts',
  'Made from scratch',
  'Halal-friendly options',
  'Collection only in E17',
]

export function HeroSection({ onCartOpen }) {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-br from-espresso-950 via-espresso-900 to-espresso-950 pb-14 pt-16 sm:pb-16 sm:pt-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_80%,rgba(255,11,141,.34),transparent_30%),radial-gradient(circle_at_90%_30%,rgba(108,76,255,.16),transparent_35%)]" />
      <div className="section-shell relative z-10 grid items-center gap-10 md:grid-cols-[1fr_0.95fr]">
        <div className="animate-fadeUp">
          <span className="inline-flex items-center rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Premium Home Bakery
          </span>
          <h1 className="mt-6 max-w-2xl font-heading text-5xl font-semibold leading-[0.95] text-cream-50 sm:text-6xl lg:text-7xl">
            Taste the
            <span className="ml-2 text-gold-400">Luxury</span>
            <br />
            of Handcrafted
            <span className="ml-2 text-gold-400">Desserts</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/80 sm:text-lg">
            Zaynees Bakeology creates boutique cakes, brownies, cupcakes, and dessert cups for East London
            celebrations with a premium look and homemade flavor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#featured" className="gold-btn">
              Explore Products
            </a>
            <button type="button" onClick={onCartOpen} className="ghost-btn border-cream-50/30 text-cream-50">
              Open Cart
            </button>
          </div>
          <p className="mt-4 text-sm text-cream-100/65">
            Collection only in E17. Custom cakes require at least 1 week notice.
          </p>
        </div>

        <div className="relative animate-float">
          <div className="overflow-hidden rounded-[2rem] border border-gold-500/35 shadow-glow">
            <RemoteImage
              src={heroImage}
              alt="Premium decorated bakery cake"
              className="h-[24rem] w-full object-cover sm:h-[30rem]"
              loading="eager"
              fallbackText="Luxury Dessert Display"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-transparent to-transparent" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-cream-200/20 bg-espresso-950/70 p-4 backdrop-blur-sm sm:inset-x-6 sm:bottom-6 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">Featured Today</p>
              <p className="mt-1 font-heading text-3xl font-semibold text-cream-50">Pistachio Rose Cake</p>
              <p className="mt-1 text-sm text-cream-100/80">Elegant floral sponge with pistachio cream layers.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell relative z-10 mt-10">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {heroHighlights.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-cream-200/15 bg-cream-50/5 px-4 py-3 text-center text-sm font-medium text-cream-100/90 backdrop-blur-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
