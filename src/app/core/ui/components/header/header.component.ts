import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IAuthor } from '@app/domain/entities/interfaces/author.interface';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgOptimizedImage, MatTooltip],
})
export class HeaderComponent {
  public author = input.required<IAuthor | null>();
}
