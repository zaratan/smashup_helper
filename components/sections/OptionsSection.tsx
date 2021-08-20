import React from 'react';
import FoldableSection from '../FoldableSection';
import OptionNumberPlayers from '../OptionNumberPlayers';
import OptionPickThreeFactions from '../OptionPickThreeFactions';

function OptionsSection({
  playersCount,
  setPlayersCount,
}: {
  playersCount: number;
  setPlayersCount: (value: number) => void;
}) {
  return (
    <FoldableSection title="Options">
      <form className="max-w-2xl">
        <OptionNumberPlayers
          playersCount={playersCount}
          setPlayersCount={setPlayersCount}
        />
        <OptionPickThreeFactions />
      </form>
    </FoldableSection>
  );
}

export default OptionsSection;
