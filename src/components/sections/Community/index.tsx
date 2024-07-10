import { cva, type VariantProps } from 'class-variance-authority';
import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';

import {
  SectionDescription,
  SectionTitle,
  SectionWrapper,
} from '@site/src/components/ui/SectionWrapper';
import CommunityCard from './CommunityCard';
import GithubButton from '@site/src/components/GithubButton';
import styles from './styles.module.scss';

import { useCommunity } from './use-community';

const sectionVariants = cva(styles.section, {
  variants: {
    color: {
      default: styles.sectionDefault,
      light: styles.sectionLight,
    },
  },
  defaultVariants: {
    color: 'default',
  },
});

type Props = VariantProps<typeof sectionVariants>;

export default function Community({ color }: Props) {
  const { npmDownloads, githubConfig } = useCommunity();

  return (
    <SectionWrapper className={clsx(sectionVariants({ color }))}>
      <SectionTitle>
        <Translate>Community</Translate>
      </SectionTitle>

      <SectionDescription>
        <p>
          <Translate>
            JHipster is Open Source, and all development is done on GitHub. If
            you JHipster consider becoming a sponsor or a backer. If you want to
            code with us, feel free to join! If you like the project, please
            give us a ⭐️ on GitHub.
          </Translate>
        </p>
      </SectionDescription>

      <ul className={styles.sectionList}>
        <li>
          <CommunityCard
            value={`${npmDownloads.downloads}`}
            text={translate({
              message: 'Downloads in last 30 days',
            })}
          />
        </li>
        <li>
          <CommunityCard
            value={`${githubConfig.stargazers_count}`}
            text={translate({
              message: 'GitHub Stars',
            })}
          />
        </li>
        <li>
          <CommunityCard
            value="600"
            text={translate({
              message: 'Contributors',
            })}
            postfix="+"
          />
        </li>
      </ul>

      <div className={styles.sectionButtons}>
        <GithubButton>
          <Translate>Join us on GitHub</Translate>
        </GithubButton>
      </div>
    </SectionWrapper>
  );
}
