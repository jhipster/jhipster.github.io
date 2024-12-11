const NPM_SEARCH_URL = 'https://registry.npmjs.org/-/v1/search';

async function fetchPartModules(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}

export async function fetchModules() {
  const modulesList = await Promise.all([
    fetchPartModules(
      `${NPM_SEARCH_URL}?text=keywords:jhipster-blueprint&size=250`,
    ),
    fetchPartModules(
      `${NPM_SEARCH_URL}?text=keywords:jhipster-module&size=250`,
    ),
  ]);

  const objects = modulesList.reduce((acc, val) => {
    if (Array.isArray(val.objects)) {
      acc = [...acc, ...val.objects];
    }

    return acc;
  }, []);

  objects.sort(
    (a, b) => Date.parse(b.package.date) - Date.parse(a.package.date),
  );

  return {
    objects,
    total: objects.length,
    time: modulesList[0].time,
  };
}
