import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { authorInfoStore } from '@core/data-access/state/environment/author-info.store';
import { IAuthorInfo } from '@core/entities/interfaces/author-info.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeaderComponent {
  public authorInfo: Signal<IAuthorInfo | null> = inject(authorInfoStore).data;
}
