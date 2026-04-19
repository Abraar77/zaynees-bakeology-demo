import { useState } from 'react'
import { navLinks } from '../data/siteData'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200/10 bg-espresso-950/90 backdrop-blur-xl">
      <nav className="section-shell flex h-20 items-center justify-between gap-4">
        <a href="#top" className="group">
          <p className="font-heading text-2xl font-semibold text-cream-50 sm:text-3xl">
            Zaynees
            <span className="ml-1 text-gold-400 transition-colors group-hover:text-gold-500">
              Bakeology
            </span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream-100/65 sm:text-xs">
            East London, E17
          </p>
        </a>

        <button
          type="button"
          className="ghost-btn px-4 py-2 text-xs md:hidden"
          onClick={() => setOpen((state) => !state)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream-100/80 transition-colors hover:text-gold-400"
            >
              {link.label}
            </a>
          ))}
          <a href="#order" className="gold-btn px-5 py-2.5">
            Start Order
          </a>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="section-shell border-t border-cream-200/10 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl border border-cream-200/15 bg-cream-50/5 px-4 py-3 text-sm text-cream-100/90 transition hover:border-gold-500/45 hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
            <a href="#order" onClick={() => setOpen(false)} className="gold-btn text-center">
              Start Order
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
