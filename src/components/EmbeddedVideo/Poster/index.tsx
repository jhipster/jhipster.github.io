import clsx from 'clsx';
import { FaYoutube } from 'react-icons/fa';

import styles from './styles.module.scss';

type Props = {
  className?: string;
  posterUrl: string;
  onPointerOver: () => void;
  onClick: () => void;
};

export default function Poster({
  className,
  posterUrl,
  onPointerOver,
  onClick,
}: Props) {
  return (
    <div
      className={clsx('card aspect-video', styles.poster, className)}
      style={{ backgroundImage: `url(${posterUrl})` }}
      onPointerOver={onPointerOver}
      onClick={onClick}
    >
      <FaYoutube className={styles.posterYTButton} aria-label="Play video" />
    </div>
  );
}
