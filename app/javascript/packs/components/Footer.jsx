import React from "react";

function Footer() {
  return (
    <div className="w-full container mx-auto pt-12 md:pt-24">
      <div className="w-full h-32 flex items-center justify-center">
        <a href="https://telegram.me/astrocket" target="_blank"
           className="flex items-center text-gray-400 hover:text-yellow-777 no-underline hover:no-underline font-bold">
          by Astrocket
        </a>
      </div>
    </div>
  );
}

export default Footer;