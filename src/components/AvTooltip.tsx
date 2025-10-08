import { useEffect, useState, type ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

export { AvTooltip, AvTooltipContent };

type AvTooltipProps = {
  children: ReactNode;
  id: string;
};

function AvTooltip(props: AvTooltipProps) {
  return (
    <span
      data-tooltip-id={props.id}
      className="cursor-pointer underline decoration-dotted"
    >
      {props.children}
      <span className="text-highlight dark:text-highlightDark p-0 m-0">*</span>
    </span>
  );
}

type AvTooltipContentProps = {
  children: ReactNode;
  id: string;
};

function AvTooltipContent(props: AvTooltipContentProps) {
  console.log('uhhhh what?', props);

  return (
    <Tooltip
      key={props.id}
      id={props.id}
      clickable
      float
      className="sc-custom-tooltip"
      border="1px solid var(--amv-highlight)"
      isOpen
      // disableStyleInjection
    >
      <div className="w-auto max-w-sm md:max-w-lg p-1 bg-white/90 dark:bg-bgr/90 text-neutral">
        {props.children}
      </div>
    </Tooltip>
  );
}
