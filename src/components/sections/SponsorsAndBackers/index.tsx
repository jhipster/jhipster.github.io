import Link from '@docusaurus/Link';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import OpenCollectiveSponsors from './OpenCollectiveSponsors';
import OpenCollectiveBackers from './OpenCollectiveBackers';
import OpenCollectiveButton from './OpenCollectiveButton';
import styles from './styles.module.scss';

import { useOpenCollective } from './use-open-collective';

export default function SponsorsAndBackers() {
  const { silverSponsors, bronzeSponsors } = useOpenCollective();

  return (
    <SectionWrapper className={styles.section}>
      <SectionTitle>Sponsors & Backers</SectionTitle>

      <SectionDescription>
        <p>
          If you find JHipster useful for work, please consider asking your
          company to support this Open Source project by becoming{' '}
          <Link href="https://opencollective.com/generator-jhipster#sponsor">
            a sponsor
          </Link>
          . You can also individually sponsor the project by becoming{' '}
          <Link href="https://opencollective.com/generator-jhipster#backer">
            a backer
          </Link>
          .
        </p>
      </SectionDescription>

      <OpenCollectiveButton />

      {/* Silver sponsors */}
      <OpenCollectiveSponsors
        title="Thank you to our silver sponsors!"
        sponsors={silverSponsors}
      />

      {/* Bronze sponsors */}
      <OpenCollectiveSponsors
        title="Thank you to our bronze sponsors!"
        sponsors={bronzeSponsors}
      />

      <OpenCollectiveButton />

      {/* Backers */}
      <OpenCollectiveBackers />
    </SectionWrapper>
  );
}
