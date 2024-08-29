import { ImSpinner2 } from 'react-icons/im';
import styles from './styles.module.scss';

export default function Loading() {
  return (
    <div className={styles.section}>
      <ImSpinner2 className={styles.sectionIcon} />
    </div>
  );
}
