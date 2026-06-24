import type { OpenCollectiveSponsor } from '@site/src/types/opencollective';
import { useEffect, useState } from 'react';

import { openCollectiveService } from '@site/src/lib/services/open-collective';

export const useOpenCollective = () => {
  const [goldSponsors, setGoldSponsors] = useState<OpenCollectiveSponsor[]>([]);
  const [silverSponsors, setSilverSponsors] = useState<OpenCollectiveSponsor[]>(
    [],
  );
  const [bronzeSponsors, setBronzeSponsors] = useState<OpenCollectiveSponsor[]>(
    [],
  );

  useEffect(() => {
    fetchSponsors().then((data) => {
      setGoldSponsors(data.goldSponsors);
      setSilverSponsors(data.silverSponsors);
      setBronzeSponsors(data.bronzeSponsors);
    });
  }, []);

  return { goldSponsors, silverSponsors, bronzeSponsors };
};

async function fetchSponsors() {
  const [goldSponsors, silverSponsors, bronzeSponsors] = await Promise.all([
    openCollectiveService.getOpenCollective('gold', 1000),
    openCollectiveService.getOpenCollective('silver', 500),
    openCollectiveService.getOpenCollective('bronze', 100),
  ]);

  return { goldSponsors, silverSponsors, bronzeSponsors };
}
