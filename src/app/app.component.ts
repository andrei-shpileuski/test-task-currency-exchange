import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/ui/components/header/header.component';
import { CoreStateService } from '@core/data-access/state/core-state.service';
import { MatProgressBar } from '@angular/material/progress-bar';
import { IAuthor } from '@domain/entities/interfaces/author.interface';
import { authorStore } from '@domain/data-access/state/author.store';
import { metadataStore } from '@domain/data-access/state/metadata.store';
import { vacancyStore } from '@domain/data-access/state/vacancy.store';
import { taskStore } from '@domain/data-access/state/task.store';
import { solutionStore } from '@domain/data-access/state/solution.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, MatProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private readonly _coreStateService = inject(CoreStateService);
  private readonly _metadataStore = inject(metadataStore);
  private readonly _authorStore = inject(authorStore);
  private readonly _vacancyStore = inject(vacancyStore);
  private readonly _taskStore = inject(taskStore);
  private readonly _solutionStore = inject(solutionStore);

  public loading: Signal<boolean> = this._coreStateService.requestCount.loading;
  public contentReady: Signal<boolean> =
    this._coreStateService.contentReady.ready;

  public author: Signal<IAuthor | null> = inject(authorStore).data;

  public constructor() {
    afterNextRender(() => {
      this.trackRoute();
    });
  }

  public ngOnInit(): void {
    this.init();
  }

  private trackRoute(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) window.scrollTo(0, 0);
    });
  }

  private init(): void {
    this._coreStateService.init();
    this._metadataStore.init();
    this._authorStore.defineData();
    this._vacancyStore.defineData();
    this._taskStore.defineData();
    this._solutionStore.defineData();
  }
}
