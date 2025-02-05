import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IAuthorInfo } from '@core/entities/interfaces/author-info.interface';
import { projectInfoStore } from '@core/data-access/state/project-info.store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeaderComponent {
  public authorInfo: Signal<IAuthorInfo | null> =
    inject(projectInfoStore).author;
}
