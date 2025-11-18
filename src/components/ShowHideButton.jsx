import React from "react";
import { Eye, EyeOff } from "lucide-react";

function ShowHideButton({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        absolute 
        right-2 sm:right-3 md:right-4 
        top-1/2 -translate-y-1/2 
        text-gray-400 hover:text-gray-700
      "
    >
      {show ? (
        <EyeOff className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      ) : (
        <Eye className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      )}
    </button>
  );
}

export default ShowHideButton;
