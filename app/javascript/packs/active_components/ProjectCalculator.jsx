import React, { useEffect, useState, useContext } from "react";
import { Tax } from "utils/tax";
import {
  log, currencyFormat, asMonthCurrency, expandManCurrency
} from "utils/helpers";
import hourRateContext from "../contexts/hourRate.context";

function ProjectCalculator() {
  const projectHoursPerDay = 7;
  const [projectDays, setProjectDays] = useState(1);
  const [projectInterest, setProjectInterest] = useState("interesting");
  const [projectPrice, setProjectPrice] = useState("interesting");

  const { hourRate } = useContext(hourRateContext);

  useEffect(() => {
    let estimatedPrice;
    if (projectDays > 0) {
      const coefficient = projectInterest === "interesting" ? 0.85 : (projectInterest === "boring" ? 1.15 : 1);
      estimatedPrice = hourRate * projectDays * projectHoursPerDay * coefficient;
    } else {
      estimatedPrice = 0;
    }

    setProjectPrice(estimatedPrice)
  }, [hourRate, projectInterest, projectDays]);

  return (
    <div>
      <div className="pt-12 md:pt-24 px-6">
        <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">프로젝트 단가 측정</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
        </div>
      </div>

      <div className="pt-12 md:pt-24 px-6 flex flex-wrap flex-col md:flex-row items-start">
        <div className="w-full lg:w-1/2 lg:pr-6 border-b lg:border-b-0 mb-6 lg:mb-0 pb-6 lg:pb-0">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block">
                <span className="text-gray-700">기준 시급</span>
                <input className="py-2 border-b outline-none mt-1 block w-full"
                       readOnly
                       value={expandManCurrency(hourRate)}/>
              </label>
            </div>
            <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block">
                <span className="text-gray-700">예상 소요 일 (일 7시간 작업)</span>
                <input className="form-input mt-1 block w-full"
                       type="number"
                       value={projectDays}
                       onChange={(e) => setProjectDays(parseInt(e.target.value))}/>
              </label>
            </div>
          </div>
          <div className="block mt-4">
            <span className="text-gray-700">프로젝트 느낌</span>
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="interesting" defaultChecked={true}
                         onChange={(e) => setProjectInterest(e.target.value)}
                         className="form-radio text-green-600"
                         name="radio-colors" />
                  <span className="ml-2">재밌을 것 같고 하면 배울게 많다 ! (15% 할인)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="casual"
                         onChange={(e) => setProjectInterest(e.target.value)}
                         className="form-radio text-yellow-500"
                         name="radio-colors" />
                  <span className="ml-2">그냥 맨날 하는 정도의 난이도네, 배울건 없어도 금방할것 같다.</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="boring"
                         onChange={(e) => setProjectInterest(e.target.value)}
                         className="form-radio text-red-600"
                         name="radio-colors" />
                  <span className="ml-2">재미도 없고 리스크도 있는 프로젝트 ㅠㅠ (15% 할증)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-6">
          <label className="block">
            <span className="text-gray-700">프로젝트 단가</span>
            <h1
              className="mb-4 text-5xl text-yellow-777 font-bold leading-tight text-left slide-in-bottom-h1">
              {expandManCurrency(projectPrice)}
            </h1>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ProjectCalculator;