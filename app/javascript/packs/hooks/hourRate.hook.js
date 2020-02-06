import React, {
  useState, useCallback
} from 'react';

const useHourRate = () => {
  const [ hourRate, setHourRate ] = useState(0);

  const setCurrentHourRate = useCallback((currentHourRate) => {
    setHourRate(currentHourRate);
  }, []);

  return {
    hourRate,
    setCurrentHourRate,
  }
};

export default useHourRate;