import shopLogo from '../assets/ALL SVG WHITE/svg_chiqqshop.svg'
import crewLogo from '../assets/ALL SVG WHITE/svg_crew.svg'
import passionLogo from '../assets/ALL SVG WHITE/svg_dbyd.svg'
import moradkLogo from '../assets/ALL SVG WHITE/svg_moradk.svg'
import smartwashLogo from '../assets/ALL SVG WHITE/svg_smartwash.svg'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import AnimatedBox from '../components/motion/AnimatedBox'
import RevealParagraph from '../components/motion/RevealParagraph'
import Link from '../components/routing/Link'
import { BOX_REVEAL } from '../lib/motionSettings'

type ProjectItem = {
  index: string
  name: string
  logo: string
  ready?: boolean
  logoClassName: string
  href?: string
  to?: string
}

const projects: ProjectItem[] = [
  {
    index: '01',
    name: 'chiqq Shop',
    href: 'https://shop.chiqq888.me/',
    logo: shopLogo,
    ready: true,
    logoClassName: 'h-10 sm:h-11 w-auto max-w-[72%]',
  },
  {
    index: '02',
    name: 'Crew',
    logo: crewLogo,
    logoClassName: 'h-10 sm:h-11 w-auto max-w-[58%]',
  },
  {
    index: '03',
    name: 'Design by Passion',
    logo: passionLogo,
    logoClassName: 'h-6 sm:h-7 w-auto max-w-[82%]',
  },
  {
    index: '04',
    name: 'Design by Passion',
    logo: passionLogo,
    logoClassName: 'h-6 sm:h-7 w-auto max-w-[82%]',
  },
  {
    index: '05',
    name: 'ม.รดก',
    to: '/projects/moradk',
    logo: moradkLogo,
    logoClassName: 'h-10 sm:h-11 w-auto max-w-[74%]',
  },
  {
    index: '06',
    name: 'SmartWash',
    logo: smartwashLogo,
    logoClassName: 'h-9 sm:h-10 w-auto max-w-[78%]',
  },
]

type WorkCardProps = ProjectItem & {
  delay?: number
}

function WorkCard({ index, name, logo, ready = false, logoClassName, delay = 0, href, to }: WorkCardProps) {
  const hasDestination = Boolean(href || to)

  const card = (
    <AnimatedBox
      as="article"
      aria-label={`${name} — ${ready ? 'Ready' : 'Not ready'}`}
      className="h-[200px] sm:h-[216px] lg:h-[232px]"
      contentClassName="relative flex h-full flex-col justify-between bg-ink p-5 pr-8 text-white md:p-6 md:pr-9"
      hoverEffect="work"
      delay={delay}
    >
      <span
        aria-hidden="true"
        data-work-status
        className={`absolute inset-y-0 right-0 w-2 md:w-2.5 ${ready ? 'bg-[#a3ff00]' : 'bg-[#ff0000]'}`}
      />
      <div className="flex items-center justify-between text-[11px] font-medium tracking-[0.14em]">
        <span className="text-white/45">{index}</span>
        {hasDestination ? (
          <span className="text-white/85">
            {ready ? 'LIVE' : 'PREVIEW'}
          </span>
        ) : (
          <span className="text-white/35">SOON</span>
        )}
      </div>
      <div className="flex flex-1 items-center justify-center py-4">
        <img src={logo} alt={name} data-work-logo className={`object-contain ${logoClassName}`} />
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-3 text-xs">
        <span className="truncate font-bold tracking-wide text-white/90">{name}</span>
        <span className="shrink-0 text-[10px] font-medium tracking-[0.14em] uppercase text-white/45">
          {ready ? 'Ready' : 'Not ready'}
        </span>
      </div>
    </AnimatedBox>
  )

  if (to) {
    return (
      <Link
        to={to}
        aria-label={`${name} — View project case study`}
        className="block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        {card}
      </Link>
    )
  }

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="block cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      {card}
    </a>
  ) : card
}

function WorksSection() {
  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="relative w-full scroll-mt-20 bg-white py-20 md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-ink/15 pb-8 sm:flex-row sm:items-end md:pb-10">
          <div>
            <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
              [01 / Selected Works]
            </p>
            <AnimatedHeading
              as="h2"
              id="works-heading"
              className="text-[clamp(34px,4.2vw,64px)] leading-none tracking-tight"
            >
              OUR WORKS
            </AnimatedHeading>
          </div>
          <ul
            aria-label="Project status"
            className="flex flex-wrap items-center gap-5 text-xs tracking-wider sm:flex-col sm:items-end sm:gap-2 md:text-sm"
          >
            <li className="flex items-center justify-end gap-3">
              READY <span aria-hidden="true" className="size-3.5 bg-[#a3ff00] ring-1 ring-ink/15 md:size-4" />
            </li>
            <li className="flex items-center justify-end gap-3">
              NOT READY <span aria-hidden="true" className="size-3.5 bg-[#ff0000] md:size-4" />
            </li>
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, idx) => (
            <WorkCard
              key={project.index}
              {...project}
              delay={(idx % 3) * BOX_REVEAL.stagger}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-ink/12 pt-6 md:mt-12 md:flex-row md:items-center md:justify-between">
          <RevealParagraph className="max-w-[58ch] text-xs font-medium leading-relaxed text-ink/70 sm:text-sm md:text-[15px]">
            A collection of websites, design projects, and creative experiments.
            {' '}Exploring ideas through code, visuals, and motion.
          </RevealParagraph>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-ink/45">
            06 Projects
          </p>
        </div>
      </div>
    </section>
  )
}

export default WorksSection
