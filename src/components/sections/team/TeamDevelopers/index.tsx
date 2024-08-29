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
        Board of developers
      </SectionTitle>

      <TeamList dataKey="developersBoard" />
    </SectionWrapper>
  );
}
