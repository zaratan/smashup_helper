import React, { ReactNode, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import SectionSeparator from './SectionSeparator';
import { classNames } from '../helpers/cssClasses';

function FoldableSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const [defaultOpen, setDefaultOpen] = useState(true);

  useEffect(() => {
    const lsOpen = JSON.parse(
      window.localStorage.getItem(`FoldableSection:${title}`)
    );

    if (lsOpen === false) {
      setDefaultOpen(false);
    }
  }, [title]);

  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <section className={classNames(className, 'mb-6 max-w-6xl mx-auto')}>
          <SectionSeparator
            title={title}
            hidden={!open}
            className="mb-10"
            foldButton
          />
          <Disclosure.Panel>{children}</Disclosure.Panel>
        </section>
      )}
    </Disclosure>
  );
}

export default FoldableSection;
