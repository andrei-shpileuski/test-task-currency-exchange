export interface IAuthorInfo {
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

export interface IAuthorInfoExtended
  extends Omit<IAuthorInfo, 'name' | 'links'> {
  name: Record<string, string>;
  links: IAuthorLinkExtended[];
}

export interface IAuthorLinkExtended extends Omit<IAuthorLink, 'href'> {
  href: Record<string, string>;
  isVisible: true;
}
