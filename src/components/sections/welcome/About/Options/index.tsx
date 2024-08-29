import styles from './styles.module.scss';

import OptionsList from './OptionsList';

export default function Options() {
  return (
    <div className={styles.section}>
      <div>
        <OptionsList title="Client Side Options" dataKey="clientSide" />
        <OptionsList title="Deployment Options" dataKey="deployment" />
        <OptionsList title="CI/CD Options" dataKey="cicd" />
      </div>
      <div>
        <OptionsList title="Server Side Options" dataKey="serverSide" />
      </div>
    </div>
  );
}
