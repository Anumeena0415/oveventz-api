import React, { useState } from 'react'
// Assuming this is within a functional React component where 'title' and 'para' are props
// or defined variables, and 'setreadmore' was previously used.
// We'll use a local state 'isExpanded' and a setter 'setIsExpanded'



const Blogcard = ({ image, title, para, id }) => {

    // Local state to track if the text is expanded (i.e., 'Read More' has been clicked)
    const [isExpanded, setIsExpanded] = useState(false);

    // 2. Define the truncation length
    const MAX_LENGTH = 80;

    // 3. Determine if the paragraph is long enough to need truncation
   const needsTruncation = para?.length > MAX_LENGTH;
const displayedText = needsTruncation && !isExpanded
  ? `${para?.substring(0, MAX_LENGTH)}...`
  : para || ""; // fallback empty string


    return (
        <div className="bg-zinc-100 rounded-xl sm:rounded-2xl outline-1 outline-[#E69B83] overflow-hidden hover:outline-2 hover:outline-[#E69B83] hover:shadow-lg hover:shadow-[#E69B83] transition-all duration-300 ease-linear flex flex-col h-full">
            {/* Image Section */}
            <div className="relative">
                <img src={image} alt={title} className="w-full h-40 sm:h-48 lg:h-52 object-cover" />
                {/* <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full shadow">
                    Premium
                </span> */}
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-1">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold pb-4">{title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {displayedText}
                    </p>
                </div>

                {/* Conditional rendering of the button: only show if truncation is necessary */}
                {needsTruncation && (
                    <button
                        // Toggles the isExpanded state when clicked
                        onClick={() => setIsExpanded(!isExpanded)}
                        className='text-blue-500 tracking-tighter hover:underline flex hover:font-bold'
                    >
                        {/* Dynamic button text */}
                        {isExpanded ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Blogcard
