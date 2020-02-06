import { createContext } from "react";
const HourRateContext = createContext({
  hourRate: 0,
  setCurrentHourRate: () => {}
});
export default HourRateContext;