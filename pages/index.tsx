import Head from 'next/head';
import { useState, useContext, useEffect, useCallback } from 'react';
import shuffle from 'lodash/shuffle';

import FactionsContext from '../contexts/FactionsContext';
import { generateHandleClick } from '../helpers/handlers';
import OptionsContext from '../contexts/OptionsContext';

export default function Home() {
  const { factions, boxes, toggleFaction } = useContext(FactionsContext);
  const [playerCount, setPlayerCount] = useState(2);
  const [chosenFactions, setChosenFactions] = useState([]);
  const [leftFactions, setLeftFactions] = useState(shuffle([...factions]));
  const { bestOfThree, toggleBestOfThree } = useContext(OptionsContext);

  const onClick = () => {
    const tmpLeftFactions = [...leftFactions];
    setChosenFactions([
      ...chosenFactions,
      [
        tmpLeftFactions.pop(),
        tmpLeftFactions.pop(),
        bestOfThree ? tmpLeftFactions.pop() : null,
      ].filter((e) => e),
    ]);
    setLeftFactions(tmpLeftFactions);
  };

  const reset = useCallback(() => {
    setChosenFactions([]);
    setLeftFactions(shuffle([...factions]));
  }, [factions]);

  useEffect(() => {
    reset();
  }, [reset]);

  const onClickBox = (name: string) => () => {
    toggleFaction(name);
    reset();
  };

  const isResetButton = chosenFactions.length >= playerCount;

  return (
    <div className="p-8">
      <Head>
        <title>SmashUp Helper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="text-center text-5xl pb-6">
        <h1>Faction Randomizer</h1>
      </header>
      <section className="pb-4">
        <h2 className="text-center text-3xl pb-2">Boxes</h2>
        <ul className="grid gap-2 grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto justify-center">
          {boxes.map((box) => (
            <li className="" key={box.name}>
              <button
                key={box.name}
                className={`${
                  box.selected
                    ? 'bg-green-300 hover:bg-green-400 focus:bg-green-400  transition-colors'
                    : 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 transition-colors'
                } p-2 rounded cursor-pointer whitespace-no-wrap w-full transition duration-200`}
                onClick={generateHandleClick(onClickBox(box.name))}
                type="button"
              >
                {box.name}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <main className="container mx-auto space-y-1 grid grid-cols-1 gap-8 col-gap-16 sm:grid-flow-col-dense py-5 w-4/5">
        <section className="">
          <label
            htmlFor="number-player-input"
            className="my-5 border-b w-full py-5 flex justify-between items-baseline"
          >
            Number of players :
            <input
              type="number"
              min={2}
              max={6}
              id="number-player-input"
              placeholder="Number of player"
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-1/2 border border-solid border-gray-300 rounded p-1"
            />
          </label>
          <label
            htmlFor="options-best-of-three"
            className="my-5 border-b w-full py-5 flex justify-between items-baseline"
          >
            Draw 3 factions :
            <input
              type="checkbox"
              id="options-best-of-three"
              checked={bestOfThree}
              onChange={() => toggleBestOfThree()}
            />
          </label>
          <ul className="space-y-2">
            {chosenFactions.map((playerFactions) => (
              <li key={playerFactions.join(',')}>
                {playerFactions.join(' - ')}
              </li>
            ))}
          </ul>
        </section>
        <aside className="sm:pt-20">
          <input
            type="submit"
            value={isResetButton ? 'Reset' : 'Go!'}
            onClick={isResetButton ? reset : onClick}
            className={`w-full sm:w-20 cursor-pointer p-1 ${
              isResetButton
                ? 'bg-red-300 hover:bg-red-400 focus:bg-red-400'
                : 'bg-blue-300 hover:bg-blue-400 focus:bg-blue-400'
            } rounded transition duration-200`}
          />
        </aside>
      </main>

      <footer />
    </div>
  );
}
