import Loading from '@site/src/components/Loading';
import ModuleCard from './ModuleCard';
import styles from './styles.module.scss';

type Props = {
  isLoading: boolean;
  filteredModules: any[];
};

export default function MarketplaceList({ isLoading, filteredModules }: Props) {
  return (
    <section className={styles.section}>
      <div className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <ul className={styles.sectionList}>
            {filteredModules.map((item, idx) => (
              <li key={`module-${idx}`}>
                <ModuleCard module={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
