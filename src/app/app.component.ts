import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@core/ui/components/header/header.component';
import { CoreState } from '@core/data-access/state/@core.store';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, MatProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _coreState = inject(CoreState);

  public loading: Signal<boolean> = this._coreState.requestCount.loading;
  public contentReady: Signal<boolean> = this._coreState.contentReady.ready;

  public ngOnInit(): void {
    this.init();
  }

  private init(): void {
    this._coreState.init();
  }
}
