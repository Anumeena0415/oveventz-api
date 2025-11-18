import React from "react";
import { Brain, Target, Crown, Zap, ShieldCheck, Clock, Award } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      icon: <Brain className="w-10 h-10 text-white" />,
      title: "AI Discovery",
      desc: "Our AI understands your vision, preferences, and budget to create a personalized event blueprint tailored just for you.",
      bg: "bg-[#E69B83]",
    },
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: "Smart Curation",
      desc: "We curate and coordinate all services internally, ensuring perfect harmony between every element of your event.",
      bg: "bg-[#167A79]",
    },
    {
      icon: <Crown className="w-10 h-10 text-white" />,
      title: "Flawless Execution",
      desc: "Experience seamless event delivery with real-time tracking, quality assurance, and dedicated support throughout.",
      bg: "bg-gradient-to-br from-[#167A79] to-[#E69B83]",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-12 h-12 text-orange-500" />,
      title: "Instant Matching",
      desc: "AI matches your needs in seconds",
    },
    {
      icon: <ShieldCheck className="w-12 h-12 text-teal-600" />,
      title: "Quality Guarantee",
      desc: "Every service is pre-vetted",
    },
    {
      icon: <Clock className="w-12 h-12 text-orange-500" />,
      title: "Real-time Updates",
      desc: "Track progress live",
    },
    {
      icon: <Award className="w-12 h-12 text-teal-600" />,
      title: "Premium Support",
      desc: "Dedicated event manager",
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      {/* === Section 1: How OccasionSuper Works === */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <span className="bg-orange-50 text-global px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base lg:text-lg font-medium">
          ✨ AI-Powered Process
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6 lg:mt-8">How Oveventz Works</h2>
        <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
          Our intelligent platform handles every detail, so you can focus on enjoying your special moment
        </p>

        <div className="grid md:grid-cols-3 mt-8 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`mx-auto w-24 h-24  ${step.bg} rounded-2xl flex items-center justify-center shadow-md`}>
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mt-6">{step.title}</h3>
              <p className="text-gray-600 mt-2">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* === Section 2: Features === */}
      <div className="max-w-6xl mx-auto px-4 mt-20">
        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 text-center hover:shadow-md transition">
              <div className="flex justify-center">{feature.icon}</div>
              <h4 className="text-xl font-bold mt-4">{feature.title}</h4>
              <p className="text-gray-600 ">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;