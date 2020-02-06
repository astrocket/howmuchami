import { createContext } from "react";
const HourRateContext = createContext({
  hourRate: 0,
  setHourRate: () => {}
});
export default HourRateContext;