export interface IAuthor {
  name: string;
  links: IAuthorLink[];
}

export interface IAuthorLink {
  href: string;
  icon: string;
  name: string;
  target: string;
  type: 'email' | 'link';
}

export interface IAuthorRaw extends Omit<IAuthor, 'name' | 'links'> {
  name: Record<string, string>;
  links: IAuthorLinkRaw[];
}

export interface IAuthorLinkRaw extends Omit<IAuthorLink, 'href'> {
  href: Record<string, string>;
  isVisible: true;
}
