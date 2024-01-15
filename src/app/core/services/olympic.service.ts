import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map, filter, mergeMap, switchMap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * Loads the initial data for the Olympics service.
   * @returns An Observable of type Olympic[].
   */
  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        throw new Error(`Error loading initial data: ${error.message}`),
        console.error(error),
        this.olympics$.next([]);
        caught;
      }),
    );
  }

  /**
   * Retrieves the list of Olympics.
   * @returns An Observable that emits an array of Olympic objects.
   */
  getOlympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable().pipe(
      filter(olympics$ => olympics$ && olympics$.length > 0)
    );
  }
}
