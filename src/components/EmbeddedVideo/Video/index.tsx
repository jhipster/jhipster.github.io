import clsx from 'clsx';

import styles from './styles.module.scss';

type Props = {
  video: string;
  title: string;
  className?: string;
};

export default function Video({ video, title, className }: Props) {
  return (
    <div className={clsx('card', styles.card, className)}>
      <iframe
        className={clsx('aspect-video', styles.iframe)}
        src={`https://www.youtube.com/embed/${video}`}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
