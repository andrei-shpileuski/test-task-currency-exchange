import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, Observable, throwError, finalize } from 'rxjs';
import { requestCountStore } from '@core/data-access/state/request-count.store';

export const requestTrackerInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const requestCounter = inject(requestCountStore);
  let requestWasHandled = false;

  requestCounter.increase();

  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          requestWasHandled = true;
          requestCounter.decrease();
        }
      },
      error: () => {
        requestWasHandled = true;
        requestCounter.decrease();
      },
    }),
    finalize(() => {
      if (!requestWasHandled) {
        requestCounter.decrease();
      }
    }),
    catchError((error) => {
      return throwError(() => error);
    }),
  );
};
