import { useEffect, useState, type ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { createPortal } from 'react-dom';

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
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Guard for SSR: only run in browser
    if (typeof document === 'undefined') return;

    const el = document.createElement('div');
    el.className = `av-tooltip-portal av-tooltip-portal-${props.id}`;
    const tutorialKitContainer = document.querySelector('[data-id="main"]');
    if (tutorialKitContainer) {
      tutorialKitContainer.appendChild(el);
    } else {
      console.warn('[AVTooltip]: appending to body');
      document.body.appendChild(el);
    }
    setContainer(el);
    setMounted(true);

    return () => {
      if (el.parentNode) el.parentNode.removeChild(el);
      setMounted(false);
      setContainer(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!mounted || !container) return null;

  return createPortal(
    <Tooltip
      key={props.id}
      id={props.id}
      clickable
      float
      className="sc-custom-tooltip"
      border="1px solid var(--amv-highlight)"
      // isOpen // uncomment to work on the styles (it remains open)
    >
      <div className="w-auto max-w-xs sm:max-w-sm md:max-w-lg p-0 bg-white dark:bg-bgr/90 text-neutral">
        {props.children}
      </div>
    </Tooltip>,
    container
  );
}
