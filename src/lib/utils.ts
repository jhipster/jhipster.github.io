import dayjs from 'dayjs';

export function formatDate(date?: string, format = 'MMM DD, YYYY') {
  return dayjs(date).format(format);
}

export function getModuleName(value: string) {
  return value
    .replace('generator-jhipster-', '')
    .replace(/(?:^|[\s\-_.])\S/g, function (a) {
      return a.replace(/[\-_.]/, ' ').toUpperCase();
    });
}

export function getMaintainers(authors: any[]) {
  return authors
    .map((author) => (author.username ? author.username : author.name))
    .join(', ');
}

export function requireLocalImageIfExists(
  imagePath: string,
  fallbackPath: string,
) {
  try {
    return require(`@site/static/images${imagePath}`).default;
  } catch (err) {
    return (
      fallbackPath ??
      require('@site/static/images/open-collective/blank.png').default
    );
  }
}
