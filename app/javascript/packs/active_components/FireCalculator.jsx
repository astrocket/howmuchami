import React, {
  useState, useEffect, useContext
} from "react";
import {
  log, currencyFormat, currencyManFormat,
  asMonthCurrency, expandManCurrency
} from "utils/helpers";
import krwRateContext from "../contexts/krwRate.context";

function FireCalculator() {
  const [currentMonthExpense, setCurrentMonthExpense] = useState(150);
  const [currentAsset, setCurrentAsset] = useState(1000);
  const [futureMonthRate, setFutureMonthRate] = useState(300);
  const [fuckYouMoney, setFuckYouMoney] = useState(100000);
  const [investmentTendency, setInvestmentTendency] = useState("aggressive");

  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const year = currentTime.getFullYear();

  const {
    hourRate, monthRate
  } = useContext(krwRateContext);

  useEffect(() => {
    setFuckYouMoney((futureMonthRate || 0) * 12 * 25)
  }, [futureMonthRate, investmentTendency]);

  return (
    <div>
      <div className="pt-12 md:pt-24 px-6">
        <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">🔥 Fire</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
        </div>
        <p className="text-gray-500 text-center">Financial Independence, Retire Early</p>
      </div>

      <div className="pt-12 md:pt-24 px-6 flex flex-wrap flex-col md:flex-row items-start">
        <div className="w-full lg:w-1/2 lg:pr-6 border-b lg:border-b-0 mb-6 lg:mb-0 pb-6 lg:pb-0">
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block">
                <span className="text-gray-700">현재 월 급여 소득</span>
                <input className="py-2 border-b outline-none mt-1 block w-full"
                       readOnly
                       value={currencyManFormat(monthRate)}/>
              </label>
            </div>
            <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block">
                <span className="text-gray-700">현재 보유 자산 (만원)</span>
                <input className="form-input mt-1 block w-full"
                       type="number"
                       value={currentAsset}
                       onChange={(e) => setCurrentAsset(parseInt(e.target.value))}/>
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block">
                <span className="text-gray-700">현재 월 지출 (만원)</span>
                <input className="form-input mt-1 block w-full"
                       type="number"
                       value={currentMonthExpense}
                       onChange={(e) => setCurrentMonthExpense(parseInt(e.target.value))}/>
              </label>
            </div>
            <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block">
                <span className="text-gray-700">미래 월 지출 (만원)</span>
                <input className="form-input mt-1 block w-full"
                       type="number"
                       value={futureMonthRate}
                       onChange={(e) => setFutureMonthRate(parseInt(e.target.value))}/>
              </label>
            </div>
          </div>
          <div className="block mt-4">
            <span className="text-gray-700">투자 성향</span>
            <div className="mt-2">
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="safe" defaultChecked={true}
                         onChange={(e) => setInvestmentTendency(e.target.value)}
                         className="form-radio text-red-600"
                         name="radio-colors" />
                  <span className="ml-2">안정형 (연 수익률 2%)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="conservative" defaultChecked={true}
                         onChange={(e) => setInvestmentTendency(e.target.value)}
                         className="form-radio text-orange-600"
                         name="radio-colors" />
                  <span className="ml-2">안전추구형 (연 수익률 4%)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="normal"
                         onChange={(e) => setInvestmentTendency(e.target.value)}
                         className="form-radio text-yellow-500"
                         name="radio-colors" />
                  <span className="ml-2">위험중립형 (연 수익률 6%)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="aggressive"
                         onChange={(e) => setInvestmentTendency(e.target.value)}
                         className="form-radio text-green-600"
                         name="radio-colors" />
                  <span className="ml-2">적극투자형 (연 수익률 8%)</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input type="radio"
                         value="aggressive"
                         onChange={(e) => setInvestmentTendency(e.target.value)}
                         className="form-radio text-blue-600"
                         name="radio-colors" />
                  <span className="ml-2">공격투자형 (연 수익률 10%)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-6">
          <label className="block">
            <a href="https://www.huffingtonpost.kr/sehoi-park/story_b_14630224.html" target="_blank" className="text-gray-700">fuck you money</a>
            <h1
              className="mb-4 text-5xl text-red-600 font-bold leading-tight text-left slide-in-bottom-h1">
              {currencyFormat(fuckYouMoney)} <span className="text-sm text-gray-500">in 5 Years</span>
            </h1>
          </label>
        </div>
      </div>
    </div>
  )
}

export default FireCalculator;