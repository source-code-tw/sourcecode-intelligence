import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Products from '@/components/Products'
import HowWeWork from '@/components/HowWeWork'
import TechMarquee from '@/components/TechMarquee'
import Team from '@/components/Team'
import Recruit from '@/components/Recruit'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Products />
        <HowWeWork />
        <TechMarquee />
        <Team />
        <Recruit />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
