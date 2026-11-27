import shopLogo from '../assets/ALL SVG WHITE/svg_chiqqshop.svg'
import crewLogo from '../assets/ALL SVG WHITE/svg_crew.svg'
import xmlLogo from '../assets/ALL SVG WHITE/svg_xml.svg'
import pulseLogo from '../assets/ALL SVG WHITE/svg_pulse.svg'
import moradkLogo from '../assets/ALL SVG WHITE/svg_moradk.svg'
import smartwashLogo from '../assets/ALL SVG WHITE/svg_smartwash.svg'
import menuIcon from '../assets/ICON/fi-rr-menu-burger.svg'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import AnimatedBox from '../components/motion/AnimatedBox'
import RevealParagraph from '../components/motion/RevealParagraph'
import Link from '../components/routing/Link'
import { BOX_REVEAL } from '../lib/motionSettings'

type ProjectItem = {
  name: string
  logo: string
  variant: 'slim' | 'tall'
  ready?: boolean
  logoClassName: string
  href?: string
  to?: string
}

const projects: ProjectItem[] = [
  {
    name: 'chiqq Shop',
    variant: 'slim',
    href: 'https://shop.chiqq888.me/',
    logo: shopLogo,
    ready: true,
    logoClassName: 'h-5 sm:h-6 w-auto max-w-[50%]',
  },
  {
    name: 'Crew',
    variant: 'slim',
    logo: crewLogo,
    logoClassName: 'h-5 sm:h-6 w-auto max-w-[40%]',
  },
  {
    name: 'XML',
    variant: 'slim',
    logo: xmlLogo,
    logoClassName: 'h-6 sm:h-7 w-auto max-w-[40%]',
  },
  {
    name: 'SmartWash',
    variant: 'slim',
    logo: smartwashLogo,
    logoClassName: 'h-4 sm:h-5 w-auto max-w-[55%]',
  },
  {
    name: 'ม.รดก',
    variant: 'tall',
    to: '/projects/moradk',
    logo: moradkLogo,
    logoClassName: 'h-4 sm:h-5 w-auto max-w-[50%]',
  },
  {
    name: 'PULSE',
    variant: 'tall',
    href: 'https://pulse.chiqq888.me/',
    logo: pulseLogo,
    logoClassName: 'h-4 sm:h-5 w-auto max-w-[50%]',
  },
]

type WorkCardProps = ProjectItem & {
  delay?: number
}

function WorkCard({ name, logo, variant, ready = false, logoClassName, delay = 0, href, to }: WorkCardProps) {
  const isSlim = variant === 'slim'

  const card = (
    <AnimatedBox
      as="article"
      aria-label={`${name} — ${ready ? 'Ready' : 'Not ready'}`}
      className={
        isSlim
          ? 'h-10 sm:h-11'
          : 'h-[144px] sm:h-[152px] lg:h-[160px]'
      }
      contentClassName={
        isSlim
          ? 'relative flex h-full items-center justify-between bg-ink pl-3.5 pr-12 text-white sm:pl-4 sm:pr-14 lg:pl-5 lg:pr-16'
          : 'relative flex h-full flex-col items-start justify-between bg-ink p-3.5 pr-12 text-white sm:p-4 sm:pr-14 lg:p-5 lg:pr-16'
      }
      hoverEffect="work"
      delay={delay}
    >
      <span
        aria-hidden="true"
        data-work-status
        className={`absolute inset-y-0 right-5 w-2 sm:right-6 ${ready ? 'bg-[#a3ff00]' : 'bg-[#ff0000]'}`}
      />
      <img src={menuIcon} alt="" aria-hidden="true" className="size-3.5 shrink-0 sm:size-4" />
      <img src={logo} alt={name} data-work-logo className={`object-contain ${logoClassName}`} />
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
      className="relative z-0 w-full scroll-mt-20 bg-white pt-12 pb-20 md:scroll-mt-24 md:pt-14 md:pb-24 lg:pt-16 lg:pb-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 md:px-14 lg:px-20">
        <div className="flex items-start justify-between gap-6 sm:items-end">
          <AnimatedHeading
            as="h2"
            id="works-heading"
            className="text-[clamp(28px,3.2vw,46px)] leading-none tracking-tight"
          >
            OUR WORKS
          </AnimatedHeading>
          <ul
            aria-label="Project status"
            className="flex flex-col items-end gap-1.5 text-[10px] tracking-wider md:text-[11px]"
          >
            <li className="flex items-center justify-end gap-3">
              READY <span aria-hidden="true" className="size-3 bg-[#a3ff00] md:size-3.5" />
            </li>
            <li className="flex items-center justify-end gap-3">
              NOT READY <span aria-hidden="true" className="size-3 bg-[#ff0000] md:size-3.5" />
            </li>
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 md:mt-10 md:grid-cols-2 md:gap-x-8 md:gap-y-5 lg:gap-x-9 lg:gap-y-6">
          {projects.map((project, idx) => (
            <WorkCard
              key={project.name}
              {...project}
              delay={(idx % 2) * BOX_REVEAL.stagger}
            />
          ))}
        </div>

        <div className="mt-8 md:mt-10">
          <RevealParagraph className="max-w-[74ch] text-[11px] font-bold leading-relaxed text-ink sm:text-xs lg:text-[13px]">
            A collection of websites, design projects, and creative experiments.
            <br className="hidden sm:inline" />
            {' '}Exploring ideas through code, visuals, and motion.
          </RevealParagraph>
        </div>
      </div>
    </section>
  )
}

export default WorksSection
