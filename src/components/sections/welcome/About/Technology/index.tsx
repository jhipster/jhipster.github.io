import Translate from '@docusaurus/Translate';

import SpringBootIcon from '@site/static/images/logo/svg/spring-boot.svg';
import AngularIcon from '@site/static/images/logo/svg/angular.svg';
import ReactIcon from '@site/static/images/logo/svg/react.svg';
import VueIcon from '@site/static/images/logo/svg/vue.svg';
import FamilyMember from '@site/static/images/logo/jhipster_family_member_6.svg';
import styles from './styles.module.scss';

export default function Technology() {
  return (
    <div className={styles.section}>
      <SpringBootIcon className={styles.sectionIcon} />

      <span className={styles.sectionDivider}>+</span>

      <div className={styles.sectionFrontend}>
        <ReactIcon className={styles.sectionIcon} />
        <span className={styles.sectionDivider}>
          <Translate>or</Translate>
        </span>
        <AngularIcon className={styles.sectionIcon} />
        <span className={styles.sectionDivider}>
          <Translate>or</Translate>
        </span>
        <VueIcon className={styles.sectionIcon} />
      </div>

      <span className={styles.sectionDivider}>=</span>

      <FamilyMember className={styles.sectionFamilyMember} />
    </div>
  );
}
