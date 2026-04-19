export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-cream-50 sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-cream-100/80 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
