export interface VacancyType {
  id: number;
  profession: string;
  payment_from: number;
  currency: string;
  schedule: string;
  location: string;
}

export interface CatalogType {
  label: string;
  isHidden?: boolean;
  key?: number;
}

export interface FiltersType {
  department: CatalogType;
  salaryFrom: string | number;
  salaryTo: string | number;
}

export interface VacancyWithDescriptionType {
  id: number;
  profession: string;
  payment_from: number;
  currency: string;
  schedule: string;
  location: string;
  description: string;
}

export interface VacanciesPropsType {
  data: VacancyType[];
  count: number;
}
