import React, {
  useState, useCallback
} from 'react';

const useKrwRate = () => {
  const [ hourRate, setHourRate ] = useState(0);
  const [ monthRate, setMonthRate ] = useState(0);

  const setCurrentHourRate = useCallback((currentHourRate) => {
    setHourRate(currentHourRate);
  }, []);

  const setCurrentMonthRate = useCallback((currentMonthRate) => {
    setMonthRate(currentMonthRate);
  }, []);

  return {
    hourRate,
    setCurrentHourRate,
    monthRate,
    setCurrentMonthRate,
  }
};

export default useKrwRate;