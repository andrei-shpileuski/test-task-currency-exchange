import {
  ICompanyInfo,
  ICompanyInfoExtended,
} from '@app/features/task/entities/interfaces/company-info.interface';

export interface IVacancyInfo {
  title: string;
  grade: string;
  company: ICompanyInfo;
}

export interface IVacancyInfoExtended
  extends Omit<IVacancyInfo, 'title' | 'grade' | 'company'> {
  title: Record<string, string>;
  grade: Record<string, string>;
  company: ICompanyInfoExtended;
}
