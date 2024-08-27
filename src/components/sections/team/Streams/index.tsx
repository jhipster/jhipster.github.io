import Link from '@docusaurus/Link';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import StreamsList from './StreamsList';

export default function Streams() {
  return (
    <SectionWrapper>
      <SectionTitle align="start">JHipster streams</SectionTitle>

      <SectionDescription align="start">
        <p>
          JHipster supports a wide range of technology choices for your
          application and as it keeps growing we have come up with technology
          streams with specific leads to ensure smooth maintenance of the
          particular technology. Everything else will be lead by project leads.
        </p>
        <p>
          The updated spreadsheet can be found here{' '}
          <Link href="https://docs.google.com/spreadsheets/d/1fac4Uxv3bKr0rNmgg1WXv67CE_6nfHEPIuCp-_iU-uA/edit?usp=sharing">
            JHipster streams spreadsheet
          </Link>
        </p>
      </SectionDescription>

      <StreamsList />
    </SectionWrapper>
  );
}
