export interface ICompany {
  name: string;
}

export interface ICompanyRaw extends Omit<ICompany, 'name'> {
  name: Record<string, string>;
}
