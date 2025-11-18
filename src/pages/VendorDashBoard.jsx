import React from 'react'
import VendorIntro from '../components/VendorIntro'
import VendorContent from '../components/VendorContent'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function vendorDashBoard() {

  return (
    <div>
      <Navbar />
      <VendorIntro />
      <VendorContent />
      <Footer />
    </div>
  )
}

export default vendorDashBoard
