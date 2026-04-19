export function Footer() {
  return (
    <footer className="border-t border-cream-200/10 bg-espresso-950 pb-10 pt-12">
      <div className="section-shell grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-heading text-3xl font-semibold text-cream-50">Zaynees Bakeology</h3>
          <p className="mt-2 text-sm text-cream-100/75">
            Warm, premium homemade desserts for celebrations and sweet everyday moments.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-500">Instagram</p>
          <a
            href="https://www.instagram.com/zaynees_bakeology/"
            className="mt-2 inline-block text-sm text-cream-50 transition hover:text-gold-400"
          >
            @zaynees_bakeology
          </a>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-500">Location</p>
          <p className="mt-2 text-sm text-cream-100/80">East London, E17</p>
          <p className="mt-1 text-sm text-cream-100/80">Collection only service</p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold-500">Enquiries</p>
          <p className="mt-2 text-sm text-cream-100/80">DM or WhatsApp to place orders and request custom designs.</p>
          <div className="mt-3 flex gap-3">
            <a href="https://www.instagram.com/zaynees_bakeology/" className="text-sm text-cream-50 hover:text-gold-400">
              Instagram
            </a>
            <a href="https://wa.me/440000000000" className="text-sm text-cream-50 hover:text-gold-400">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 border-t border-cream-200/10 pt-6 text-xs uppercase tracking-[0.15em] text-cream-100/55">
        Crafted with warmth, butter, and beautiful detail in East London.
      </div>
    </footer>
  )
}
