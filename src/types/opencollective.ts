export type OpenCollectiveKeys = 'silver' | 'bronze';

export type OpenCollectiveSponsor = {
  MemberId: number;
  createdAt: string;
  type: string;
  role: string;
  tier: string;
  isActive: boolean;
  totalAmountDonated: number;
  currency: string;
  lastTransactionAt: string;
  lastTransactionAmount: number;
  profile: string;
  name: string;
  company?: string;
  description?: string;
  image?: string;
  twitter?: string;
  github?: string;
  website?: string;
};
