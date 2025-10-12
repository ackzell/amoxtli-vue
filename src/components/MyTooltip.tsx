import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'react-tooltip';

type AvTooltipProps = {
  children: React.ReactNode;
};

function AvTooltip(props: AvTooltipProps) {
  return (
    <span
      data-tooltip-id="lesson-tooltip"
      className="cursor-pointer underline decoration-dotted"
    >
      {props.children}
      <span className="text-primary dark:text-primary-dark p-0 m-0">*</span>
    </span>
  );
}

const CORE_STYLES = `:root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay) ease-out}`;

const BASE_STYLES = `.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*="react-tooltip__place-top"]>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*="react-tooltip__place-right"]>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*="react-tooltip__place-bottom"]>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*="react-tooltip__place-left"]>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`;

function injectStyles() {
  if (!document.querySelector('#react-tooltip-core-styles')) {
    const coreStyle = document.createElement('style');
    coreStyle.id = 'react-tooltip-core-styles';
    coreStyle.textContent = CORE_STYLES;
    document.head.appendChild(coreStyle);
  }

  if (!document.querySelector('#react-tooltip-base-styles')) {
    const baseStyle = document.createElement('style');
    baseStyle.id = 'react-tooltip-base-styles';
    baseStyle.textContent = BASE_STYLES;
    document.head.appendChild(baseStyle);
  }
}

function AvTooltipContent(props: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [renderKey, setRenderKey] = useState(0);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null
  );

  useEffect(() => {
    injectStyles();
    setIsClient(true);
    setRenderKey((prev) => prev + 1);

    // Create portal container
    const container = document.createElement('div');
    container.className = 'av-tooltip-portal';
    container.style.cssText =
      'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 99999;';

    document.body.appendChild(container);
    setPortalContainer(container);

    const handleAfterSwap = () => {
      setIsClient(false);
      requestAnimationFrame(() => {
        injectStyles();
        setRenderKey((prev) => prev + 1);
        setIsClient(true);
      });
    };

    document.addEventListener('astro:after-swap', handleAfterSwap);

    return () => {
      document.removeEventListener('astro:after-swap', handleAfterSwap);
      container.remove();
    };
  }, []);

  if (!isClient || !portalContainer) return null;

  const tooltipContent = (
    <Tooltip
      key={renderKey}
      id="lesson-tooltip"
      clickable
      float
      className="sc-custom-tooltip"
      style={{ pointerEvents: 'auto' }}
      border="1px solid var(--av-primary)"
    >
      <div className="w-auto max-w-xs sm:max-w-sm md:max-w-lg p-0 bg-white dark:bg-bgr-dark/90">
        {props.children}
      </div>
    </Tooltip>
  );

  return createPortal(tooltipContent, portalContainer);
}

export { AvTooltip, AvTooltipContent };
