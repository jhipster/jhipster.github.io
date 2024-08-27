import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import TeamList from '@site/src/components/sections/team/TeamList';
import styles from './styles.module.scss';

export default function TeamRetiredMembers() {
  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle align="start" size="sm">
        Retired members of the board of developers
      </SectionTitle>

      <SectionDescription align="start">
        <p>
          JHipster is an Open Source project, we don’t ask anything from our
          members: they can leave the project or stop contributing at any time.
          But as members of the board have more rights than other people
          (including write access to the project), we need them to be active.
        </p>
      </SectionDescription>

      <TeamList dataKey="retiredMembers" />
    </SectionWrapper>
  );
}
