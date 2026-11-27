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
import portraitLogo from '../assets/main_nnueh.webp'
import AnimatedBox from '../components/motion/AnimatedBox'
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
    label: 'CREATING TOOLS :',
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

function StackSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="stack"
      aria-labelledby="stack-heading"
      className="relative z-20 isolate w-full scroll-mt-20 bg-white py-10 sm:py-12 md:scroll-mt-24 lg:py-14 xl:py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-30 -translate-y-1/2"
      >
        <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10 md:px-14 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-[152px_1fr] sm:gap-x-5 lg:grid-cols-[164px_1fr] lg:gap-x-6 xl:grid-cols-[172px_1fr] xl:gap-x-7">
            <div className="hidden sm:block" />
            <div className="pl-2 sm:pl-4">
              <img
                src={portraitLogo}
                alt=""
                loading="lazy"
                className="size-11 object-contain sm:size-12 lg:size-14 xl:size-[60px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 lg:left-auto lg:w-[53%] xl:w-[51%] 2xl:w-[50%]">
          <BackgroundVideo
            src={stackVideo}
            poster={stackPoster}
            className="h-full w-full object-cover object-[65%_center] lg:object-right"
          />
          <div className="absolute inset-y-0 left-0 w-[100%] bg-linear-to-r from-white/90 via-white/75 to-transparent lg:w-[12%] lg:from-white lg:via-white/70" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 sm:px-10 md:px-14 lg:px-20">
        <h2 id="stack-heading" className="sr-only">
          Our Stack
        </h2>

        <dl className="space-y-3.5 sm:space-y-4 lg:space-y-5 xl:space-y-6">
          {skillGroups.map(({ label, skills }) => (
            <div
              key={label}
              className="grid grid-cols-1 gap-y-3 sm:grid-cols-[152px_1fr] sm:items-center sm:gap-x-5 lg:grid-cols-[164px_1fr] lg:gap-x-6 xl:grid-cols-[172px_1fr] xl:gap-x-7"
            >
              <AnimatedBox
                as="dt"
                className="w-fit text-[9.5px] tracking-wider text-white sm:w-full sm:text-[10px] xl:text-[10.5px]"
                contentClassName="flex min-h-8 items-center bg-ink px-2.5 py-1.5 sm:min-h-9 sm:px-3 xl:min-h-[38px]"
                hoverEffect="stack-label"
              >
                <span data-stack-label className="whitespace-nowrap">{label}</span>
              </AnimatedBox>
              <dd>
                <ul className="flex flex-wrap gap-2 xl:gap-2.5">
                  {skills.map(({ name, image }, index) => (
                    <AnimatedBox
                      key={name}
                      as="li"
                      className="size-8 sm:size-9 xl:size-[38px]"
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
