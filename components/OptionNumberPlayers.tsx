/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function OptionNumberPlayers({
  playersCount,
  setPlayersCount,
}: {
  playersCount: number;
  setPlayersCount: (newCount: number) => void;
}) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-gray-200 sm:dark:border-gray-600 sm:pt-5">
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 sm:mt-px sm:pt-2"
      >
        Number of players :
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2 flex justify-end">
        <input
          type="number"
          min={2}
          max={6}
          name="first-name"
          id="first-name"
          placeholder="Number of players"
          value={playersCount}
          onChange={(e) => setPlayersCount(Number(e.target.value))}
          className="max-w-xs block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-md"
        />
      </div>
    </div>
  );
}

export default OptionNumberPlayers;
