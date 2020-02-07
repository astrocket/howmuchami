import React, { useEffect, useState, useContext } from "react";
import { Tax } from "utils/tax";
import {
  log, currencyFormat, asMonthCurrency, expandManCurrency
} from "utils/helpers";
import hourRateContext from "../contexts/hourRate.context";

function HourRateCalculator() {
  const [yearIncome, setYearIncome] = useState(3000);
  const [welfareIncome, setWelfareIncome] = useState(60);
  const [incentiveIncome, setIncentiveIncome] = useState(300);
  const [monthTaxFree, setMonthTaxFree] = useState(10);
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [vacationDays, setVacationDays] = useState(15);
  const [currentTax, setCurrentTax] = useState(new Tax(0, 0));

  const [actualHourRate, setActualHourRate] = useState(9000);
  const [totalWorkingHours, setTotalWorkingHours] = useState(0);
  const nationalVacations = 13;

  const { hourRate, setCurrentHourRate } = useContext(hourRateContext);

  useEffect(() => {
    const tax = new Tax((yearIncome || 0) + (welfareIncome || 0) + (incentiveIncome || 0), (monthTaxFree || 0) * 12);
    setCurrentTax(tax);
  }, [yearIncome, welfareIncome, incentiveIncome, monthTaxFree, weeklyHours]);

  useEffect(() => {
    const totalVacation = (vacationDays || 0) + nationalVacations;
    const yearHours = (365 / 7 * weeklyHours) - (totalVacation * 8);
    const incomePerHour = currentTax.netIncome / (yearHours || 1);

    setTotalWorkingHours(yearHours);
    setActualHourRate(incomePerHour);
    setCurrentHourRate(incomePerHour * 1.5);
  }, [currentTax, weeklyHours, vacationDays]);

  return (
    <div className="pt-12 md:pt-24 px-6 flex flex-wrap flex-col md:flex-row items-start">
      <div className="w-full lg:w-1/2 lg:pr-6 border-b lg:border-b-0 mb-6 lg:mb-0 pb-6 lg:pb-0">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
            <label className="block">
              <span className="text-gray-700">계약 연봉 (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={yearIncome}
                     onChange={(e) => setYearIncome(parseInt(e.target.value))}
                     placeholder="4500"/>
            </label>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
            <label className="block">
              <span className="text-gray-700">연간 인센티브 (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={incentiveIncome}
                     onChange={(e) => setIncentiveIncome(parseInt(e.target.value))}
                     placeholder="300"/>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">월 비과세액[1] (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={monthTaxFree}
                     onChange={(e) => setMonthTaxFree(parseInt(e.target.value))}
                     placeholder="10"/>
            </label>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">연간 복지금[2] (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={welfareIncome}
                     onChange={(e) => setWelfareIncome(parseInt(e.target.value))}
                     placeholder="60"/>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full lg:w-1/2 px-3 mb-4 md:mb-0">
            <label className="block">
              <span className="text-gray-700">주 평균 근로시간 (야근포함)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={weeklyHours}
                     onChange={e => setWeeklyHours(parseInt(e.target.value))}
                     placeholder="40"/>
            </label>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">연간 휴가일 (일수)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={vacationDays}
                     onChange={e => setVacationDays(parseInt(e.target.value))}
                     placeholder="7"/>
            </label>
          </div>
        </div>

        <p className="text-gray-500 text-sm">
          [1] 비과세액(한도) : 식대(10), 차량유지보조금(20), 출산/보육수당(10), 연구소 소속 전담연구원(20) 등 개인별로 다릅니다.<br/>
          [2] 연간 복지금 : 현금성으로 지급되는 명절상여금, 복지포인트, 식대 등 으로 과세 대상입니다.<br/>
          ex) 식대가 20만원 일 경우, 20*12=240 만원을 연간 복지금 항목에 넣고, 식대기준 비과세한도인 10만원을 비과세액에 넣습니다.<br/>
          ex) 명절 상여금이 설/추석 각각 30만원 이고 복지포인트가 월 15만원 이라면 30*2 + 15*12 = 240만원을 연간 복지금 항목에 넣습니다.<br/>
        </p>
      </div>
      <div className="w-full lg:w-1/2 lg:pl-6">
        <label className="block">
          <span className="text-gray-700">적정 프리 시급 (1.5배)</span>
          <h1
            className="mb-4 text-5xl text-green-500 font-bold leading-tight text-left slide-in-bottom-h1">
            {expandManCurrency(hourRate)}
          </h1>
        </label>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">세후 시급</span>
              <input readOnly className="py-2 border-b outline-none mt-1 block w-full" placeholder="0" value={expandManCurrency(actualHourRate)}/>
            </label>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">예상 근로시간 (휴가, 공휴일 제외)</span>
              <input readOnly className="py-2 border-b outline-none mt-1 block w-full" placeholder="0" value={`${parseInt(totalWorkingHours)}시간`}/>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">세후 월급</span>
              <input readOnly className="py-2 border-b outline-none mt-1 block w-full" placeholder="0" value={asMonthCurrency(currentTax.netIncome)}/>
            </label>
          </div>
          <div className="w-full lg:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">세후 연봉</span>
              <input readOnly className="py-2 border-b outline-none mt-1 block w-full" placeholder="0" value={expandManCurrency(currentTax.netIncome)}/>
            </label>
          </div>
        </div>

        <label className="block mt-4">
          <span className="text-gray-700">세금</span>
          <input readOnly className="py-2 border-b outline-none mt-1 block w-full mb-4" placeholder="0" value={asMonthCurrency(currentTax.totalTax)}/>
          <div className="w-full rounded overflow-hidden leading-normal">
            <span className="block text-gray-500 text-sm">소득세: {asMonthCurrency(currentTax.incomeTax)}</span>
            <span className="block text-gray-500 text-sm">주민세: {asMonthCurrency(currentTax.nationalTax)}</span>
            <span className="block text-gray-500 text-sm">국민연금: {asMonthCurrency(currentTax.pensionTax)}</span>
            <span className="block text-gray-500 text-sm">고용보험: {asMonthCurrency(currentTax.employmentTax)}</span>
            <span className="block text-gray-500 text-sm">장기요양보험: {asMonthCurrency(currentTax.careTax)}</span>
            <span className="block text-gray-500 text-sm">건강보험: {asMonthCurrency(currentTax.healthTax)}</span>
          </div>
        </label>
      </div>
    </div>
  );
}

export default HourRateCalculator;