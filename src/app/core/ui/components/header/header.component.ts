import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { IAuthorInfo } from '@app/features/task/entities/interfaces/author-info.interface';
import { AuthorInfoStateService } from '@app/features/task/data-access/services/state/author-info-state.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage],
})
export class HeaderComponent {
  private readonly _authorInfoStateService = inject(AuthorInfoStateService);

  public authorInfo: Signal<IAuthorInfo | null> =
    this._authorInfoStateService.value;
}
