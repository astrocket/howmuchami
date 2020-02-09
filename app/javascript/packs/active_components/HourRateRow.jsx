import React, {useEffect, useState, useContext} from "react";
import {Tax} from "utils/tax";
import {
  log, currencyFormat, asMonthCurrency, expandManCurrency, currencyManFormat
} from "utils/helpers";
import hourRateContext from "../contexts/hourRate.context";

function HourRateRow({yearIncome, even}) {
  const [currentTax, setCurrentTax] = useState(new Tax(1000, 0));
  const [actualHourRate, setActualHourRate] = useState(0);

  const welfareIncome = 0;
  const incentiveIncome = 0;
  const monthTaxFree = 0;
  const weeklyHours = 40;
  const vacationDays = 15;
  const nationalVacations = 13;
  const totalVacation = vacationDays + nationalVacations;
  const totalWorkingHours = (365 / 7 * weeklyHours) - (totalVacation * 8);

  useEffect(() => {
    const tax = new Tax((yearIncome || 0) + (welfareIncome || 0) + (incentiveIncome || 0), (monthTaxFree || 0) * 12);
    setCurrentTax(tax);
  }, [yearIncome, welfareIncome, incentiveIncome, monthTaxFree, weeklyHours]);

  useEffect(() => {
    const incomePerHour = currentTax.netIncome / (totalWorkingHours || 1);
    setActualHourRate(incomePerHour);
  }, [currentTax, weeklyHours, vacationDays]);

  return (
    <tr className={even ? "" : "bg-gray-100"}>
      <td className="border p-2 lg:px-4 lg:py-2 text-xs lg:text-base">{currencyManFormat(yearIncome)}</td>
      <td className="border p-2 lg:px-4 lg:py-2 text-green-500 font-bold text-xs lg:text-base">{expandManCurrency(actualHourRate)}</td>
      <td className="border p-2 lg:px-4 lg:py-2 text-xs lg:text-base">{currencyManFormat(currentTax.netIncome)}</td>
      <td className="border p-2 lg:px-4 lg:py-2 text-yellow-500 font-bold text-xs lg:text-base">{currencyManFormat(currentTax.netIncome / 12)}</td>
      <td className="border p-2 lg:px-4 lg:py-2 text-red-500 font-bold text-xs lg:text-base">{currencyManFormat(currentTax.totalTax / 12)}</td>
      <td className="hidden lg:table-cell border p-2 lg:px-4 lg:py-2 text-xs lg:text-base">
        <div className="w-full rounded overflow-hidden leading-normal">
          <span className="pr-2 text-gray-500 text-sm">소득세: {asMonthCurrency(currentTax.incomeTax)}</span>
          <span className="pr-2 text-gray-500 text-sm">주민세: {asMonthCurrency(currentTax.nationalTax)}</span>
          <span className="pr-2 text-gray-500 text-sm">국민연금: {asMonthCurrency(currentTax.pensionTax)}</span>
        </div>
        <div className="w-full rounded overflow-hidden leading-normal">
          <span className="pr-2 text-gray-500 text-sm">고용보험: {asMonthCurrency(currentTax.employmentTax)}</span>
          <span className="pr-2 text-gray-500 text-sm">장기요양보험: {asMonthCurrency(currentTax.careTax)}</span>
          <span className="pr-2 text-gray-500 text-sm">건강보험: {asMonthCurrency(currentTax.healthTax)}</span>
        </div>
      </td>
    </tr>
  );
}

export default HourRateRow;