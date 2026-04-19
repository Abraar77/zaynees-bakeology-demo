export function FloatingWhatsApp({ onCartOpen }) {
  return (
    <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={onCartOpen}
        className="inline-flex items-center gap-2 rounded-full border border-gold-500/35 bg-gold-500 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cream-50 shadow-glow"
      >
        Open Cart
      </button>
      <a
        href="https://wa.me/440000000000?text=Hi%20Zaynees%20Bakeology%2C%20I%20want%20to%20check%20availability."
        className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-500 px-5 py-3 text-sm font-semibold text-emerald-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
        aria-label="Order through WhatsApp"
      >
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-950 text-[11px] text-emerald-200">
          WA
        </span>
        WhatsApp
      </a>
    </div>
  )
}
