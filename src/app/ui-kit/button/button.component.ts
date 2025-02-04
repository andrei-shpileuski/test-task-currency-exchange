import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  public link = input<string>();
  public linkType = input<'internal' | 'external'>();
  public target = input<string>();
  public text = input<string>();
  public type = input<'primary' | 'default'>('default');

  public buttonClicked = output<void>();
}
