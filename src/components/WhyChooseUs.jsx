import React from 'react'
import FeatureCard from './FeatureCard'

const WhyChooseUs = ({ features, align, col }) => {
    const colClasses = {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    };
    return (
        <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-global">
                        Why Choose Us
                    </h2>
                </div>

                <div className={`grid ${colClasses[col] || "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"} gap-6 sm:gap-8 lg:gap-10 xl:gap-12`}>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            align={align}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
