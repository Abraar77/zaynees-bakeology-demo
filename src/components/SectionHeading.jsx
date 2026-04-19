export function SectionHeading({ eyebrow, title, description, theme = 'light' }) {
  const isDark = theme === 'dark'

  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
      <span className={isDark ? 'section-eyebrow' : 'section-eyebrow bg-gold-500/10 text-gold-600'}>
        {eyebrow}
      </span>
      <h2
        className={`mt-4 font-heading text-4xl font-semibold leading-tight sm:text-5xl ${
          isDark ? 'text-cream-50' : 'text-espresso-950'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-sm leading-relaxed sm:text-base ${
            isDark ? 'text-cream-100/80' : 'text-espresso-900/70'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
