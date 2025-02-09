import {
  ICompany,
  ICompanyResponse,
} from '@domain/entities/interfaces/company.interface';

export interface IVacancyResponse {
  title: Record<string, string>;
  grade: Record<string, string>;
  url: string;
  company: ICompanyResponse;
}

export interface IVacancy
  extends Omit<IVacancyResponse, 'title' | 'grade' | 'company'> {
  title: string;
  grade: string;
  company: ICompany;
}
