import React, { ReactNode } from 'react';
import { classNames } from '../helpers/cssClasses';
import SectionSeparator from './SectionSeparator';

function Section({
  children,
  title,
  className,
}: {
  children: ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <section className={classNames(className, 'mb-6 max-w-6xl mx-auto')}>
      <SectionSeparator title={title} foldButton={false} className="mb-10" />
      <article className="flex flex-col justify-center items-center">
        {children}
      </article>
    </section>
  );
}

export default Section;
