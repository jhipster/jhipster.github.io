import Layout from '@theme/Layout';

import Hero from '@site/src/components/sections/welcome/Hero';
import Community from '@site/src/components/sections/Community';
import Learn from '@site/src/components/sections/welcome/Learn';
import About from '@site/src/components/sections/welcome/About';
import SponsorsAndBackers from '@site/src/components/sections/SponsorsAndBackers';
import CompaniesSupporting from '@site/src/components/sections/CompaniesSupporting';
import ConnectCommunity from '@site/src/components/sections/ConnectCommunity';
import Modules from '@site/src/components/sections/welcome/Modules';
import WhoUses from '@site/src/components/sections/welcome/WhoUses';

export default function WelcomePages(): JSX.Element {
  return (
    <Layout
      title="JHipster - Full Stack Platform for the Modern Developer!"
      description="JHipster is a development platform to quickly generate, develop, and deploy modern web applications + microservice architectures"
    >
      <Hero />

      <main>
        <Community />
        <Learn />
        <About />
        <SponsorsAndBackers />
        <CompaniesSupporting />
        <WhoUses />
        <ConnectCommunity />
        <Modules />
      </main>
    </Layout>
  );
}
