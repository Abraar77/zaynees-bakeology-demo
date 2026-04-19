import { useState } from 'react'
import { navLinks } from '../data/siteData'

export function Navbar({ cartCount, onCartOpen }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200/60 bg-cream-50/95 backdrop-blur-xl">
      <div className="bg-gold-500 px-4 py-2 text-center text-xs font-semibold text-cream-50 sm:text-sm">
        Premium homemade desserts in East London, E17. Collection only, please order 1 week in advance.
      </div>

      <div className="section-shell py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="#top" className="group min-w-fit">
            <p className="font-heading text-2xl font-semibold leading-none text-espresso-950 sm:text-3xl">
              Zaynees
              <span className="ml-1 text-gold-500">Bakeology</span>
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-espresso-900/60 sm:text-xs">
              East London, E17
            </p>
          </a>

          <div className="hidden min-w-0 flex-1 lg:block">
            <input
              type="search"
              placeholder="Search cakes, cupcakes, brownies..."
              className="w-full rounded-full border border-cream-200 bg-cream-100 px-5 py-2.5 text-sm text-espresso-900 placeholder:text-espresso-900/45 focus:border-gold-500 focus:ring-gold-500/25"
            />
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onCartOpen}
              className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-gold-500/15 px-4 py-2 text-sm font-semibold text-gold-600 transition hover:bg-gold-500/25"
            >
              Cart
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-[11px] text-cream-50">
                {cartCount}
              </span>
            </button>
            <a href="#featured" className="gold-btn px-5 py-2.5">
              Explore
            </a>
          </div>

          <button
            type="button"
            className="rounded-full border border-espresso-900/20 px-4 py-2 text-xs font-semibold text-espresso-900 md:hidden"
            onClick={() => setOpen((state) => !state)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>

        <div className="mt-4 hidden flex-wrap items-center gap-6 border-t border-cream-200/80 pt-4 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-espresso-900/80 transition hover:text-gold-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        {open ? (
          <div id="mobile-menu" className="mt-4 border-t border-cream-200/80 pt-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-cream-200 bg-cream-100 px-4 py-3 text-sm font-semibold text-espresso-900"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  onCartOpen()
                }}
                className="rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-left text-sm font-semibold text-gold-600"
              >
                Open Cart ({cartCount})
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}
