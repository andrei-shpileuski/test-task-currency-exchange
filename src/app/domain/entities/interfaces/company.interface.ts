export interface ICompanyResponse {
  name: Record<string, string>;
}

export interface ICompany extends Omit<ICompanyResponse, 'name'> {
  name: string;
}
