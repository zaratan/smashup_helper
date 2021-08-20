import React from 'react';
import { BoxType } from '../../contexts/FactionsContext';
import Box from '../Box';
import FoldableSection from '../FoldableSection';

function BoxesSection({
  boxes,
  reset,
}: {
  boxes: Array<BoxType>;
  reset: () => void;
}) {
  return (
    <FoldableSection className="pb-4" title="Boxes">
      <ul className="grid gap-2 grid-flow-row-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-lg mx-auto justify-center">
        {boxes.map((box) => (
          <Box box={box} reset={reset} key={box.name} />
        ))}
      </ul>
    </FoldableSection>
  );
}

export default BoxesSection;
