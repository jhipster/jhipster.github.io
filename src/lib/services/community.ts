import { createLocalStorageCache } from '@site/src/lib/cache';

const NPM_DOWNLOADS_CACHE_KEY = 'npm-downloads';
const GITHUB_CONFIG_CACHE_KEY = 'github-config';
const COMMUNITY_CACHE_TTL = 1000 * 60 * 60; // Cache ttl 1 hour

function getCommunityService() {
  const communityCache = createLocalStorageCache();

  async function getNpmDownloadsLastMonth(name: string) {
    const url = `https://api.npmjs.org/downloads/point/last-month/${name}`;

    try {
      if (communityCache.has(NPM_DOWNLOADS_CACHE_KEY)) {
        return communityCache.get(NPM_DOWNLOADS_CACHE_KEY);
      }

      const res = await fetch(url);
      const npmDownloads = await res.json();

      communityCache.set(
        NPM_DOWNLOADS_CACHE_KEY,
        npmDownloads,
        COMMUNITY_CACHE_TTL,
      );

      return npmDownloads;
    } catch (err) {
      console.error(err);
    }
  }

  async function getGitHubConfig(author: string, name: string) {
    const url = `https://api.github.com/repos/${author}/${name}`;

    try {
      if (communityCache.has(GITHUB_CONFIG_CACHE_KEY)) {
        return communityCache.get(GITHUB_CONFIG_CACHE_KEY);
      }

      const res = await fetch(url);
      const gitHubConfig = await res.json();

      communityCache.set(
        GITHUB_CONFIG_CACHE_KEY,
        gitHubConfig,
        COMMUNITY_CACHE_TTL,
      );

      return gitHubConfig;
    } catch (err) {
      console.error(err);
    }
  }

  return { getNpmDownloadsLastMonth, getGitHubConfig };
}

export const communityService = getCommunityService();
