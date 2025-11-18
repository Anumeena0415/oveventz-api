import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Footer from '../components/Footer'
import GetStarted from '../components/GetStarted'
import CustomerStories from '../components/CustomerStories'

import Blogcard from "./Blogcard";
import axios from 'axios'

const Blog = () => {
    useEffect(() => {
        getData()
    }, []);
    const [services, setSevices] = useState([])
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
    const getData = async () => {
        await axios.get(`${BASE_URL}/blog`)
            .then((res) => {
                setSevices(res.data)
            })
    }


    return (
        <div>
            <Navbar />

            <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12 lg:mb-16">

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6 lg:mt-8">
                            Event Planning Blog
                        </h2>
                        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
                            Expert tips, guides, and inspiration for planning your perfect event
                        </p>
                    </div>


                    <div className="max-w-7xl mx-auto px-6 pb-10">
                        <h2 className="text-3xl font-heading font-bold text-foreground mb-12">
                            Featured Article
                        </h2>

                        <a
                            href="/blog/20a8cd65-c50d-41c1-9020-09abc60d53b3"
                            className="block group"
                        >
                            <div className="border-zinc-300 text-foreground bg-background hover:shadow-xl transition-all duration-300 border-light-gray/30 rounded-2xl overflow-hidden">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                    {/* Image Section */}
                                    <div className="relative">
                                        <img
                                            src="https://static.wixstatic.com/media/c34433_d0d4145eba2c4928a53b194421777f75~mv2.png/v1/fill/w_640,h_378,al_c,q_85,enc_auto/c34433_d0d4145eba2c4928a53b194421777f75~mv2.png"
                                            alt="Your Ultimate Wedding Planning Checklist"
                                            width="600"
                                            className="w-full h-80 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />

                                        <div className="inline-flex items-center rounded-md border px-2.5 py-1.5 text-xs font-medium absolute top-6 left-6 bg-primary text-white shadow">
                                            Featured
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <h3 className="text-3xl font-heading font-bold text-foreground mb-4">
                                            Your Ultimate Wedding Planning Checklist
                                        </h3>

                                        <p className="font-paragraph text-foreground/70 mb-6 text-lg">
                                            Your comprehensive guide to planning a perfect wedding,
                                            step-by-step. Download our free checklist now!
                                        </p>

                                        {/* Author + Date */}
                                        <div className="flex items-center space-x-4 text-foreground/60 font-paragraph mb-6">
                                            <div className="flex items-center">
                                                {/* User Icon */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-user w-4 h-4 mr-2"
                                                >
                                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                                <span>By Priya Sharma</span>
                                            </div>

                                            <div className="flex items-center">
                                                {/* Calendar Icon */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-calendar w-4 h-4 mr-2"
                                                >
                                                    <path d="M8 2v4"></path>
                                                    <path d="M16 2v4"></path>
                                                    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                                                    <path d="M3 10h18"></path>
                                                </svg>
                                                <span>7/15/2024</span>
                                            </div>
                                        </div>

                                        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-paragraph font-medium hover:bg-primary/90 transition-colors self-start">
                                            Read Article
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Cards */}
                    {services.length > 0 ?
                        <h2 className='pb-2 text-2xl font-bold text-zinc-800'>All Articals</h2> : <h2 className='pb-2 text-2xl font-bold text-zinc-800'>No Blogs Available</h2>}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {services?.map((service, index) => (
                            <Blogcard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            <GetStarted text="Explore Services" />
            <Footer />
        </div>

    )
}

export default Blog
