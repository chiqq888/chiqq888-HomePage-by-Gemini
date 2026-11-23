import moradkLogo from '../../assets/ALL SVG WHITE/svg_moradk.svg'
import Link from '../../components/routing/Link'

const BEHANCE_URL =
  'https://www.behance.net/gallery/255584129/-(MORADK)-Student-Powered-Course-Review-App'

const credits = [
  { label: 'Project', value: 'ม.รดก (MORADK) — Student-Powered Course Review App' },
  { label: 'Context', value: "King Mongkut's Institute of Technology Ladkrabang (KMITL)" },
  { label: 'Scope', value: 'Product Concept, Information Architecture, UI/UX Design, Mobile Prototypes' },
  { label: 'Tools', value: 'Figma, Interactive Prototyping, React, TypeScript, GSAP' },
]

function MoradkCreditsSection() {
  return (
    <section
      id="credits"
      aria-label="Project credits"
      className="w-full border-t border-ink/12 bg-[#f5f5f5] py-16 md:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-10 px-6 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-12 xl:px-16">
        <div className="lg:col-span-7">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [PROJECT CREDITS]
          </p>
          <dl className="divide-y divide-ink/12 border-y border-ink/12 text-xs sm:text-sm">
            {credits.map(({ label, value }) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-1.5 py-3.5 sm:grid-cols-[120px_1fr] sm:gap-4"
              >
                <dt className="font-bold tracking-[0.14em] uppercase text-ink/50">{label}</dt>
                <dd className="font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:items-end">
          <img
            src={moradkLogo}
            alt="ม.รดก wordmark"
            loading="lazy"
            className="h-10 w-auto object-contain brightness-0 sm:h-12"
          />
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={BEHANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-ink/25 bg-white px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              View on Behance <span aria-hidden="true">↗</span>
            </a>
            <Link
              to="/#works"
              className="inline-flex items-center gap-2.5 bg-ink px-5 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <span aria-hidden="true">←</span> Back to All Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MoradkCreditsSection
