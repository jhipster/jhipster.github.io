import React from 'react';
import clsx from 'clsx';
import useIsBrowser from '@docusaurus/useIsBrowser';
import { translate } from '@docusaurus/Translate';
import { RxMoon, RxSun } from 'react-icons/rx';

import type { Props } from '@theme/ColorModeToggle';

import styles from './styles.module.scss';

function getColorModeLabel(value: Props['value']) {
  if (value === null) {
    return translate({
      message: 'system mode',
      id: 'theme.colorToggle.ariaLabel.mode.system',
      description: 'The name for the system color mode',
    });
  }

  return value === 'dark'
    ? translate({
        message: 'dark mode',
        id: 'theme.colorToggle.ariaLabel.mode.dark',
        description: 'The name for the dark color mode',
      })
    : translate({
        message: 'light mode',
        id: 'theme.colorToggle.ariaLabel.mode.light',
        description: 'The name for the light color mode',
      });
}

function ColorModeToggle({
  className,
  buttonClassName,
  respectPrefersColorScheme,
  value,
  onChange,
}: Props): JSX.Element {
  const isBrowser = useIsBrowser();

  const title = translate(
    {
      message: 'Switch between dark and light mode (currently {mode})',
      id: 'theme.colorToggle.ariaLabel',
      description: 'The ARIA label for the navbar color mode toggle',
    },
    {
      mode: getColorModeLabel(value),
    },
  );

  return (
    <div className={clsx(styles.toggle, className)}>
      <button
        className={clsx(
          'clean-btn',
          styles.toggleButton,
          !isBrowser && styles.toggleButtonDisabled,
          buttonClassName,
        )}
        type="button"
        onClick={() =>
          onChange(
            respectPrefersColorScheme
              ? value === null
                ? 'light'
                : value === 'light'
                  ? 'dark'
                  : null
              : value === 'dark'
                ? 'light'
                : 'dark',
          )
        }
        disabled={!isBrowser}
        title={title}
        aria-label={title}
        aria-live="polite"
      >
        <RxSun className={clsx(styles.toggleIcon, styles.lightToggleIcon)} />
        <RxMoon className={clsx(styles.toggleIcon, styles.darkToggleIcon)} />
      </button>
    </div>
  );
}

export default React.memo(ColorModeToggle);
