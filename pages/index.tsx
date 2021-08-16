import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import shuffle from 'lodash/shuffle';

import FactionsContext from '../contexts/FactionsContext';
import { generateHandleClick } from '../helpers/handlers';
import OptionsContext from '../contexts/OptionsContext';
import ThemeContext from '../contexts/ThemeContext';
import { classNames } from '../helpers/cssClasses';
import LightToggle from '../components/LightToggle';

export default function Home() {
  const { factions, boxes, toggleFaction } = useContext(FactionsContext);
  const [playerCount, setPlayerCount] = useState(2);
  const [chosenFactions, setChosenFactions] = useState([]);
  const [leftFactions, setLeftFactions] = useState(shuffle([...factions]));
  const [genId, setGenId] = useState(0);
  const { bestOfThree, toggleBestOfThree } = useContext(OptionsContext);
  const { darkMode } = useContext(ThemeContext);

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

  const reset = () => setGenId(Math.random());

  useEffect(() => {
    setChosenFactions([]);
    setLeftFactions(shuffle([...factions]));
  }, [factions, bestOfThree, genId]);

  const onClickBox = (name: string) => () => {
    toggleFaction(name);
    reset();
  };

  const isResetButton = chosenFactions.length >= playerCount;

  return (
    <div className={classNames(darkMode && 'dark')}>
      <div className="p-8 dark:bg-gray-800 min-h-screen dark:text-gray-200 flex flex-col justify-between">
        <Head>
          <title>SmashUp Helper</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="text-5xl pb-6 flex justify-between w-full max-w-screen-2xl flex-col sm:flex-row">
          <span />
          <h1>Faction Randomizer</h1>
          <LightToggle className="self-end sm:pr-4" />
        </header>
        <main className="flex-grow">
          <section className="pb-4">
            <h2 className="text-center text-3xl pb-2">Boxes</h2>
            <ul className="grid gap-2 grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto justify-center">
              {boxes.map((box) => (
                <li className="" key={box.name}>
                  <button
                    key={box.name}
                    className={`${
                      box.selected
                        ? 'bg-green-300 hover:bg-green-400 focus:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:bg-green-700'
                        : 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600'
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
          <section className="container mx-auto space-y-1 grid grid-cols-1 gap-8 col-gap-16 sm:grid-flow-col-dense py-5 w-4/5">
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
                  className="w-1/2 border border-solid border-gray-300 rounded p-1 dark:bg-gray-800 dark:border-gray-600"
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
                {chosenFactions.map((playerFactions, count) =>
                  count < playerCount ? (
                    <li key={playerFactions.join(',')}>
                      {playerFactions.join(' - ')}
                    </li>
                  ) : null
                )}
              </ul>
            </section>
            <aside className="sm:pt-20">
              <input
                type="submit"
                value={isResetButton ? 'Reset' : 'Go!'}
                onClick={isResetButton ? reset : onClick}
                className={`w-full sm:w-40 cursor-pointer p-2 ${
                  isResetButton
                    ? 'bg-red-300 hover:bg-red-400 focus:bg-red-400 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:bg-red-600'
                    : 'bg-blue-300 hover:bg-blue-400 focus:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:bg-blue-600'
                } rounded transition duration-200`}
              />
            </aside>
          </section>
        </main>

        <footer />
      </div>
    </div>
  );
}
