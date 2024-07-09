import Translate from '@docusaurus/Translate';

import {
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import Technology from './Technology';
import Description from './Description';
import Goals from './Goals';
import Options from './Options';

export default function About() {
  return (
    <SectionWrapper>
      <SectionTitle align="start">
        <Translate>What is JHipster?</Translate>
      </SectionTitle>

      <Technology />
      <Description />
      <Goals />
      <Options />
    </SectionWrapper>
  );
}
