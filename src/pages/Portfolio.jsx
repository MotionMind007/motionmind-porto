import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Services from '../components/Services'
import Work from '../components/Work'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Portfolio() {
  return (
    <div className="noise">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
