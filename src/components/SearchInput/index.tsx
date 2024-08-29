import { InputHTMLAttributes } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';

import { Input } from '@site/src/components/ui/Input';
import styles from './styles.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function SearchInput(props: Props) {
  return (
    <div className={styles.searchInput}>
      <Input {...props} />
      <HiOutlineSearch className={styles.searchInputIcon} />
    </div>
  );
}
