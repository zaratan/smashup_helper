/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, ReactNode } from 'react';

type ContextType = {
  bestOfThree: boolean;
  toggleBestOfThree: () => void;
};

const defaultContext: ContextType = {
  bestOfThree: false,
  toggleBestOfThree: () => {},
};

const LS_BEST_OF_THREE_KEY = 'OptionsContext:bestOfThree';

const OptionsContext = createContext(defaultContext);
export const OptionsProvider = ({ children }: { children: ReactNode }) => {
  const [bestOfThree, setBestOfThree] = useState(false);

  const toggleBestOfThree = () => {
    const nextBestOfThree = !bestOfThree;
    window.localStorage.setItem(
      LS_BEST_OF_THREE_KEY,
      JSON.stringify(nextBestOfThree)
    );
    setBestOfThree(nextBestOfThree);
  };

  useEffect(() => {
    const lsBestOfThree = JSON.parse(
      window.localStorage.getItem(LS_BEST_OF_THREE_KEY)
    );
    if (lsBestOfThree === true) {
      setBestOfThree(lsBestOfThree);
    }
  }, []);

  const context: ContextType = {
    bestOfThree,
    toggleBestOfThree,
  };

  return (
    <OptionsContext.Provider value={context}>
      {children}
    </OptionsContext.Provider>
  );
};

export default OptionsContext;
