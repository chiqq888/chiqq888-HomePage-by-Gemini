import portraitLogo from '../../assets/main_nnueh.webp'
import buildingIcon from '../../assets/ICON/fi-rr-building.svg'
import envelopeIcon from '../../assets/ICON/fi-rr-envelope.svg'
import behanceIcon from '../../assets/footer_SOC/SOC_BEHANCE.svg'
import linkedinIcon from '../../assets/footer_SOC/SOC_LINKEDIN.svg'
import githubIcon from '../../assets/footer_SOC/SOC_GITHUB.svg'
import facebookIcon from '../../assets/footer_SOC/SOC_FACEBOOK.svg'
import discordIcon from '../../assets/footer_SOC/SOC_DISCORD.svg'
import AnimatedHeading from '../motion/AnimatedHeading'

type SocialProfile = { name: string; image: string; href?: string }

const socialProfiles: SocialProfile[] = [
  { name: 'Behance', image: behanceIcon, href: 'https://www.behance.net/nuehratchat' },
  { name: 'LinkedIn', image: linkedinIcon },
  { name: 'GitHub', image: githubIcon },
  { name: 'Facebook', image: facebookIcon },
  { name: 'Discord', image: discordIcon },
]

function Footer() {
  return (
    <footer
      id="footer"
      data-nav-surface="dark"
      className="relative z-30 w-full bg-ink text-white"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-8 sm:px-10 sm:py-10 md:px-14 lg:px-20 lg:py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7 lg:gap-9">
            <img
              src={portraitLogo}
              alt="chiqq888 portrait logo"
              loading="lazy"
              className="size-24 shrink-0 object-contain sm:size-28 lg:size-32 xl:size-[136px]"
            />

            <div>
              <AnimatedHeading as="h2" className="text-lg leading-tight tracking-tight sm:text-xl lg:text-2xl">
                Contact
              </AnimatedHeading>
              <address className="mt-3 grid gap-2 text-[11px] font-medium not-italic text-white/90 sm:text-xs lg:text-[13px]">
                <p className="flex items-center gap-3">
                  <img src={buildingIcon} alt="" className="size-4 shrink-0 opacity-85" />
                  <span>Ayutthaya, Thailand</span>
                </p>
                <p className="flex items-center gap-3">
                  <img src={buildingIcon} alt="" className="size-4 shrink-0 opacity-85" />
                  <span>Ladkrabang, Bangkok, Thailand</span>
                </p>
                <p className="flex items-center gap-3">
                  <img src={envelopeIcon} alt="" className="size-4 shrink-0 opacity-85" />
                  <a
                    href="mailto:contact@chiqq888.me"
                    className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  >
                    contact@chiqq888.me
                  </a>
                </p>
              </address>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 md:items-end md:justify-between md:self-stretch">
            <a
              href="#root"
              className="text-lg font-bold leading-tight tracking-tight text-white transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xl lg:text-2xl"
            >
              Back to top
            </a>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="text-[11px] font-medium text-white/85 sm:text-xs">
                visit
              </span>
              <ul aria-label="Social profiles" className="flex items-center gap-2.5 sm:gap-3">
                {socialProfiles.map(({ name, image, href }) => {
                  const icon = (
                    <img
                      src={image}
                      alt={name}
                      title={href ? name : `${name} (Coming soon)`}
                      loading="lazy"
                      className={`size-7 object-contain sm:size-8 lg:size-[34px] ${href ? '' : 'opacity-85'}`}
                    />
                  )

                  return (
                    <li key={name}>
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={name}
                          className="block transition-transform duration-200 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          {icon}
                        </a>
                      ) : icon}
                    </li>
                  )
                })}
              </ul>
            </div>

            <p className="text-[10px] font-medium text-white/80 sm:text-[11px]">
              © 2026 chiqq888. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
