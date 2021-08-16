import { Switch } from '@headlessui/react';
import React, { useContext } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import ThemeContext from '../contexts/ThemeContext';
import { classNames } from '../helpers/cssClasses';

const LightToggle = ({ className }: { className?: string }) => {
  const { darkMode: enabled, setDarkMode: setEnabled } =
    useContext(ThemeContext);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={classNames(
        className,
        enabled ? 'bg-indigo-600' : 'bg-yellow-300',
        'relative inline-flex flex-shrink-0 h-9 w-16 border-4 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 group'
      )}
    >
      <span className="sr-only">Light mode</span>
      <span
        className={classNames(
          enabled ? 'translate-x-7' : 'translate-x-0',
          'pointer-events-none relative inline-block h-7 w-7 rounded-full bg-white dark:bg-gray-200 group-hover:bg-indigo-100 dark:group-hover:bg-yellow-100 shadow transform ring-0 transition ease-in-out duration-200'
        )}
      >
        <span
          className={classNames(
            enabled
              ? 'opacity-0 ease-out duration-100'
              : 'opacity-100 ease-in duration-200',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-4 w-4 text-gray-800" />
        </span>
        <span
          className={classNames(
            enabled
              ? 'opacity-100 ease-in duration-200'
              : 'opacity-0 ease-out duration-100',
            'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-4 w-4 text-gray-800" />
        </span>
      </span>
    </Switch>
  );
};

export default LightToggle;
