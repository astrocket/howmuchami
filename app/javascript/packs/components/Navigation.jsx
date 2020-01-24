import React from "react";
import { A } from "hookrouter";

function Navigation() {
  return (
    <div className="w-full container mx-auto p-6">
      <div className="w-full flex items-center justify-between">
        <a
          className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
          href="/">
          💸 나 얼마짜리야 ??
        </a>
        <div className="flex w-1/2 justify-end content-center">
          <A href="/"
             className="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
             data-tippy-content="@twitter_handle">
            계산기
          </A>
          <A href="/about"
             className="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
             data-tippy-content="@twitter_handle">
            만든이
          </A>
          <a
            className="inline-block text-blue-300 no-underline hover:text-indigo-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
            data-tippy-content="@twitter_handle" href="https://github.com/astrocket/rails-template">
            Github
          </a>
        </div>
      </div>
    </div>
  );
}

export default Navigation;