import React, {
  useState, useEffect, useContext
} from "react";
import { log, currencyFormat, asMonthCurrency, expandManCurrency} from "utils/helpers";
import HourRateCalculator from "../../active_components/HourRateCalculator";
import FireCalculator from "../../active_components/FireCalculator";

function Index() {
  return (
    <div className="container mx-auto">
      <HourRateCalculator/>
      <FireCalculator/>
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
