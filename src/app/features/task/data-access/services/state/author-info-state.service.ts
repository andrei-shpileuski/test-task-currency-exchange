import { Injectable } from '@angular/core';
import { BaseStateService } from '@core/data-access/services/state/base-state.service';
import { IAuthorInfo } from '@app/features/task/entities/interfaces/author-info.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorInfoStateService extends BaseStateService<IAuthorInfo> {}
