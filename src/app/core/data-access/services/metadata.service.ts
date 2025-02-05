import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { IMetadata } from '@core/entities/interfaces/metadata.interface';

@Injectable({
  providedIn: 'root',
})
export class MetadataService {
  private readonly _meta = inject(Meta);
  private readonly _title = inject(Title);
  private readonly _document = inject(DOCUMENT);

  public applyMetadata(metadata: IMetadata): void {
    this.setLang(metadata);
    this.applyTitleTag(metadata);
    this.applyBasicTags(metadata);
    this.applyOGTags(metadata);
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
