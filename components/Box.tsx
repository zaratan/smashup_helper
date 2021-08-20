import React, { useContext } from 'react';
import Image from 'next/image';
import FactionsContext, { BoxType } from '../contexts/FactionsContext';
import { generateHandleClick } from '../helpers/handlers';
import images from '../data/images';

function Box({ box, reset }: { box: BoxType; reset: () => void }) {
  const { toggleFaction } = useContext(FactionsContext);

  const onClickBox = (name: string) => () => {
    toggleFaction(name);
    reset();
  };

  return (
    <li>
      <button
        key={box.name}
        className={`${
          box.selected
            ? 'bg-green-300 hover:bg-green-400 focus:bg-green-400 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:bg-green-700'
            : 'bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600'
        } p-2 rounded cursor-pointer whitespace-no-wrap w-full transition duration-200 flex flex-col justify-center items-center space-y-2`}
        onClick={generateHandleClick(onClickBox(box.name))}
        type="button"
      >
        {box.image ? (
          <Image
            src={images[box.image]}
            alt={`Image for ${box.name} box`}
            height={80}
            width={80}
            quality={50}
          />
        ) : null}
        <span>{box.name}</span>
      </button>
    </li>
  );
}

export default Box;
