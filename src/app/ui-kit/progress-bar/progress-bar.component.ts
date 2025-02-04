import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // animations: [
  //   trigger('fadeAnimation', [
  //     transition(':enter', [
  //       style({ opacity: 0 }),
  //       animate('300ms ease-out', style({ opacity: 1 })),
  //     ]),
  //     transition(':leave', [animate('300ms ease-in', style({ opacity: 0 }))]),
  //   ]),
  // ], //todo
})
export class ProgressBarComponent {
  public loading = input.required<boolean>();
}
