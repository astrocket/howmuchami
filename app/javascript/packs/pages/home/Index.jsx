import React, {useState, useEffect} from "react";
import {A} from "hookrouter";
import api from 'utils/api';
import { log, currencyFormat, asMonthCurrency, expandManCurrency} from "utils/helpers";
import { Tax } from "utils/tax";

function Index() {
  const [helloWorld, setHelloWorld] = useState('loading...');
  const [yearIncome, setYearIncome] = useState(4500);
  const [welfareIncome, setWelfareIncome] = useState(60);
  const [incentiveIncome, setIncentiveIncome] = useState(300);
  const [monthTaxFree, setMonthTaxFree] = useState(10);
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [vacationDays, setVacationDays] = useState(15);
  const [currentTax, setCurrentTax] = useState(new Tax(0, 0));

  const [actualHourRate, setActualHourRate] = useState(9000);
  const [freeHourRate, setFreeHourRate] = useState(9000);

  useEffect(() => {
    log(window, 'mount');
    api.get('/api/home/index').then((res) => {
      setHelloWorld(res.data.hello);
    });

    const tax = new Tax(yearIncome + welfareIncome, monthTaxFree * 12);
    setCurrentTax(tax);
    console.log(tax);

    return () => {
      log(window, 'unmount')
    }
  }, [yearIncome, welfareIncome, monthTaxFree, weeklyHours]);

  useEffect(() => {
    const yearHours = (365 / 7 * weeklyHours) - (vacationDays * 8);
    const incentivisedIncome = (incentiveIncome * 0.4) + currentTax.netIncome;
    const incomePerHour = incentivisedIncome / yearHours;

    setActualHourRate(incomePerHour);
    setFreeHourRate(incomePerHour * 1.5);
  }, [currentTax, weeklyHours, vacationDays, incentiveIncome]);


  return (
    <div className="container pt-12 md:pt-24 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-start">
      <div className="w-full lg:w-1/2 lg:pr-6 border-b lg:border-b-0 mb-6 lg:mb-0 pb-6 lg:pb-0">
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-1/2 px-3 mb-4 md:mb-0">
            <label className="block">
              <span className="text-gray-700">계약 연봉 (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={yearIncome}
                     onChange={(e) => setYearIncome(parseInt(e.target.value))}
                     placeholder="4500"/>
            </label>
          </div>
          <div className="w-1/2 px-3 mb-4 md:mb-0">
            <label className="block">
              <span className="text-gray-700">연간 인센티브 (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={incentiveIncome}
                     onChange={(e) => setIncentiveIncome(parseInt(e.target.value))}
                     placeholder="4500"/>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-1/2 px-3 mb-6 md:mb-0">
            <label className="block">
              <span className="text-gray-700">월 비과세액[1] (만원)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={monthTaxFree}
                     onChange={(e) => setMonthTaxFree(parseInt(e.target.value))}
                     placeholder="4500"/>
            </label>
          </div>
          <div className="w-1/2 px-3 mb-6 md:mb-0">
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
          <div className="w-1/2 px-3 mb-4 md:mb-0">
            <label className="block">
              <span className="text-gray-700">주 평균시간 (야근포함 실 근로시간)</span>
              <input className="form-input mt-1 block w-full"
                     type="number"
                     value={weeklyHours}
                     onChange={e => setWeeklyHours(parseInt(e.target.value))}
                     placeholder="40"/>
            </label>
          </div>
          <div className="w-1/2 px-3 mb-6 md:mb-0">
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
          [2] 연간 복지금 : 현금성으로 지급되는 명절상여금, 복지포인트, 비과세 항목 한도 초과분 등 으로 과세 대상입니다.
        </p>
      </div>
      <div className="w-full lg:w-1/2 lg:pl-6">
        <label className="block">
          <span className="text-gray-700">적정 시급</span>
          <h1
            className="mb-4 text-5xl text-green-500 font-bold leading-tight text-left slide-in-bottom-h1">
            {expandManCurrency(freeHourRate)}
          </h1>
        </label>
        <label className="block mt-4">
          <span className="text-gray-700">세후 시급(인센티브 포함)</span>
          <input readOnly className="form-input mt-1 block w-full" placeholder="4500" value={expandManCurrency(actualHourRate)}/>
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">세후 월급(인센티브 제외)</span>
          <input readOnly className="form-input mt-1 block w-full" placeholder="4500" value={asMonthCurrency(currentTax.netIncome)}/>
        </label>

        <label className="block mt-4">
          <span className="text-gray-700">세금</span>
          <input readOnly className="form-input mt-1 block w-full mb-4" placeholder="4500" value={asMonthCurrency(currentTax.totalTax)}/>
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

export default Index;
