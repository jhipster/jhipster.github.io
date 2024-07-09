import { useEffect, useState } from 'react';

import { communityService } from '@site/src/lib/services/community';

export const useCommunity = () => {
  const [npmDownloads, setNpmDownloads] = useState<any>();
  const [githubConfig, setGithubConfig] = useState<any>();

  useEffect(() => {
    fetchCommunityData().then((data) => {
      setNpmDownloads(data.npmDownloads);
      setGithubConfig(data.githubConfig);
    });
  }, []);

  return { npmDownloads, githubConfig };
};

async function fetchCommunityData() {
  const [npmDownloads, githubConfig] = await Promise.all([
    communityService.getNpmDownloadsLastMonth('generator-jhipster'),
    communityService.getGitHubConfig('jhipster', 'generator-jhipster'),
  ]);

  return { npmDownloads, githubConfig };
}
