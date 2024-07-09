export type TeamListKeys =
  | 'governing'
  | 'leads'
  | 'developersBoard'
  | 'retiredMembers';

export type TeamItemLinkKeys = 'x' | 'mastodon' | 'linkedin' | 'github';

export type TeamItemLink = {
  name: TeamItemLinkKeys;
  href: string;
};

export type TeamItem = {
  name: string;
  image: string;
  position?: string;
  links: TeamItemLink[];
};
