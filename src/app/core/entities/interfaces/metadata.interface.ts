import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';

export interface IMetadata {
  type: 'website';
  locale: string;
  title: string;
  description: string;
  og: IOpenGraphMetadata;
  keywords: string;
}

export interface IOpenGraphMetadata {
  type: 'website';
  locale: string;
  title: string;
  description: string;
  siteName: string;
  url: string;
  image: {
    width: string;
    height: string;
    type: string;
    url: string;
  };
}

export interface IOpenGraphMetadataExtended {
  image: {
    width: string;
    height: string;
    type: string;
    url: Record<LanguagesISOEnum, string>;
  };
}

export interface IMetadataExtended {
  type: 'website';
  locale: Record<LanguagesISOEnum, string>;
  title: Record<LanguagesISOEnum, string>;
  description: Record<LanguagesISOEnum, string>;
  og: IOpenGraphMetadataExtended;
  keywords: Record<LanguagesISOEnum, string>;
}

export interface IMetadataReplaceData {
  authorName: string;
  testTaskName: string;
  vacancyTitle: string;
  companyName: string;
}
