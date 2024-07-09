import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

import styles from './styles.module.scss';

const SectionWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ id, className, children }, ref) => (
  <section id={id} ref={ref} className={clsx(styles.section, className)}>
    <div className="container">{children}</div>
  </section>
));
SectionWrapper.displayName = 'SectionWrapper';

// Title
const sectionTitleVariants = cva('', {
  variants: {
    align: {
      center: styles.sectionTitleCenter,
      start: styles.sectionTitleStart,
    },
    size: {
      default: styles.sectionTitle,
      sm: styles.sectionTitleSmall,
    },
  },
  defaultVariants: {
    align: 'center',
    size: 'default',
  },
});

export type SectionTitleProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof sectionTitleVariants>;

const SectionTitle = React.forwardRef<HTMLHeadingElement, SectionTitleProps>(
  ({ className, align, size, children }, ref) => (
    <h2
      ref={ref}
      className={clsx(sectionTitleVariants({ align, size, className }))}
    >
      {children}
    </h2>
  ),
);
SectionTitle.displayName = 'SectionTitle';

// Description
const sectionDescriptionVariants = cva(styles.sectionDescription, {
  variants: {
    align: {
      center: styles.sectionDescriptionCenter,
      start: styles.sectionDescriptionStart,
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

export type SectionDescriptionProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sectionDescriptionVariants>;

const SectionDescription = React.forwardRef<
  HTMLDivElement,
  SectionDescriptionProps
>(({ className, align, children }, ref) => (
  <div
    ref={ref}
    className={clsx(sectionDescriptionVariants({ align, className }))}
  >
    {children}
  </div>
));
SectionDescription.displayName = 'SectionDescription';

export { SectionWrapper, SectionTitle, SectionDescription };
