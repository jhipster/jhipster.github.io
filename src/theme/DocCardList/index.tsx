import type { Props } from '@theme/DocCardList';
import React from 'react';
import clsx from 'clsx';

import {
  useCurrentSidebarCategory,
  filterDocCardListItems,
} from '@docusaurus/theme-common';
import DocCard from '@theme/DocCard';
import Releases from '@site/src/components/sections/docs/Releases';

type DocCardListProps = Props & {
  isReleases?: boolean;
};

function DocCardListForCurrentSidebarCategory({
  className,
  isReleases,
}: DocCardListProps) {
  const category = useCurrentSidebarCategory();
  return (
    <DocCardList
      items={category.items}
      className={className}
      isReleases={isReleases}
    />
  );
}

export default function DocCardList(props: DocCardListProps): JSX.Element {
  const { items, className, isReleases = false } = props;

  if (!items) {
    return <DocCardListForCurrentSidebarCategory {...props} />;
  }

  const preparedItems = isReleases ? prepareReleases(items) : items;
  const filteredItems = filterDocCardListItems(preparedItems);

  return (
    <>
      {isReleases ? (
        <Releases items={filteredItems} />
      ) : (
        <section className={clsx('row', className)}>
          {filteredItems.map((item, index) => (
            <article key={index} className="col col--6 margin-bottom--lg">
              <DocCard item={item} />
            </article>
          ))}
        </section>
      )}
    </>
  );
}

function prepareReleases(items: any[]) {
  return items
    .filter((item) => item.docId !== 'releases/index')
    .map((item) => {
      const date = item.docId.split('releases/')[1].slice(0, 10);

      return { ...item, date };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}
