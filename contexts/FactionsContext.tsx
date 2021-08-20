/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import produce from 'immer';

import FACTIONS from '../data/factions.json';

export type BoxType = {
  name: string;
  factions: Array<string>;
  selected: boolean;
  image?: string;
};

type ContextType = {
  factions: Array<string>;
  boxes: Array<BoxType>;
  toggleFaction: (name: string) => void;
};

const defaultContext: ContextType = {
  factions: [],
  boxes: [],
  toggleFaction: () => {},
};

const FactionsContext = createContext(defaultContext);

export const FactionsProvider = ({ children }: { children: ReactNode }) => {
  const [boxes, setBoxes] = useState(
    FACTIONS.boxes.map((box) => ({ ...box, selected: box.name === 'Base' }))
  );

  useEffect(() => {
    const lsFactions: Array<string> = JSON.parse(
      localStorage.getItem('FactionsContext:selectedFactions')
    );
    if (lsFactions) {
      setBoxes(
        produce(boxes, (draftBoxes) => {
          lsFactions.forEach((lsFaction) => {
            const toSelectBox = draftBoxes.find(
              (box) => box.name === lsFaction
            );
            if (toSelectBox) toSelectBox.selected = true;
          });
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFaction = (name: string) => {
    setBoxes(
      produce(boxes, (draftBoxes) => {
        const boxToUpdate = draftBoxes.find((box) => box.name === name);
        if (boxToUpdate) {
          boxToUpdate.selected = !boxToUpdate.selected;
          localStorage.setItem(
            'FactionsContext:selectedFactions',
            JSON.stringify(
              draftBoxes.filter((box) => box.selected).map((box) => box.name)
            )
          );
        }
      })
    );
  };

  const factions = boxes
    .filter((box) => box.selected)
    .flatMap((box) => box.factions);

  const context: ContextType = {
    boxes,
    factions,
    toggleFaction,
  };

  return (
    <FactionsContext.Provider value={context}>
      {children}
    </FactionsContext.Provider>
  );
};

export default FactionsContext;
