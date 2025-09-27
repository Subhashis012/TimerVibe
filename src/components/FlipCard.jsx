import React from "react";

const FlipCard = ({ value }) => {
  return (
    <div className="relative bg-black w-24 h-32 md:w-36 md:h-48 flex items-center justify-center">
      <div className="absolute top-1/2 left-0 w-full border-t border-gray-700"></div>
      <span className="text-white text-6xl md:text-8xl font-flip leading-none">
        {value}
      </span>
    </div>
  );
};

export default FlipCard;
