import type { OpenCollectiveSponsor } from '@site/src/types/opencollective';
import { useEffect, useState } from 'react';

import { openCollectiveService } from '@site/src/lib/services/open-collective';

export const useOpenCollective = () => {
  const [silverSponsors, setSilverSponsors] = useState<OpenCollectiveSponsor[]>(
    [],
  );
  const [bronzeSponsors, setBronzeSponsors] = useState<OpenCollectiveSponsor[]>(
    [],
  );

  useEffect(() => {
    fetchSponsors().then((data) => {
      setSilverSponsors(data.silverSponsors);
      setBronzeSponsors(data.bronzeSponsors);
    });
  }, []);

  return { silverSponsors, bronzeSponsors };
};

async function fetchSponsors() {
  const [silverSponsors, bronzeSponsors] = await Promise.all([
    openCollectiveService.getOpenCollective('silver', 500),
    openCollectiveService.getOpenCollective('bronze', 100),
  ]);

  return { silverSponsors, bronzeSponsors };
}
