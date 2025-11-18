import React from 'react'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Footer from '../components/Footer'
import GetStarted from '../components/GetStarted'
import CustomerStories from '../components/CustomerStories'
import WhyChoose from '../components/WhyChoose'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Packages from '../components/Packages'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Packages />
      <WhyChoose />
      <CustomerStories />
      <GetStarted text="Explore Services" />
      <Footer />
    </div>
  )
}

export default Home
