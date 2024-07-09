import { translate } from '@docusaurus/Translate';
import styles from './styles.module.scss';

import OptionsList from './OptionsList';

export default function Options() {
  return (
    <div className={styles.section}>
      <div>
        <OptionsList
          title={translate({ message: 'Client Side Options' })}
          dataKey="clientSide"
        />
        <OptionsList
          title={translate({ message: 'Deployment Options' })}
          dataKey="deployment"
        />
        <OptionsList
          title={translate({ message: 'CI/CD Options' })}
          dataKey="cicd"
        />
      </div>
      <div>
        <OptionsList
          title={translate({ message: 'Server Side Options' })}
          dataKey="serverSide"
        />
      </div>
    </div>
  );
}
