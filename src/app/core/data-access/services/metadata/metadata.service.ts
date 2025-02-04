import { inject, Injectable } from '@angular/core';
import { LanguageStateService } from '@core/data-access/services/state/language-state.service';
import { combineLatest, filter, map, take } from 'rxjs';
import { AuthorInfoStateService } from '@app/features/task/data-access/services/state/author-info-state.service';
import { VacancyInfoStateService } from '@app/features/task/data-access/services/state/vacancy-info-state.service';
import { TestTaskDescriptionStateService } from '@app/features/task/data-access/services/state/test-task-description-state.service';
import { Meta, Title } from '@angular/platform-browser';
import { IAuthorInfo } from '@app/features/task/entities/interfaces/author-info.interface';
import { ITestTaskDescription } from '@app/features/task/entities/interfaces/test-task-description.interface';
import { IVacancyInfo } from '@app/features/task/entities/interfaces/vacancy-info.interface';
import { DOCUMENT } from '@angular/common';

export enum LanguagesISOEnum {
  Russian = 'ru',
  English = 'en',
}

export interface IOpenGraphMetadataConfig {
  siteName: Record<LanguagesISOEnum, string>;
  type: 'website';
  description: Record<LanguagesISOEnum, string>;
  url: string;
  locale: Record<LanguagesISOEnum, string>;
  title: Record<LanguagesISOEnum, string>;
  image: {
    width: string;
    height: string;
    type: string;
    url: string;
  };
}

export interface IMetadataConfig {
  type: 'website';
  locale: Record<LanguagesISOEnum, string>;
  title: Record<LanguagesISOEnum, string>;
  description: Record<LanguagesISOEnum, string>;
  OG: IOpenGraphMetadataConfig;
  keywords?: Record<LanguagesISOEnum, string>;
}

export const metadataConfig: IMetadataConfig = {
  type: 'website',
  locale: {
    [LanguagesISOEnum.Russian]: 'ru-RU',
    [LanguagesISOEnum.English]: 'en-US',
  },
  title: {
    [LanguagesISOEnum.Russian]:
      '{{authorName}} - Тестовое задание «{{testTaskName}}» для вакансии «{{vacancyTitle}}»',
    [LanguagesISOEnum.English]:
      '{{authorName}} - Test task «{{testTaskName}}» for vacancy «{{vacancyTitle}}»',
  },
  description: {
    [LanguagesISOEnum.Russian]:
      'Тестовое задание «{{testTaskName}}» от компании «{{companyName}}» для вакансии «{{vacancyTitle}}».',
    [LanguagesISOEnum.English]:
      'Test task «{{testTaskName}}» from company «{{companyName}}» for the «{{vacancyTitle}}» position.',
  },
  OG: {
    url: 'https://test-task-starter.onrender.com',
    title: {
      [LanguagesISOEnum.Russian]:
        '{{authorName}} - Тестовое задание «{{testTaskName}}»',
      [LanguagesISOEnum.English]:
        '{{authorName}} - Test task «{{testTaskName}}»',
    },
    description: {
      [LanguagesISOEnum.Russian]:
        'Тестовое задание «{{testTaskName}}» для вакансии «{{vacancyTitle}}» в компании «{{companyName}}».',
      [LanguagesISOEnum.English]:
        'Test task «{{testTaskName}}» for the «{{vacancyTitle}}» position at «{{companyName}}».',
    },
    siteName: {
      [LanguagesISOEnum.Russian]:
        '{{authorName}} - Тестовое задание «{{testTaskName}}»',
      [LanguagesISOEnum.English]:
        '{{authorName}} - Test task «{{testTaskName}}»',
    },
    type: 'website',
    locale: {
      [LanguagesISOEnum.Russian]: 'ru-RU',
      [LanguagesISOEnum.English]: 'en-US',
    },
    image: {
      width: '1200',
      height: '630',
      type: 'image/jpeg',
      url: '',
    },
  },
};

export interface IMetadataData {
  authorInfo: IAuthorInfo;
  testTaskDescription: ITestTaskDescription;
  vacancyInfo: IVacancyInfo;
}

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly _languageStateService = inject(LanguageStateService);
  private readonly _authorInfoStateService = inject(AuthorInfoStateService);
  private readonly _vacancyInfoStateService = inject(VacancyInfoStateService);
  private readonly _testTaskDescriptionStateService = inject(
    TestTaskDescriptionStateService,
  );
  private readonly _meta = inject(Meta);
  private readonly _title = inject(Title);
  private readonly _document = inject(DOCUMENT);

  public applyMetadata(): void {
    combineLatest([
      this._languageStateService.value$.pipe(filter(Boolean)),
      this._authorInfoStateService.value$.pipe(filter(Boolean)),
      this._testTaskDescriptionStateService.value$.pipe(filter(Boolean)),
      this._vacancyInfoStateService.value$.pipe(filter(Boolean)),
    ])
      .pipe(
        take(1),
        map(([language, authorInfo, testTaskDescription, vacancyInfo]) => ({
          language,
          metadataData: {
            authorInfo,
            testTaskDescription,
            vacancyInfo,
          } as IMetadataData,
        })),
      )
      .subscribe(({ language, metadataData }) => {
        this.setLang(language);
        this.applyTitleTag(language, metadataData);
        this.applyBasicTags(language, metadataData);
        this.applyOGTags(language, metadataData);
      });
  }

  private applyTitleTag(
    language: LanguagesISOEnum,
    metadataData: IMetadataData,
  ): void {
    const titleTemplate = metadataConfig.title[language];

    if (titleTemplate) {
      const title = titleTemplate
        .replace('{{authorName}}', metadataData.authorInfo.name)
        .replace('{{testTaskName}}', metadataData.testTaskDescription.title)
        .replace('{{vacancyTitle}}', metadataData.vacancyInfo.title);

      this._title.setTitle(title);
    }
  }

  private applyBasicTags(
    language: LanguagesISOEnum,
    metadataData: IMetadataData,
  ): void {
    const titleTemplate = metadataConfig.title[language];
    const descriptionTemplate = metadataConfig.description[language];

    if (titleTemplate) {
      const title = titleTemplate
        .replace('{{authorName}}', metadataData.authorInfo.name)
        .replace('{{testTaskName}}', metadataData.testTaskDescription.title)
        .replace('{{vacancyTitle}}', metadataData.vacancyInfo.title);

      this._meta.updateTag({ name: 'title', content: title });
    }

    if (descriptionTemplate) {
      const description = descriptionTemplate
        .replace('{{testTaskName}}', metadataData.testTaskDescription.title)
        .replace('{{vacancyTitle}}', metadataData.vacancyInfo.title)
        .replace('{{companyName}}', metadataData.vacancyInfo.company.name);

      this._meta.updateTag({ name: 'description', content: description });
    }
  }

  private setLang(language: LanguagesISOEnum): void {
    this._document.documentElement.lang = metadataConfig.locale[language];
  }

  private applyOGTags(
    language: LanguagesISOEnum,
    metadataData: IMetadataData,
  ): void {
    const ogTags: Record<string, string> = {
      'og:site_name': metadataConfig.OG.siteName[language]
        .replace('{{authorName}}', metadataData.authorInfo.name)
        .replace('{{testTaskName}}', metadataData.testTaskDescription.title),
      'og:type': metadataConfig.type,
      'og:url': metadataConfig.OG.url,
      'og:locale': metadataConfig.OG.locale[language],
      'og:title': metadataConfig.OG.title[language]
        .replace('{{authorName}}', metadataData.authorInfo.name)
        .replace('{{testTaskName}}', metadataData.testTaskDescription.title),
      'og:description': metadataConfig.OG.description[language]
        .replace('{{testTaskName}}', metadataData.testTaskDescription.title)
        .replace('{{vacancyTitle}}', metadataData.vacancyInfo.title)
        .replace('{{companyName}}', metadataData.vacancyInfo.company.name),
      'og:image:type': metadataConfig.OG.image.type,
      'og:image:width': metadataConfig.OG.image.width,
      'og:image:height': metadataConfig.OG.image.height,
      'og:image': metadataConfig.OG.image.url,
      'og:image:secure': metadataConfig.OG.image.url,
    };

    Object.entries(ogTags).forEach(([name, content]) => {
      this._meta.updateTag({ name, content });
    });
  }
}
