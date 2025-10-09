import { useEffect, useState, type ReactNode } from 'react';
import { Tooltip } from 'react-tooltip';
import { createPortal } from 'react-dom';
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
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    // Create portal container
    const container = document.createElement('div');
    container.className = 'av-tooltip-portal';
    container.style.cssText =
      'position: fixed; z-index: 99999; pointer-events: none;';

    // Try to append to TutorialKit's main container, fallback to body
    const tutorialKitMain = document.querySelector('[data-id="main"]');
    const parentElement = tutorialKitMain || document.body;

    parentElement.appendChild(container);
    setPortalContainer(container);

    return () => {
      container.remove();
    };
  }, []);

  // Don't render until we have a portal container
  if (!portalContainer) return null;

  return createPortal(
    <Tooltip
      id={props.id}
      clickable
      float
      className="sc-custom-tooltip"
      border="1px solid var(--amv-highlight)"
      style={{ pointerEvents: 'auto' }}
      disableStyleInjection={false}
    >
      <div className="w-auto max-w-xs sm:max-w-sm md:max-w-lg p-1 bg-white dark:bg-bgr text-neutral">
        {props.children}
      </div>
    </Tooltip>,
    portalContainer
  );
}
