import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function GetStarted({ text }) {

  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-[#c37a61] via-[#e29177] to-[#367d80] text-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top button */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <button className="flex font-medium text-sm sm:text-base lg:text-lg items-center gap-2 bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full shadow-md">
            <Sparkles size={16} />
            Start Your Journey
          </button>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4">
          Ready to Create Magic?
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
          Join thousands of satisfied customers who trusted{" "}
          <span className="font-semibold">Oveventz</span> to make their
          dreams come true
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button className="flex text-base sm:text-lg lg:text-xl cursor-pointer font-medium items-center justify-center gap-2 bg-[#2F7A78] text-white px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:bg-[#1a3e3e] hover:outline-none hover:scale-105 transition-all ease-linear"
            onClick={() => {navigate("/event-planning");window.scrollTo({ top: 0, behavior: "smooth" });}} >
            <Sparkles size={16} />
            Start Planning Now
          </button>
          <button className="px-8 sm:px-12 lg:px-14 py-3 cursor-pointer text-base sm:text-lg lg:text-xl font-medium rounded-xl border border-white text-white hover:bg-white hover:scale-105 hover:text-[#E69B83] transition-all ease-linear">
            {text}
          </button>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
