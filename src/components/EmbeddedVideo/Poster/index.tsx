import clsx from 'clsx';
import { FaYoutube } from 'react-icons/fa';

import styles from './styles.module.scss';

type Props = {
  posterUrl: string;
  onPointerOver: () => void;
  onClick: () => void;
};

export default function Poster({ posterUrl, onPointerOver, onClick }: Props) {
  return (
    <div
      className={clsx('card', styles.poster)}
      style={{ backgroundImage: `url(${posterUrl})` }}
      onPointerOver={onPointerOver}
      onClick={onClick}
    >
      <FaYoutube className={styles.posterYTButton} />
    </div>
  );
}
