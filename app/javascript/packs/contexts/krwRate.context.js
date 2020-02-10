import { createContext } from "react";

const krwRateContext = createContext({
  hourRate: 0,
  setCurrentHourRate: () => {},
  monthRate: 0,
  setCurrentMonthRate: () => {},
});

export default krwRateContext;