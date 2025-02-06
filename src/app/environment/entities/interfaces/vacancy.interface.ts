import {
  ICompany,
  ICompanyRaw,
} from '@app/environment/entities/interfaces/company.interface';

export interface IVacancy {
  title: string;
  grade: string;
  company: ICompany;
}

export interface IVacancyRaw
  extends Omit<IVacancy, 'title' | 'grade' | 'company'> {
  title: Record<string, string>;
  grade: Record<string, string>;
  company: ICompanyRaw;
}
