import shopLogo from '../../assets/ALL SVG WHITE/svg_chiqqshop.svg'
import crewPassionLogo from '../../assets/ALL SVG WHITE/svg_chiqq_crew_dbyd.svg'
import chiqqLogo from '../../assets/ALL SVG WHITE/svg_chiqq.svg'
import crewLogo from '../../assets/ALL SVG WHITE/svg_crew.svg'
import devDesignLogo from '../../assets/ALL SVG WHITE/svg_chiqq_devdesign.svg'
import chiqqCrewLogo from '../../assets/ALL SVG WHITE/svg_chiqq_crew.svg'
import passionLogo from '../../assets/ALL SVG WHITE/svg_dbyd.svg'
import smartWashLogo from '../../assets/ALL SVG WHITE/svg_smartwash.svg'
import moradkLogo from '../../assets/ALL SVG WHITE/svg_moradk.svg'
import pulseLogo from '../../assets/ALL SVG WHITE/svg_pulse.svg'
import xmlLogo from '../../assets/ALL SVG WHITE/svg_xml.svg'

const logos = [
  { src: shopLogo, name: 'chiqq Shop' },
  { src: crewPassionLogo, name: 'chiqq Crew and Design by Passion' },
  { src: chiqqLogo, name: 'chiqq' },
  { src: crewLogo, name: 'Crew' },
  { src: devDesignLogo, name: 'chiqq Develop & Design' },
  { src: chiqqCrewLogo, name: 'chiqq Crew' },
  { src: passionLogo, name: 'Design by Passion' },
  { src: smartWashLogo, name: 'SmartWash' },
  { src: moradkLogo, name: 'ม.รดก' },
  { src: pulseLogo, name: 'PULSE' },
  { src: xmlLogo, name: 'XML' },
]

function LogoMarquee() {
  return (
    <div data-nav-surface="dark" className="logo-marquee w-full overflow-hidden bg-ink py-2.5 md:py-3">
      <div className="logo-marquee-track flex w-max">
        {/* Equal-width copies let the track loop without a visible jump. */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-label={copy === 0 ? 'Brands and projects' : undefined}
            aria-hidden={copy === 1 ? true : undefined}
            className="flex min-w-[100vw] shrink-0 items-center justify-around gap-10 pr-10"
          >
            {logos.map((logo) => (
              <li key={logo.src} className="shrink-0">
                <img
                  src={logo.src}
                  alt={copy === 0 ? logo.name : ''}
                  className="h-5 w-auto max-w-28 object-contain opacity-90 md:h-6 md:max-w-36"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export default LogoMarquee
