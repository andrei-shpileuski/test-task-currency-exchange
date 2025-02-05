import { inject, Injectable } from '@angular/core';
import { filter, take } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { MetadataApiService } from '@core/data-access/services/api/metadata-api.service';
import { IMetadata } from '@core/entities/interfaces/metadata.interface';
import { MetadataStateService } from '@core/data-access/services/state/metadata-state.service';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly _metadataApiService = inject(MetadataApiService);
  private readonly _metadataStateService = inject(MetadataStateService);
  private readonly _meta = inject(Meta);
  private readonly _title = inject(Title);
  private readonly _document = inject(DOCUMENT);

  public constructor() {
    this.defineMetadata();
  }

  public defineMetadata(): void {
    this._metadataApiService
      .getAuthorInfo()
      .pipe(take(1))
      .subscribe((metadata) => {
        this._metadataStateService.setValue(metadata);
        this.applyMetadata();
      });
  }

  public applyMetadata(): void {
    this._metadataStateService.value$
      .pipe(
        filter((metadata) => !!metadata),
        take(1),
      )
      .subscribe((metadata) => {
        this.setLang(metadata);
        this.applyTitleTag(metadata);
        this.applyBasicTags(metadata);
        this.applyOGTags(metadata);
      });
  }

  private applyTitleTag(metadata: IMetadata): void {
    this._title.setTitle(metadata.title);
  }

  private applyBasicTags(metadata: IMetadata): void {
    this._meta.updateTag({ name: 'title', content: metadata.title });
    this._meta.updateTag({ name: 'keywords', content: metadata.keywords });
    this._meta.updateTag({
      name: 'description',
      content: metadata.description,
    });
  }

  private setLang(metadata: IMetadata): void {
    this._document.documentElement.lang = metadata.locale;
  }

  private applyOGTags(metadata: IMetadata): void {
    const ogTags: Record<string, string> = {
      'og:site_name': metadata.og.siteName,
      'og:type': metadata.og.type,
      'og:url': metadata.og.url,
      'og:locale': metadata.og.locale,
      'og:title': metadata.og.title,
      'og:description': metadata.og.description,
      'og:image:type': metadata.og.image.type,
      'og:image:width': metadata.og.image.width,
      'og:image:height': metadata.og.image.height,
      'og:image': metadata.og.image.url,
      'og:image:secure': metadata.og.image.url,
    };

    Object.entries(ogTags).forEach(([name, content]) => {
      this._meta.updateTag({ name, content });
    });
  }
}
