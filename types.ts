
export interface Lead {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  departments: string | null;
  email: string | null;
  company_name_for_emails: string | null;
  employees: number | null;
  industry: string | null;
  keywords: string | null;
  person_linkedin_url: string | null;
  website: string | null;
  company_linkedin_url: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  company_address: string | null;
  company_city: string | null;
  company_state: string | null;
  company_country: string | null;
  technologies: string | null;
  annual_revenue: string | null;
  latest_funding: string | null;
  latest_funding_amount: string | null;
  created_at: string | null;
  company_name: string | null;
  annual_revenue_num: string | null;
  seniority: string | null;
}

export interface SavedView {
  id: string;
  name: string;
  filters: FilterState;
  visibleColumns: string[];
}

export interface FilterState {
  searchQuery: string;
  industries: string[];
  industryExcludes: string[];
  countries: string[];
  states: string[];
  cities: string[];
  excludeCountries: string[];
  excludeStates: string[];
  excludeCities: string[];
  hqCountries: string[];
  hqStates: string[];
  hqCities: string[];
  excludeHqCountries: string[];
  excludeHqStates: string[];
  excludeHqCities: string[];
  departments: string[];
  seniority: string[];
  technologies: string[];
  keywords: string[];
  keywordExcludes: string[];
  emailStatuses: string[];
  jobTitles: string[];
  jobTitleExcludes: string[];
  seniorityExcludes: string[];
  departmentExcludes: string[];
  companyDomains: string[];
  companyIncludes: string[];
  companyExcludes: string[];
  companyDomainExists: boolean | null;
  includeLists: string[];
  includeAllLists: string[];
  excludeLists: string[];
  minEmployees: number | null;
  maxEmployees: number | null;
  minAnnualRevenue: number | null;
  maxAnnualRevenue: number | null;
}
