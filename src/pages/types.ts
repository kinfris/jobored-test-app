export type VacancyType = {
  id: number;
  profession: string;
  payment_from: number;
  currency: string;
  schedule: string;
  location: string;
};

export type CatalogType = {
  label: string;
  isHidden?: boolean;
  key?: number;
};

export type FiltersType = {
  department: CatalogType;
  salaryFrom: string | number;
  salaryTo: string | number;
};

export type VacancyWithDescriptionType = {
  id: number;
  profession: string;
  payment_from: number;
  currency: string;
  schedule: string;
  location: string;
  description: string;
};
