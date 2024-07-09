import { GrTechnology } from 'react-icons/gr';

import styles from './styles.module.scss';

import streams from '@site/src/data/streams.json';

export default function StreamsList() {
  return (
    <ul className={styles.list}>
      {streams.map((item, idx) => (
        <li key={`stream-${idx}`}>
          <div className="avatar">
            <GrTechnology className={styles.cardIcon} />

            <div className="avatar__intro">
              <div className="avatar__name">{item.label}</div>
              {item.leader ? (
                <small className="avatar__subtitle">
                  Leader: {item.leader}
                </small>
              ) : null}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
