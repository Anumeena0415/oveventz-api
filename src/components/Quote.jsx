import React from "react";

const Quote = ({ text }) => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-10 flex justify-center items-center h-fit">
      <h1 className="text-center text-xl sm:text-2xl md:text-3xl [text-shadow:0_0_12px_rgba(249,115,22,0.8)] font-semibold text-global leading-relaxed">
        {text}
      </h1>
    </div>
  );
};

export default Quote;
