import { useRef } from 'react'
import stackPoster from '../assets/BG/SKILL_BG.webp'
import stackVideo from '../assets/BG/SKILL_BG.optimized.mp4'
import htmlLogo from '../assets/SKILL_logo/FR_HTML.svg'
import cssLogo from '../assets/SKILL_logo/FR_CSS.svg'
import javascriptLogo from '../assets/SKILL_logo/FR_JS.svg'
import typescriptLogo from '../assets/SKILL_logo/FR_TS.svg'
import tailwindLogo from '../assets/SKILL_logo/FR_TAILWIND.svg'
import reactLogo from '../assets/SKILL_logo/FR_REACT.svg'
import bootstrapLogo from '../assets/SKILL_logo/FR_BOOSTRAP.svg'
import javaLogo from '../assets/SKILL_logo/BE_JAVA.svg'
import pythonLogo from '../assets/SKILL_logo/BE_PY.svg'
import goLogo from '../assets/SKILL_logo/BE_GO.svg'
import nodeLogo from '../assets/SKILL_logo/BE_NODEJS.svg'
import oracleLogo from '../assets/SKILL_logo/DB_ORACLE.svg'
import postgresLogo from '../assets/SKILL_logo/DB_POSTGRESQL.svg'
import mysqlLogo from '../assets/SKILL_logo/DB_MYSQL.svg'
import vscodeLogo from '../assets/SKILL_logo/DEV_VSCODE.svg'
import intellijLogo from '../assets/SKILL_logo/DEV_INTELIJ.svg'
import githubLogo from '../assets/SKILL_logo/DEV_GITHUB.svg'
import gitLogo from '../assets/SKILL_logo/DEV_GIT.svg'
import dockerLogo from '../assets/SKILL_logo/DEV_DOCKER.svg'
import postmanLogo from '../assets/SKILL_logo/DEV_POSTMAN.svg'
import figmaLogo from '../assets/SKILL_logo/CREAT_FIGMA.svg'
import blenderLogo from '../assets/SKILL_logo/CREAT_BLENDER.svg'
import procreateLogo from '../assets/SKILL_logo/CREAT_PROCREATE.svg'
import adobeLogo from '../assets/SKILL_logo/CREAT_ADOBE365.svg'
import officeLogo from '../assets/SKILL_logo/OTHER_OFFICE365.svg'
import arduinoLogo from '../assets/SKILL_logo/OTHER_AUDUINO.svg'
import raspberryPiLogo from '../assets/SKILL_logo/OTHER_RASPI.svg'
import tableauLogo from '../assets/SKILL_logo/OTHER_TABLEAU.svg'
import AnimatedBox from '../components/motion/AnimatedBox'
import AnimatedHeading from '../components/motion/AnimatedHeading'
import BackgroundVideo from '../components/motion/BackgroundVideo'
import CursorTooltip from '../components/motion/CursorTooltip'

const skillGroups = [
  {
    label: 'FRONTEND :',
    skills: [
      { name: 'HTML', image: htmlLogo },
      { name: 'CSS', image: cssLogo },
      { name: 'JavaScript', image: javascriptLogo },
      { name: 'TypeScript', image: typescriptLogo },
      { name: 'Tailwind CSS', image: tailwindLogo },
      { name: 'React', image: reactLogo },
      { name: 'Bootstrap', image: bootstrapLogo },
    ],
  },
  {
    label: 'BACKEND :',
    skills: [
      { name: 'Java', image: javaLogo },
      { name: 'Python', image: pythonLogo },
      { name: 'Go', image: goLogo },
      { name: 'Node.js', image: nodeLogo },
    ],
  },
  {
    label: 'DATABASE :',
    skills: [
      { name: 'Oracle', image: oracleLogo },
      { name: 'PostgreSQL', image: postgresLogo },
      { name: 'MySQL', image: mysqlLogo },
    ],
  },
  {
    label: 'DEVELOPMENT TOOLS :',
    skills: [
      { name: 'Visual Studio Code', image: vscodeLogo },
      { name: 'IntelliJ IDEA', image: intellijLogo },
      { name: 'GitHub', image: githubLogo },
      { name: 'Git', image: gitLogo },
      { name: 'Docker', image: dockerLogo },
      { name: 'Postman', image: postmanLogo },
    ],
  },
  {
    label: 'CREATIVE TOOLS :',
    skills: [
      { name: 'Figma', image: figmaLogo },
      { name: 'Blender', image: blenderLogo },
      { name: 'Procreate', image: procreateLogo },
      { name: 'Adobe Creative Cloud', image: adobeLogo },
    ],
  },
  {
    label: 'OTHER TOOLS :',
    skills: [
      { name: 'Microsoft 365', image: officeLogo },
      { name: 'Arduino', image: arduinoLogo },
      { name: 'Raspberry Pi', image: raspberryPiLogo },
      { name: 'Tableau', image: tableauLogo },
    ],
  },
]

const desktopHorizontalFadeStyle = {
  backgroundImage:
    'linear-gradient(to right, #ffffff 0%, #ffffff 34%, rgba(255, 255, 255, 0.96) 41%, rgba(255, 255, 255, 0.84) 49%, rgba(255, 255, 255, 0.64) 57%, rgba(255, 255, 255, 0.38) 66%, rgba(255, 255, 255, 0.16) 75%, rgba(255, 255, 255, 0.04) 84%, rgba(255, 255, 255, 0) 92%)',
} as const

const desktopTopFadeStyle = {
  backgroundImage:
    'linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0.65) 35%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 100%)',
} as const

const desktopBottomFadeStyle = {
  backgroundImage:
    'linear-gradient(to top, #ffffff 0%, rgba(255, 255, 255, 0.65) 35%, rgba(255, 255, 255, 0.2) 70%, rgba(255, 255, 255, 0) 100%)',
} as const

function StackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="stack"
      aria-labelledby="stack-heading"
      className="relative isolate w-full scroll-mt-20 overflow-hidden bg-white py-20 md:scroll-mt-24 md:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <BackgroundVideo
          src={stackVideo}
          poster={stackPoster}
          className="absolute inset-0 h-full w-full object-cover object-right opacity-25 lg:opacity-100"
        />
        <div className="absolute inset-0 bg-white/75 lg:hidden" />
        <div
          className="absolute inset-0 hidden lg:block"
          style={desktopHorizontalFadeStyle}
        />
        <div
          className="absolute inset-x-0 top-0 hidden h-20 lg:block"
          style={desktopTopFadeStyle}
        />
        <div
          className="absolute inset-x-0 bottom-0 hidden h-20 lg:block"
          style={desktopBottomFadeStyle}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div>
          <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-ink/50">
            [03 / Capabilities]
          </p>
          <AnimatedHeading
            as="h2"
            id="stack-heading"
            className="text-[clamp(34px,4.2vw,64px)] leading-none tracking-tight"
          >
            OUR STACK
          </AnimatedHeading>
        </div>

        <dl className="mt-10 max-w-[760px] divide-y divide-ink/10 border-y border-ink/10 md:mt-12 lg:max-w-[62%] xl:max-w-[60%]">
          {skillGroups.map(({ label, skills }) => (
            <div
              key={label}
              className="grid grid-cols-1 gap-3.5 py-5 sm:grid-cols-[224px_1fr] sm:items-center sm:gap-6 md:py-5"
            >
              <AnimatedBox
                as="dt"
                className="w-fit text-xs tracking-wider text-white sm:w-full md:text-[13px]"
                contentClassName="flex min-h-11 items-center bg-ink px-4 py-2 sm:min-h-12"
                hoverEffect="stack-label"
              >
                <span data-stack-label>{label}</span>
              </AnimatedBox>
              <dd>
                <ul className="flex flex-wrap gap-2 sm:gap-2.5 md:gap-3">
                  {skills.map(({ name, image }, index) => (
                    <AnimatedBox
                      key={name}
                      as="li"
                      className="size-10 sm:size-12 md:size-[52px]"
                      hoverEffect="stack-icon"
                      data-cursor-label={name}
                      delay={(index + 1) * 0.045}
                    >
                      <img
                        src={image}
                        alt={name}
                        loading="lazy"
                        className="size-full object-contain"
                      />
                    </AnimatedBox>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <CursorTooltip containerRef={sectionRef} />
    </section>
  )
}

export default StackSection
