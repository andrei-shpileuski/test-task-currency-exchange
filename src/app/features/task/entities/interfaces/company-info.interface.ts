export interface ICompanyInfo {
  name: string;
}

export interface ICompanyInfoExtended extends Omit<ICompanyInfo, 'name'> {
  name: Record<string, string>;
}
