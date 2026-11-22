import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import IntroSection from './sections/IntroSection'
import WorksSection from './sections/WorksSection'
import JourneySection from './sections/JourneySection'
import StackSection from './sections/StackSection'
import SmoothScrollProvider from './components/motion/SmoothScrollProvider'

function App() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main id="main" className="w-full">
        <IntroSection />
        <WorksSection />
        <JourneySection />
        <StackSection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

export default App
