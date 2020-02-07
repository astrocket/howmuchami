import React, {
  useState, useEffect, useContext
} from "react";
import {log, currencyFormat, asMonthCurrency, expandManCurrency} from "utils/helpers";
import HourRateRow from "../../active_components/HourRateRow";

function Index() {
  const yearIncomes = Array.from(Array(181).keys()).map((i) => (i * 100) + 2000);

  useEffect(() => {

  }, []);

  return (
    <div className="container mx-auto">
      <div className="pb-12 md:pb-24 px-6">
        <h1 className="w-full my-2 text-3xl font-bold leading-tight text-center text-gray-800">2020년 연봉 실수령액</h1>
        <div className="w-full mb-4">
          <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"/>
        </div>
        <p className="text-gray-500 text-center">주 40시간 / 연차 15일 기준 (인센티브, 복지금 제외)</p>
      </div>
      <table className="table-auto text-left mx-auto">
        <thead>
        <tr>
          <th className="px-4 py-2 sticky top-0 bg-white">연봉</th>
          <th className="px-4 py-2 sticky top-0 bg-white">세후 시급</th>
          <th className="px-4 py-2 sticky top-0 bg-white">세후 연봉</th>
          <th className="px-4 py-2 sticky top-0 bg-white">세후 월급</th>
          <th className="px-4 py-2 sticky top-0 bg-white">월 세금</th>
          <th className="hidden lg:table-cell px-4 py-2 sticky top-0 bg-white">세금상세</th>
        </tr>
        </thead>
        <tbody>
        {
          yearIncomes.map((value, index) => {
            return <HourRateRow key={index} yearIncome={value} even={(index % 2) === 0}/>
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default Index;
