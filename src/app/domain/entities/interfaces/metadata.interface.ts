import { LanguagesISOEnum } from '@core/entities/enums/languages-iso.enum';

export interface IMetadataResponse {
  type: 'website';
  title: Record<LanguagesISOEnum, string>;
  description: Record<LanguagesISOEnum, string>;
  og: IOpenGraphMetadataResponse;
  keywords: Record<LanguagesISOEnum, string>;
}

export interface IOpenGraphMetadataResponse {
  image: {
    width: string;
    height: string;
    type: string;
    url: Record<LanguagesISOEnum, string>;
  };
}

export interface IMetadata
  extends Omit<IMetadataResponse, 'title' | 'description' | 'keywords' | 'og'> {
  locale: string;
  title: string;
  description: string;
  keywords: string;
  og: IOpenGraphMetadata;
}

export interface IOpenGraphMetadata
  extends Omit<IOpenGraphMetadataResponse, 'image'> {
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
