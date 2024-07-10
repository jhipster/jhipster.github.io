import type { GithubConfig, NpmDownloads } from '@site/src/types/community';
import { useEffect, useState } from 'react';

import { communityService } from '@site/src/lib/services/community';

export const useCommunity = () => {
  const [npmDownloads, setNpmDownloads] = useState<NpmDownloads>({
    downloads: 0,
  });
  const [githubConfig, setGithubConfig] = useState<GithubConfig>({
    stargazers_count: 0,
  });

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
