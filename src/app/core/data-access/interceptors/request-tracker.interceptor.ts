import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, Observable, throwError, finalize } from 'rxjs';
import { RequestTrackerStateService } from '../services/state/request-tracker-state.service';

export const requestTrackerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const requestTrackerService = inject(RequestTrackerStateService);
  let requestWasHandled = false;

  requestTrackerService.requestSent();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          requestWasHandled = true;
          if (event.status >= 200 && event.status < 300) {
            requestTrackerService.requestDone();
          } else {
            requestTrackerService.requestDone();
          }
        }
      },
      error: () => {
        requestWasHandled = true;
        requestTrackerService.requestDone();
      },
    }),
    finalize(() => {
      if (!requestWasHandled) {
        requestTrackerService.requestDone();
      }
    }),
    catchError((error) => {
      return throwError(() => error);
    }),
  );
};
