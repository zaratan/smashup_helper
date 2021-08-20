import React from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { Disclosure } from '@headlessui/react';
import { classNames } from '../helpers/cssClasses';

function SectionSeparator({
  title,
  hidden,
  className,
  foldButton,
}: {
  title: string;
  hidden?: boolean;
  className?: string;
  foldButton?: boolean;
}) {
  const ButtonIcon = hidden ? EyeIcon : EyeOffIcon;

  return (
    <div className={classNames('relative', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300 dark:border-gray-500" />
      </div>
      <div className="relative flex items-center justify-center">
        <span className="px-3 bg-white dark:bg-gray-800 text-lg font-medium text-gray-900 dark:text-gray-200">
          {title}
        </span>
        {foldButton ? (
          <Disclosure.Button
            type="button"
            className="absolute right-2 inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 dark:border-gray-500 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <ButtonIcon
              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>{hidden ? 'Show' : 'Hide'}</span>
          </Disclosure.Button>
        ) : null}
      </div>
    </div>
  );
}

export default SectionSeparator;
