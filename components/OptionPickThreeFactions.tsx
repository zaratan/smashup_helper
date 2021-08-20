/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext } from 'react';
import OptionsContext from '../contexts/OptionsContext';

function OptionPickThreeFactions() {
  const { bestOfThree, toggleBestOfThree } = useContext(OptionsContext);

  return (
    <div className="relative flex items-start py-4">
      <div className="min-w-0 flex-1 text-sm">
        <label
          htmlFor="draw-three-factions"
          className="font-medium text-gray-700 dark:text-gray-200"
        >
          Draw 3 factions :
        </label>
      </div>
      <div className="ml-3 flex items-center h-5">
        <input
          id="draw-three-factions"
          name="draw-three-factions"
          type="checkbox"
          checked={bestOfThree}
          onChange={() => toggleBestOfThree()}
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded"
        />
      </div>
    </div>
  );
}

export default OptionPickThreeFactions;
