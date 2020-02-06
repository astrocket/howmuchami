import React, {
  useState, useEffect
} from 'react';

const useHourRate = () => {
  const [ hourRate, setHourRate ] = useState(0);

  const setCurrentHourRate = useEffect((currentHourRate) => {
    setHourRate(currentHourRate);
  }, []);

  return {
    hourRate,
    setCurrentHourRate,
  }
};

export default useHourRate;