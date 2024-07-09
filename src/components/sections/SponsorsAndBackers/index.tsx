import Translate, { translate } from '@docusaurus/Translate';
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
      <SectionTitle>
        <Translate>Sponsors & Backers</Translate>
      </SectionTitle>

      <SectionDescription>
        <p>
          <Translate
            values={{
              sponsorLink: (
                <Link href="https://opencollective.com/generator-jhipster#sponsor">
                  a sponsor
                </Link>
              ),
              backerLink: (
                <Link href="https://opencollective.com/generator-jhipster#backer">
                  a backer
                </Link>
              ),
            }}
          >
            {
              'If you find JHipster useful for work, please consider asking your company to support this Open Source project by becoming {sponsorLink}. You can also individually sponsor the project by becoming {backerLink}.'
            }
          </Translate>
        </p>
      </SectionDescription>

      <OpenCollectiveButton />

      {/* Silver sponsors */}
      <OpenCollectiveSponsors
        title={translate({ message: 'Thank you to our silver sponsors!' })}
        sponsors={silverSponsors}
      />

      {/* Bronze sponsors */}
      <OpenCollectiveSponsors
        title={translate({ message: 'Thank you to our bronze sponsors!' })}
        sponsors={bronzeSponsors}
      />

      <OpenCollectiveButton />

      {/* Backers */}
      <OpenCollectiveBackers />
    </SectionWrapper>
  );
}
