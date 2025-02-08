export interface IAuthorResponse {
  name: Record<string, string>;
  links: IAuthorLinkResponse[];
}

export interface IAuthorLinkResponse {
  href: Record<string, string>;
  icon: string;
  name: string;
  target: string;
  type: 'email' | 'link';
  isVisible: true;
}

export interface IAuthor extends Omit<IAuthorResponse, 'name' | 'links'> {
  name: string;
  links: IAuthorLink[];
}

export interface IAuthorLink
  extends Omit<IAuthorLinkResponse, 'href' | 'isVisible'> {
  href: string;
}
