import Translate from '@docusaurus/Translate';

import {
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import TeamList from '@site/src/components/sections/team/TeamList';
import styles from './styles.module.scss';

export default function TeamDevelopers() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle align="start" size="sm">
        <Translate>Board of developers</Translate>
      </SectionTitle>

      <TeamList dataKey="developersBoard" />
    </SectionWrapper>
  );
}
