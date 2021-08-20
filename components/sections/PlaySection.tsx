import React, { useContext } from 'react';
import OptionsContext from '../../contexts/OptionsContext';
import { classNames } from '../../helpers/cssClasses';
import Section from '../Section';

function PlaySection({
  chosenFactions,
  playersCount,
  leftFactions,
  setLeftFactions,
  setChosenFactions,
  reset,
}: {
  chosenFactions: Array<Array<string>>;
  playersCount: number;
  leftFactions: Array<string>;
  setLeftFactions: (factions: Array<string>) => void;
  setChosenFactions: (factions: Array<Array<string>>) => void;
  reset: () => void;
}) {
  const { bestOfThree: drawThreeFactions } = useContext(OptionsContext);

  const onClick = () => {
    const tmpLeftFactions = [...leftFactions];
    setChosenFactions([
      ...chosenFactions,
      [
        tmpLeftFactions.pop(),
        tmpLeftFactions.pop(),
        drawThreeFactions ? tmpLeftFactions.pop() : null,
      ].filter((e) => e),
    ]);
    setLeftFactions(tmpLeftFactions);
  };

  const isResetButton = chosenFactions.length >= playersCount;

  return (
    <Section title="Play">
      <button
        type="button"
        onClick={isResetButton ? reset : onClick}
        className={classNames(
          ' transition-colors mb-4 max-w-2xl w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
          isResetButton
            ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
            : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700'
        )}
      >
        {isResetButton ? 'Reset' : 'Go!'}
      </button>
      <ul className="space-y-2 max-w-2xl w-full">
        {chosenFactions.map((playerFactions, count) =>
          count < playersCount ? (
            <li key={playerFactions.join(',')}>
              Player {count + 1} : {playerFactions.join(' - ')}
            </li>
          ) : null
        )}
      </ul>
    </Section>
  );
}

export default PlaySection;
