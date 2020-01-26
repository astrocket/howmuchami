// 근로소득 간이 세액표 https://www.nts.go.kr/support/support_03_etc01.asp
// 4대 보험 : https://bit.ly/3aFgWW6

class Tax {
  static get MAX_PENSION_BASE() { return 486 * 12; } // 2019.7.1
  static get MIN_PENSION_BASE() { return 31 * 12; } // 2019.7.1
  static get PENSION_RATE() { return 0.045; } // 2019.7.1
  static get EMPLOYMENT_RATE() { return 0.008; } // 2019.10.01
  static get MIN_HEALTH_BASE() { return 334.74; } // 2019년 기준
  static get HEALTH_RATE() { return 0.0323; } // 2019년 기준
  static get CARE_RATE() { return 0.0851; } // 2019년 기준
  // 근로소득공제
  static calculateIncomeDeduction(baseIncome) {
    let incomeDeduction;
    if (baseIncome <= 500) {
      incomeDeduction = baseIncome * 0.7;
    } else if (baseIncome <= 1500) {
      incomeDeduction = 350 + ((baseIncome - 500) * 0.4);
    } else if (baseIncome <= 4500) {
      incomeDeduction = 750 + ((baseIncome - 1500) * 0.15);
    } else if (baseIncome <= 10000) {
      incomeDeduction = 1200 + ((baseIncome - 4500) * 0.05);
    } else {
      incomeDeduction = 1475 + ((baseIncome - 10000) * 0.02);
    }
    return incomeDeduction;
  }
  // 특별소득공제 (구성인원에 따라 복잡하게 변하나, 반영하지 않음)
  static calculateSpecialDeduction(baseIncome) {
    let specialDeduction;
    if (baseIncome <= 3000) {
      specialDeduction = 310 + (baseIncome * 0.04);
    } else if (baseIncome <= 4500) {
      specialDeduction = 310 + (baseIncome * 0.04) - ((baseIncome - 3000) * 0.05);
    } else if (baseIncome <= 7000) {
      specialDeduction = 310 + (baseIncome * 0.015);
    } else if (baseIncome <= 12000) {
      specialDeduction = 310 + (baseIncome * 0.005);
    } else {
      specialDeduction = 0;
    }
    return specialDeduction;
  }
  // 인적공제 (1명으로 가정)
  static calculateHumanDeduction(count) {
    return 150 * count;
  }
  // 결정세액 계산
  static calculateIncomeTax(taxableIncome) {
    let incomeTax, incomeTaxDeduction, incomeTaxDeductionLimit;

    // 산출세액
    if (taxableIncome <= 1200) {
      incomeTax = taxableIncome * 0.06;
    } else if (taxableIncome <= 4600) {
      incomeTax = 72 + ((taxableIncome - 1200) * 0.15);
    } else if (taxableIncome <= 8800) {
      incomeTax = 582 + ((taxableIncome - 4600) * 0.24);
    } else if (taxableIncome <= 15000) {
      incomeTax = 1590 + ((taxableIncome - 8800) * 0.35);
    } else if (taxableIncome <= 30000) {
      incomeTax = 3760 + ((taxableIncome - 15000) * 0.38);
    } else if (taxableIncome <= 50000) {
      incomeTax = 9460 + ((taxableIncome - 30000) * 0.40);
    } else {
      incomeTax = 17460 + ((taxableIncome - 50000) * 0.42);
    }

    // 근로소득 세액공제
    if (incomeTax <= 50) {
      incomeTaxDeduction = incomeTax * 0.55;
    } else {
      incomeTaxDeduction = 27.5 + ((incomeTax - 50) * 0.3);
    }

    // 간이세액표상근로소득세액공제한도
    if (taxableIncome <= 5500) {
      incomeTaxDeductionLimit = 66;
    } else if (taxableIncome <= 7000) {
      incomeTaxDeductionLimit = 63;
    } else {
      incomeTaxDeductionLimit = 50;
    }
    if (incomeTaxDeduction >= incomeTaxDeductionLimit) {
      incomeTaxDeduction = incomeTaxDeductionLimit;
    }

    return incomeTax - incomeTaxDeduction;
  }

  constructor(yearIncome, yearTaxFree) {
    this._yearIncome = yearIncome; // 연소득
    this._yearTaxFree = yearTaxFree; // 연 소등 중 비과세액: 식대(10), 차량유지보조금(20), 출산/보육수당(10), 연구소 소속 전담연구원(20)
    this._baseIncome = this._yearIncome - this._yearTaxFree;
  }

  get netIncome() {
    return this._yearIncome - this.totalTax;
  }

  get totalTax() {
    return this.employmentTax + this.careTax + this.healthTax + this.pensionTax + this.incomeTax + this.nationalTax;
  }

  // 고용보험
  get employmentTax() {
    return this._baseIncome * Tax.EMPLOYMENT_RATE;
  }

  // 장기요양보험
  get careTax() {
    return this.healthTax * Tax.CARE_RATE;
  }

  // 건강보험
  get healthTax() {
    const healthBase = this._baseIncome <= Tax.MIN_HEALTH_BASE ? Tax.MIN_HEALTH_BASE : this._baseIncome;
    return healthBase * Tax.HEALTH_RATE
  }

  // 국민연금
  get pensionTax() {
    let pensionBase;
    if (this._baseIncome <= Tax.MIN_PENSION_BASE) {
      pensionBase = Tax.MIN_PENSION_BASE;
    } else if (Tax.MAX_PENSION_BASE <= this._baseIncome) {
      pensionBase = Tax.MAX_PENSION_BASE;
    } else {
      pensionBase = this._baseIncome;
    }
    return pensionBase * Tax.PENSION_RATE;
  }

  // 소득세
  get incomeTax() {
    // 과세표준 금액 계산
    let taxableIncome = this._baseIncome; // 급여액(비과세소득 제외)이 속한 급여구간의 중간 값 ×12개월
    taxableIncome = taxableIncome - Tax.calculateIncomeDeduction(this._baseIncome); // 근로소득공제
    taxableIncome = taxableIncome - Tax.calculateHumanDeduction(1); // 인적공제
    taxableIncome = taxableIncome - this.pensionTax; // 연금보험료공제
    taxableIncome = taxableIncome - Tax.calculateSpecialDeduction(this._baseIncome); // 특별소득공제
    return Tax.calculateIncomeTax(taxableIncome);
  }

  // 주민세
  get nationalTax() {
    return this.incomeTax * 0.1;
  }

}

export { Tax };