import { useEffect } from 'react'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import SmoothScrollProvider from './components/motion/SmoothScrollProvider'
import RouterProvider from './components/routing/RouterProvider'
import { useRouter } from './lib/routerContext'
import HomePage from './pages/HomePage'
import MoradkPage from './pages/MoradkPage'

function AppShell() {
  const { pathname } = useRouter()
  const isMoradkPage = pathname === '/projects/moradk'

  useEffect(() => {
    document.title = isMoradkPage
      ? 'ม.รดก (MORADK) - chiqq888'
      : 'chiqq888 - Developer & Designer'
  }, [isMoradkPage])

  return (
    <>
      <Navbar />
      <main id="main" className="w-full">
        {isMoradkPage ? <MoradkPage /> : <HomePage />}
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <RouterProvider>
      <SmoothScrollProvider>
        <AppShell />
      </SmoothScrollProvider>
    </RouterProvider>
  )
}

export default App
