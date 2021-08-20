import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import shuffle from 'lodash/shuffle';

import FactionsContext from '../contexts/FactionsContext';
import OptionsContext from '../contexts/OptionsContext';
import { classNames } from '../helpers/cssClasses';
import LightToggle from '../components/LightToggle';
import BoxesSection from '../components/sections/BoxesSection';
import OptionsSection from '../components/sections/OptionsSection';
import PlaySection from '../components/sections/PlaySection';

export default function Home() {
  const { factions, boxes } = useContext(FactionsContext);
  const [playersCount, setPlayersCount] = useState(2);
  const [chosenFactions, setChosenFactions] = useState([]);
  const [leftFactions, setLeftFactions] = useState(shuffle([...factions]));
  const [genId, setGenId] = useState(0);
  const { bestOfThree } = useContext(OptionsContext);

  const reset = () => setGenId(Math.random());

  useEffect(() => {
    setChosenFactions([]);
    setLeftFactions(shuffle([...factions]));
  }, [factions, bestOfThree, genId]);

  return (
    <div className={classNames('min-h-full flex flex-col justify-start')}>
      <div className="p-8 dark:bg-gray-800 min-h-full h-full dark:text-gray-200 flex flex-col justify-between flex-grow">
        <Head>
          <title>SmashUp Helper</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="text-5xl pb-12 flex justify-center w-full max-w-screen-2xl flex-col sm:flex-row mx-auto relative">
          <h1 className="self-center">Faction Randomizer</h1>
          <LightToggle className="self-end sm:pr-4 !absolute right-4" />
        </header>
        <main className="flex-grow">
          <BoxesSection boxes={boxes} reset={reset} />
          <OptionsSection
            playersCount={playersCount}
            setPlayersCount={setPlayersCount}
          />
          <PlaySection
            chosenFactions={chosenFactions}
            leftFactions={leftFactions}
            playersCount={playersCount}
            reset={reset}
            setChosenFactions={setChosenFactions}
            setLeftFactions={setLeftFactions}
          />
        </main>
        <footer />
      </div>
    </div>
  );
}
