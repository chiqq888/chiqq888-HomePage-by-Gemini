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
      className="w-full border-t border-white/10 bg-ink text-white"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-8 md:py-16 lg:px-12 lg:py-20 xl:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-12 lg:gap-16">
          <img
            src={portraitLogo}
            alt="chiqq888 portrait logo"
            loading="lazy"
            className="size-28 object-contain sm:size-32 lg:size-36"
          />

          <div>
            <p className="mb-2 text-[11px] font-medium tracking-[0.2em] uppercase text-white/45">
              [04 / Get in Touch]
            </p>
            <AnimatedHeading as="h2" className="text-2xl leading-tight tracking-tight md:text-3xl">
              Contact
            </AnimatedHeading>
            <address className="mt-5 grid gap-3.5 text-sm font-medium not-italic text-white/80 md:text-[15px]">
              <p className="flex items-center gap-3.5">
                <img src={buildingIcon} alt="" className="size-5 shrink-0 opacity-80" />
                <span>Ayutthaya, Thailand</span>
              </p>
              <p className="flex items-center gap-3.5">
                <img src={buildingIcon} alt="" className="size-5 shrink-0 opacity-80" />
                <span>Ladkrabang, Bangkok, Thailand</span>
              </p>
              <p className="flex items-center gap-3.5">
                <img src={envelopeIcon} alt="" className="size-5 shrink-0 opacity-80" />
                <a
                  href="mailto:contact@chiqq888.me"
                  className="underline-offset-4 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  contact@chiqq888.me
                </a>
              </p>
            </address>
          </div>

          <div className="flex flex-col items-start gap-7 md:items-end">
            <a
              href="#root"
              className="inline-flex items-center gap-2.5 border border-white/25 px-4 py-2.5 text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors hover:bg-white hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-sm"
            >
              Back to top <span aria-hidden="true">↑</span>
            </a>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/45">
                Visit
              </span>
              <ul aria-label="Social profiles" className="flex items-center gap-3.5 sm:gap-4">
                {socialProfiles.map(({ name, image, href }) => {
                  const icon = (
                    <img
                      src={image}
                      alt={name}
                      title={href ? name : `${name} (Coming soon)`}
                      loading="lazy"
                      className={`size-9 object-contain sm:size-10 ${href ? '' : 'opacity-50'}`}
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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-medium text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>chiqq888 — Code &amp; Design</span>
          <p>© 2026 chiqq888. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
