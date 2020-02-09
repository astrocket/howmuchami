import React, { useEffect } from "react";
import {A, usePath} from "hookrouter";

function Navigation() {
  const activeColor = (targetPath) => {
    const currentPath = usePath();
    return currentPath === targetPath ? "text-yellow-777" : "text-gray-500";
  };

  return (
    <div className="w-full container mx-auto p-6">
      <div className="w-full flex items-center justify-between">
        <A href="/"
           className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
          💸💸💸
        </A>
        <div className="flex flex-1 justify-end content-center">
          <A href="/"
             className={`text-sm lg:text-lg inline-block ${activeColor('/')} no-underline hover:text-yellow-777 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4`}
             data-tippy-content="@twitter_handle">
            계산기
          </A>
          <A href="/hour_rates"
             className={`text-sm lg:text-lg inline-block ${activeColor('/hour_rates')} no-underline hover:text-yellow-777 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4`}
             data-tippy-content="@twitter_handle">
            남의시급
          </A>
          <A href="/about"
             className={`text-sm lg:text-lg inline-block ${activeColor('/about')} no-underline hover:text-yellow-777 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4`}
             data-tippy-content="@twitter_handle">
            만든이
          </A>
          <a href="https://github.com/astrocket/howmuchami"
             target="_blank"
             className="text-sm lg:text-lg inline-block text-gray-500 no-underline hover:text-yellow-777 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
             data-tippy-content="@twitter_handle">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navigation;