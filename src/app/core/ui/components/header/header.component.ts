import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { IAuthorInfo } from '@app/features/task/entities/interfaces/author-info.interface';
import { ProgressBarComponent } from '@app/ui-kit/progress-bar/progress-bar.component';
import { RequestTrackerStateService } from '@core/data-access/services/state/request-tracker-state.service';
import { AuthorInfoStateService } from '@app/features/task/data-access/services/state/author-info-state.service';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressBarComponent, NgOptimizedImage],
})
export class HeaderComponent {
  private readonly _authorInfoStateService = inject(AuthorInfoStateService);
  private readonly _requestTrackerStateService = inject(
    RequestTrackerStateService,
  );

  public authorInfo: Signal<IAuthorInfo | null> =
    this._authorInfoStateService.value;
  public loading: Signal<boolean> =
    this._requestTrackerStateService.isInProgress;
}
