import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class BaseStateService<T> {
  protected _value$ = new BehaviorSubject<T | null>(null);
  public readonly value$ = this._value$.asObservable() as Observable<T | null>;
  public readonly value = toSignal<T | null>(this.value$, {
    requireSync: true,
  });

  public setValue(newValue: T): void {
    this._value$.next(newValue);
  }

  public setDefaultValue(value: T): void {
    this._value$.next(value);
  }

  public getValue(): T | null {
    return this._value$.getValue();
  }

  public reset(): void {
    this._value$.next(null);
  }
}
