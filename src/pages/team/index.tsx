import Layout from '@theme/Layout';

import TeamHero from '@site/src/components/sections/team/TeamHero';
import TeamDevelopers from '@site/src/components/sections/team/TeamDevelopers';
import TeamRetiredMembers from '@site/src/components/sections/team/TeamRetiredMembers';
import Streams from '@site/src/components/sections/team/Streams';
import TeamDescription from '@site/src/components/sections/team/TeamDescription';
import Community from '@site/src/components/sections/Community';
import SponsorsAndBackers from '@site/src/components/sections/SponsorsAndBackers';
import CompaniesSupporting from '@site/src/components/sections/CompaniesSupporting';
import ConnectCommunity from '@site/src/components/sections/ConnectCommunity';

export default function TeamPage() {
  return (
    <Layout title="Team" description="JHipster members of the core team">
      <TeamHero />

      <main>
        <TeamDevelopers />
        <TeamRetiredMembers />
        <Streams />
        <TeamDescription />
        <Community color="light" />
        <SponsorsAndBackers />
        <CompaniesSupporting />
        <ConnectCommunity />
      </main>
    </Layout>
  );
}
