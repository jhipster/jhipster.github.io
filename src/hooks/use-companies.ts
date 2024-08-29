import type { Company } from '@site/src/types/company';
import { useEffect, useState } from 'react';

import companies from '@site/src/data/companies.json';

const filteredCompanies = companies.filter((company) => !!company.icon);

export const useCompanies = (query: string) => {
  const [featuredUsers, setFeaturedUsers] = useState<Company[]>([]);
  const [allUsers, setAllUsers] = useState<Company[]>(companies);

  useEffect(() => {
    setFeaturedUsers(filteredCompanies);
  }, []);

  useEffect(() => {
    setFeaturedUsers(filterCompanies(filteredCompanies, query));
    setAllUsers(filterCompanies(companies, query));
  }, [query]);

  return { featuredUsers, allUsers };
};

function filterText(company: Company, query: string) {
  const queryValue = query.toLowerCase();

  return (
    company?.name?.toLowerCase().includes(queryValue) ||
    company?.category?.toLowerCase().includes(queryValue) ||
    company?.country?.toLowerCase().includes(queryValue)
  );
}

function filterCompanies(companies: Company[], query: string) {
  return query.length
    ? companies.filter((company) => filterText(company, query))
    : companies;
}
