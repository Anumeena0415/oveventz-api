import React from 'react'
import CustomerIntro from './CustomerIntro'
import CustomerContent from './CustomerContent'
import Navbar from '../../components/Navbar'
import Footer from "../../components/Footer"

function CustomerDashBoard() {
    return (
        <div>
            <Navbar/>
            <CustomerIntro />
            <CustomerContent/>
            <Footer/>
        </div>
    )
}

export default CustomerDashBoard
