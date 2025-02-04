import { inject, Injectable } from '@angular/core';
import { AuthorInfoApiService } from '@app/features/task/data-access/services/api/author-info-api.service';
import { AuthorInfoStateService } from '@app/features/task/data-access/services/state/author-info-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorInfoService {
  private readonly _api = inject(AuthorInfoApiService);
  private readonly _state = inject(AuthorInfoStateService);

  public defineAuthorInfo(): void {
    this._api.getAuthorInfo().subscribe((res) => this._state.setValue(res));
  }
}
