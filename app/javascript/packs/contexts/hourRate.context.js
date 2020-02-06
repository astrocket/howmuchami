import { createContext } from "react";

const hourRateContext = createContext({
  hourRate: 0,
  setCurrentHourRate: () => {}
});

export default hourRateContext;