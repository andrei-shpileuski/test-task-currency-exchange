import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BackButtonComponent } from '@app/shared/ui/back-button/back-button.component';

@Component({
  selector: 'app-page-header',
  imports: [BackButtonComponent],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeaderComponent {
  public title = input<string | null>(null);
  public hasBackButton = input<boolean>(true);
  public backButtonLink = input<string | null>(null);
}
