import { translate } from '@docusaurus/Translate';

import OpenCollectiveWrapper from '../OpenCollectiveWrapper';
import styles from './styles.module.scss';

export default function OpenCollectiveBackers() {
  return (
    <OpenCollectiveWrapper
      title={translate({ message: 'Thank you to all our backers!' })}
    >
      <div className={styles.section}>
        {/* shown in large screens only */}
        <object
          className={styles.sectionDesktop}
          data="https://opencollective.com/generator-jhipster/tiers/backer.svg?avatarHeight=40&width=760&button=false"
          type="image/svg+xml"
          aria-label="JHipster Open Collective backers"
        />
        {/* shown in mobile screens only */}
        <object
          className={styles.sectionMobile}
          data="https://opencollective.com/generator-jhipster/tiers/backer.svg?avatarHeight=40&width=310&button=false"
          type="image/svg+xml"
          aria-label="JHipster Open Collective backers"
        />
      </div>
    </OpenCollectiveWrapper>
  );
}
