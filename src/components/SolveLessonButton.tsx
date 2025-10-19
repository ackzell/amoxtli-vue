import { useState } from 'react';
import tutorialStore from 'tutorialkit:store';

export function SolveLessonButton() {
  return <button onClick={() => tutorialStore.solve()}>Solve</button>;
}

export function ResetLessonButton() {
  return <button onClick={() => tutorialStore.reset()}>Reset</button>;
}

type ToggleLessonStateButtonProps = {
  solveStr?: string;
  resetStr?: string;
};

export function ToggleLessonStateButton({
  resetStr = 'Reset',
  solveStr = 'Solve',
  ...props
}: ToggleLessonStateButtonProps) {
  const [solved, setSolved] = useState(false);
  return (
    <button
      className="`
      p-0 rounded 
      text-text/80 dark:text-text-dark/80  
      hover:text-primary-600 dark:hover:text-primary-dark-400
      `"
      onClick={() => {
        if (solved) {
          tutorialStore.reset();
        } else {
          tutorialStore.solve();
        }
        setSolved(!solved);
      }}
    >
      {solved ? (
        <div className="flex items-center gap-1">
          <div className="i-carbon-reset inline-block"></div>
          {resetStr}
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <div className="i-carbon-idea inline-block"></div>
          {solveStr}
        </div>
      )}
    </button>
  );
}
