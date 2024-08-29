import type {
  OpenCollectiveKeys,
  OpenCollectiveSponsor,
} from '@site/src/types/opencollective';
import fetchJsonp from 'fetch-jsonp';

function sponsorFilter(sponsors: OpenCollectiveSponsor[], amount: number) {
  return sponsors.filter(
    (item) => item.isActive && item.lastTransactionAmount === amount,
  );
}

async function getOpenCollective(key: OpenCollectiveKeys, amount: number) {
  const params = {
    silver: {
      uri: '/generator-jhipster/tiers/silver-sponsor/all.json',
      jsonpCallbackFunction: 'ocSilverJsonpCallback',
    },
    bronze: {
      uri: '/generator-jhipster/tiers/bronze-sponsor/all.json?v=2',
      jsonpCallbackFunction: 'ocBronzeJsonpCallback',
    },
  };

  try {
    const { uri, jsonpCallbackFunction } = params[key];

    const res = await fetchJsonp(
      `https://json2jsonp.com/?url=https://opencollective.com/${uri}`,
      { jsonpCallbackFunction },
    );
    const sponsors: OpenCollectiveSponsor[] = await res.json();

    return sponsorFilter(sponsors, amount);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export const openCollectiveService = {
  getOpenCollective,
};
