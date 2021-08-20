import React, { ReactNode, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import SectionSeparator from './SectionSeparator';
import { classNames } from '../helpers/cssClasses';

const WrappedSection = ({
  open,
  children,
  title,
  className,
  close,
}: {
  open: boolean;
  children: ReactNode;
  title: string;
  className?: string;
  close: () => void;
}) => {
  useEffect(() => {
    const lsOpen = JSON.parse(
      window.localStorage.getItem(`FoldableSection:${title}`)
    );

    if (lsOpen === false) {
      close();
    }
  }, [close, title]);

  useEffect(() => {
    console.log('LOL');
    window.localStorage.setItem(
      `FoldableSection:${title}`,
      JSON.stringify(open)
    );
  }, [open, title]);

  return (
    <section className={classNames(className, 'mb-6 max-w-6xl mx-auto')}>
      <SectionSeparator
        title={title}
        hidden={!open}
        className="mb-10"
        foldButton
      />
      <Disclosure.Panel>{children}</Disclosure.Panel>
    </section>
  );
};

function FoldableSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Disclosure defaultOpen>
      {({ open, close }) => (
        <WrappedSection
          open={open}
          title={title}
          className={className}
          close={close}
        >
          {children}
        </WrappedSection>
      )}
    </Disclosure>
  );
}

export default FoldableSection;
