import React, {
  useState, useEffect, useContext
} from "react";
import { log, currencyFormat, asMonthCurrency, expandManCurrency} from "utils/helpers";
import HourRateCalculator from "../../active_components/HourRateCalculator";
import ProjectCalculator from "../../active_components/ProjectCalculator";

function Index() {
  return (
    <div className="container mx-auto">
      <HourRateCalculator/>
      <div className="pt-12 md:pt-24 px-6">
        <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">프로젝트 단가 측정</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
        </div>
      </div>
      <ProjectCalculator/>
      <div className="pt-12 md:pt-24 px-6">
        <h3 className="mb-2 text-lg">참고 자료</h3>
        <ul>
          <li>
             <a href="https://www.nts.go.kr/support/support_03_etc01.asp" target="_blank"
                className="underline text-gray-500 hover:text-yellow-777 text-sm">근로소득 간이 세액표</a>
          </li>
          <li>
            <a href="https://bit.ly/3aFgWW6" target="_blank"
               className="underline text-gray-500 hover:text-yellow-777 text-sm">4대 보험</a>
          </li>
          <li>
            <a href="https://www.tailwindtoolbox.com/templates/app-landing-page" target="_blank"
               className="underline text-gray-500 hover:text-yellow-777 text-sm">디자인 템플릿</a>
          </li>
          <li>
            <a href="https://tailwindcss-custom-forms.netlify.com" target="_blank"
               className="underline text-gray-500 hover:text-yellow-777 text-sm">폼 UI</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Index;
