import useTheme from './useTheme.js'
import CursorWave from './components/CursorWave.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Dock from './ReactBits/FootNav.jsx'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <CursorWave />
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Services />
        <Projects />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
      <Dock />
    </>
  )
}
