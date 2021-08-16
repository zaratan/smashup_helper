import { MouseEvent, FormEvent } from 'react';

export const generateHandleClick =
  (changeFunc: (e: FormEvent) => void) => (e: MouseEvent<HTMLSpanElement>) => {
    changeFunc(e);
  };
